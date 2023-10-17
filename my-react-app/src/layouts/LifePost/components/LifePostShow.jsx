import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LifePostUserCreator from './LifePostUserCreator';
import EnrolledUser from './EnrolledUser';

export default function LifePostShow(props) {
  const [lifePost, setLifePost] = useState(null);
  const [enrolled, setEnrolled] = useState(false); // 是否已经enrol的状态
  const lifePostId = props.match.params.id; // Get the ID from the route parameters
  const [enrolledUsers, setEnrolledUsers] = useState([]); // 创建一个用户列表

  useEffect(() => {
    // 发送 GET 请求来获取 LifePost 数据
    axios.get(`/lifePost/getPostById?id=${lifePostId}`)
      .then(response => {
        // console.log(response.data.result);
        setLifePost(response.data.result); // 设置 LifePost 数据到状态
      })
      .catch(error => {
        console.error('Error fetching LifePost:', error);
      });

    // 发送请求来检查是否已经注册
    axios.get(`/lifePost/enrolCheck?lifePostId=${lifePostId}`)
      .then(response => {
        setEnrolled(response.data); // 设置是否已经注册的状态
      })
      .catch(error => {
        console.error('Error checking enrol status:', error);
      });

    // 发送请求来获取所有已注册用户
    axios.get(`/lifePost/getAllEnrolledUser?id=${lifePostId}`)
      .then(response => {
        const users = response.data.result;
        setEnrolledUsers(users); // 将用户信息添加到用户列表

        console.log("line34 test" + response.data.result);
        users.forEach(user => {
          console.log("User ID:", user.id);
          console.log("User Name:", user.username);
          // 在这里添加其他属性的打印
        });

      })
      .catch(error => {
        console.error('Error fetching enrolled users:', error);
      });
  }, [lifePostId, enrolled]);

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

  function getCategoryName(category) {
    switch (category) {
      case 1:
        return "Social";
      case 2:
        return "Study";
      case 3:
        return "Sports";
      default:
        return "Unknown"; // 处理未知的类别值
    }
  }

  return (
    <div>
      <div>
        {lifePost ? (
          <div>
            <h1>{lifePost.title}</h1>
            <img src={`/common/download?name=${lifePost.picture}`} alt='Life Post'></img>
            <p>Category: {getCategoryName(lifePost.category)}</p>
            <p>Content: {lifePost.content}</p>
            <p>{lifePost.peopleEnrol}  people enrolled</p>
            <p>Address: {lifePost.address}</p>
            <p>Time: {lifePost.activityTime}</p>



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

      <br></br>

      <div>
        <h3>Enrolled Users:</h3>
        <div className="enrolled-users">
          <Row>
            {enrolledUsers.map(user => (
              <Col key={user.id} xs={4}>
                <EnrolledUser userId={user.id} />
              </Col>
            ))}
          </Row>
        </div>
      </div>



    </div>
  );
}