import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function LifePostShow(props) {
  const [lifePost, setLifePost] = useState(null);
  const [enrolled, setEnrolled] = useState(false); // 是否已经enrol的状态
  const lifePostId = props.match.params.id; // Get the ID from the route parameters

  useEffect(() => {
    // Send a GET request to fetch the LifePost
    axios.get(`/lifePost/getPostById?id=${lifePostId}`)
      .then(response => {
        console.log(response.data.result);
        setLifePost(response.data.result); // Set the LifePost data to the state
      })
      .catch(error => {
        console.error('Error fetching LifePost:', error);
      });

    // 发送请求来检查是否已经enrol
    axios.get(`/lifePost/enrolCheck?lifePostId=${lifePostId}`)
      .then(response => {
        setEnrolled(response.data); // 设置是否已经enrol的状态
      })
      .catch(error => {
        console.error('Error checking enrol status:', error);
      });
  }, [lifePostId]);

  const handleEnrolClick = () => {
    if (enrolled) {
      // 如果已经enrol，取消enrol
      axios.get(`/lifePost/cancelEnrolById?lifePostId=${lifePostId}`)
        .then(response => {
          console.log('Unregistered:', response.data);
          setEnrolled(false); // 更新状态为未enrol
        })
        .catch(error => {
          console.error('Error canceling enrol:', error);
        });
    } else {
      // 如果未enrol，进行enrol
      axios.get(`/lifePost/enrolById?lifePostId=${lifePostId}`)
        .then(response => {
          console.log('Registered:', response.data);
          setEnrolled(true); // 更新状态为已enrol
        })
        .catch(error => {
          console.error('Error enrolling:', error);
        });
    }
  };

  return (
    <div>
      <div>
        {lifePost ? (
          <div>
            <h1>{lifePost.title}</h1>
            <p>Category: {lifePost.category}</p>
            <p>Content: {lifePost.content}</p>
            <p>The number of people enrolled: {lifePost.peopleEnrol}</p>
            {/* Display other LifePost information */}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>

      <div>
        <button onClick={handleEnrolClick}>
          {enrolled ? 'Unregister' : 'Register'}
        </button>
      </div>
    </div>
  );
}