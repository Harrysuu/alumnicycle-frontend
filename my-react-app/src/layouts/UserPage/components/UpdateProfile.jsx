import React, { useState, useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';


export default function UpdateProfile() {
  const [user, setUser] = useState(null);
  const [college, setCollege] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [picture, setPicture] = useState('');


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
        setUser(response.data.result);
        setCollege(response.data.result.college);
        setDescription(response.data.result.description);
        setEmail(response.data.result.email);
        setPicture(response.data.result.picture);
      })
      .catch(error => {
        console.error('Error fetching user:', error);
      });
  }, []); // 请确保只在组件挂载时获取用户信息，因此依赖为空数组


  const handleUpdate = () => {

    axios.post('/user/updateUser', { ...user, college: college, description: description, email: email })
      .then(response => {
        setUser(response.data.result);
        setCollege(''); // 清空输入字段
        setDescription(''); // 清空输入字段
        setEmail(''); // 清空输入字段
        setPicture(''); // 清空输入字段
        window.location.reload();
      })
      .catch(error => {
        console.error('Error updating user:', error);
      });

  };


  return (
    <div style={{ width: '50rem' }}>
      {/* ... 标签导航栏等 ... */}
      <Nav fill variant="tabs" defaultActiveKey="/user/updateProfile" style={{ fontSize: '16px', padding: '10px' }}>
        <Nav.Item >
          <Nav.Link as={Link} to="/user/page" >Profile</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/user/addcredit" >Add Credit</Nav.Link>
        </Nav.Item>


        <Nav.Item>
          <Nav.Link as={Link} to="/user/updateProfile" active>Update Profile</Nav.Link>
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
          <h3>Update Your Profile</h3>


          <Form.Group controlId="inputCollege">
            <Form.Label>College:{user.college}</Form.Label>
            <Form.Control
              type="text"
              value={college}
              onChange={(e) => setCollege(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="inputDescription">
            <Form.Label>Description:{user.description}</Form.Label>
            <Form.Control
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="inputEmail">
            <Form.Label>Email:{user.email}</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="inputPicture">
            <Form.Label>Picture:{user.picture}</Form.Label>
            <Form.Control
              type="text"
              value={picture}
              onChange={(e) => setPicture(e.target.value)}
            />
          </Form.Group>
          <Button onClick={handleUpdate}>Update</Button>
        </div>
      )}

    </div>
  )
}
