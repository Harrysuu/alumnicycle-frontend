import React, { useState, useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';

export default function UserCredit() {
  // const [credit, setCredit] = useState(0);
  const [creditToAdd, setCreditToAdd] = useState(0);
  const [user, setUser] = useState(null);

  // // 在需要访问用户ID的地方，从Session Storage中检索它
  // const storedUserId = sessionStorage.getItem('userId');
  // if (storedUserId) {
  //   const userId = parseInt(storedUserId, 10);
  //   // 现在您可以使用userId进行其他操作
  // } else {
  //   // 如果未找到存储的用户ID，可以采取适当的措施，如跳转到登录页面
  // }

  useEffect(() => {
    // 发起HTTP请求来获取用户信息
    axios.get('/user/getById', { params: { userId: 99 } }) // 1 是示例的 userId，您可以根据需要传入实际的 userId
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
          <Nav.Link as={Link} to="/user/page" >Profile</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/user/addcredit" active>Add Credit</Nav.Link>
        </Nav.Item>


        <Nav.Item>
          <Nav.Link as={Link} to="/user/updateProfile">Update Profile</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/user/favorites">Reset Password</Nav.Link>
        </Nav.Item>


        <Nav.Item>
          <Nav.Link as={Link} to="/user/posts">Posts</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/user/favorites">Favorites</Nav.Link>
        </Nav.Item>
      </Nav>

      {user && (
        <div>
          <h3>User Profile</h3>
          {/* <p>ID: {user.id}</p> */}
          {/* <p>Username: {user.username}</p> */}
          {/* <p>Email: {user.email}</p> */}
          <p>Credit: {user.credit}</p>
          {/* <p>College: {user.college}</p> */}
          {/* <p>Status: {user.statusInformation}</p> */}
          {/* <p>Description: {user.description}</p> */}
          {/* <p>Picture: {user.picture}</p> */}
          {/* <p>Edit Time: {user.editTime}</p> */}
          {/* 可以根据需要渲染其他用户信息 */}
        </div>
      )}

      <div>
        here
      </div>

      <div>

        <Form.Group controlId="inputCredit">
          <Form.Label>Add Credit:</Form.Label>
          <Form.Control
            type="number"
            inputMode="none"
            value={creditToAdd}
            onChange={(e) => setCreditToAdd(Number(e.target.value))}
          />
          <Form.Text muted>
            Please enter the amount of credit you want to add.
          </Form.Text>
        </Form.Group>
        <Button onClick={handleAddCredit}>Add Credit</Button>
      </div>


    </div>
  )
}
