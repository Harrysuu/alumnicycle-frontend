import React, { useState, useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';
import { Card } from 'react-bootstrap';

export default function UserCredit() {
  // const [credit, setCredit] = useState(0);
  const [creditToAdd, setCreditToAdd] = useState(0);
  const [user, setUser] = useState(null);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    // 发起HTTP请求来获取用户信息
    axios.get('/user/getById', { params: { userId: userId} }) // 根据需要传入实际的 userId
      .then(response => {
        console.log(response.data.result);
        setUser(response.data.result); // 设置用户信息到状态
      })
      .catch(error => {
        console.error('Error fetching user:', error);
      });
  }, []); // 请确保只在组件挂载时获取用户信息，因此依赖为空数组

  const handleAddCredit = () => {
    // 发送请求到后端来增加信用分数
    axios.get('/user/addCredit', { params: { point: creditToAdd } })
      .then(response => {
        // 更新信用分数
        setUser(response.data.result); // 设置用户信息到状态
        setCreditToAdd(0); // 重置输入字段
      })
      .catch(error => {
        console.error('Error adding credit:', error);
      });
  };

  return (
    <div style={{ width: '50rem' }}>
      <Nav fill variant="tabs" defaultActiveKey="/user/addcredit" style={{ fontSize: '16px', padding: '10px' }}>
        <Nav.Item >
          <Nav.Link as={Link} to="/user/page" style={{ color: 'white' }}>Profile</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/user/addcredit" active style={{ color: 'dark' }}>Add Credit</Nav.Link>
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

   
      <Card>
      <Card.Body>
        <h3>Top Up Credit</h3>
        {user && (
          <div>
            <Card.Text>
              <p>Credit: {user.credit}</p>
              {/* 可以根据需要渲染其他用户信息 */}
            </Card.Text>
          </div>
        )}

        <Form.Group controlId="inputCredit">
          <Form.Label>Add Credit:</Form.Label>
          <Form.Control
            type="text"
            value={creditToAdd}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*\.?\d*$/.test(value)) {
                setCreditToAdd(value);
              }
            }}
          />
          <Form.Text muted>
            Please enter the amount of credit you want to add.
          </Form.Text>
        </Form.Group>
        <Button onClick={handleAddCredit}>Add Credit</Button>
      </Card.Body>
    </Card>


    </div>
  )
}
