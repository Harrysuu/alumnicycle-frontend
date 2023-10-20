import React, { useState, useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Card } from 'react-bootstrap';


export default function UserPage() {

  const [user, setUser] = useState(null);
  const userId = localStorage.getItem('userId');


  useEffect(() => {
    // 发起HTTP请求来获取用户信息
    axios.get('/user/getById', { params: { userId: userId } }) //根据需要传入实际的 userId
      .then(response => {
        console.log(response.data.result);
        setUser(response.data.result); // 设置用户信息到状态
      })
      .catch(error => {
        console.error('Error fetching user:', error);
      });
      // eslint-disable-next-line
  }, []); // 请确保只在组件挂载时获取用户信息，因此依赖为空数组

  return (

    <div style={{ width: '50rem' }}>
      <Nav fill variant="tabs" defaultActiveKey="/user/page" style={{ fontSize: '16px', padding: '10px' }}>
        <Nav.Item >
          <Nav.Link as={Link} to="/user/page" active style={{ color: 'dark' }}>Profile</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/user/addcredit" style={{ color: 'white' }}>Add Credit</Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link as={Link} to="/user/updateProfile" style={{ color: 'white' }}>Update Profile</Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link as={Link} to="/user/picture" style={{ color: 'white' }}>Set Photo</Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link as={Link} to="/user/reset" style={{ color: 'white' }}>Reset Password</Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link as={Link} to="/user/posts" style={{ color: 'white' }}>Posts</Nav.Link>
        </Nav.Item>


      </Nav>

      <div className="mb-4"></div>

      <div>
        {user && (
          <Card>
            <Card.Body>
              <h3>User Profile</h3>
              <Card.Text>
                {/* <p>ID: {user.id}</p> */}
                <p>Username: {user.username}</p>
                <p>Email: {user.email}</p>
                <p>Phone: {user.phoneNumber}</p>
                <p>Credit: {user.credit}</p>
                <p>College: {user.college}</p>
                <p>Description: {user.description}</p>
                <p>Picture: {user.picture}</p>
                {/* <p>Edit Time: {user.editTime}</p> */}
                {/* 可以根据需要渲染其他用户信息 */}
              </Card.Text>
            </Card.Body>
          </Card>
        )}
      </div>

    </div>
  )
}
