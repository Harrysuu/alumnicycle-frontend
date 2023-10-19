import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

export default function SecondPostShow(props) {
  const [secondPost, setSecondPost] = useState(null);
  const [enrolled, setEnrolled] = useState(false); // 是否已经enrol的状态
  const secondPostId = props.match.params.id; // Get the ID from the route parameters

  useEffect(() => {
    // Send a GET request to fetch the SecondPost
    axios.get(`/secondPost/getPostById?id=${secondPostId}`)
      .then(response => {
        console.log(response.data.result);
        setSecondPost(response.data.result); // Set the SecondPost data to the state
      })
      .catch(error => {
        console.error('Error fetching SecondPost:', error);
      });

    // 发送请求来检查是否已经enrol
    axios.get(`/secondPost/enrolCheck?secondPostId=${secondPostId}`)
      .then(response => {
        setEnrolled(response.data); // 设置是否已经enrol的状态
      })
      .catch(error => {
        console.error('Error checking enrol status:', error);
      });
  }, [secondPostId, enrolled]);

  const handleEnrolClick = () => {
    if (enrolled) {
      // 如果已经enrol，取消enrol
      axios.get(`/secondPost/cancelEnrolById?secondPostId=${secondPostId}`)
        .then(response => {
          console.log('Unregistered:', response.data);
          setEnrolled(false); // 更新状态为未enrol
        })
        .catch(error => {
          console.error('Error canceling enrol:', error);
        });
    } else {
      // 如果未enrol，进行enrol
      axios.get(`/secondPost/enrolById?secondPostId=${secondPostId}`)
        .then(response => {
          console.log('Registered:', response.data);
          setEnrolled(true); // 更新状态为已enrol
        })
        .catch(error => {
          console.error('Error enrolling:', error);
        });
    }
  };

  function getCategoryName(category) {
    switch (category) {
      case 1:
        return "Articles for daily use";
      case 2:
        return "Electronic goods";
      case 3:
        return "Clothing and personal adornment";
      default:
        return "Unknown"; // 处理未知的类别值
    }
  }

  return (
    <div>
      <div>
        {secondPost ? (
          <div>
            <h1>{secondPost.title}</h1>
            <img src={`/common/download?name=${secondPost.picture}`} alt='Second Post'></img>
            <p>Category: {getCategoryName(secondPost.category)}</p>
            <p>Commodity Name: {secondPost.commodityName}</p>
            <p>Price: {secondPost.price}</p>
            <p>Create Time: {secondPost.createTime}</p>
            <p>{secondPost.enrollees} people enrolled</p>
            {/* Display other SecondPost information */}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>

      <div>
        <Button variant="primary" onClick={handleEnrolClick}>
          {enrolled ? 'Unregister' : 'Register'}
        </Button>
      </div>
    </div>
  );
}