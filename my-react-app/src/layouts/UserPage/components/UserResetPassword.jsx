import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';

export default function UserResetPassword() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const handleReset = () => {
    // 发起HTTP请求来更改用户密码
    axios.post('/user/changePassword', { oldPassword, newPassword })
      .then(response => {
        console.log(response.data.res);
        if (response.data.res) {
          // 密码更改成功
          setOldPassword('');
          setNewPassword('');
          alert("Successful Reset");
        } else {
          setOldPassword('');
          setNewPassword('');
          alert("Unsuccessful Reset");
        }
      })
      .catch(error => {
        // 处理错误，例如密码更改失败
        console.error('Error changing password:', error);
      });
  };

  return (
    <div style={{ width: '50rem' }}>
      <Nav fill variant="tabs" defaultActiveKey="/user/reset" style={{ fontSize: '16px', padding: '10px' }}>
        <Nav.Item >
          <Nav.Link as={Link} to="/user/page" >Profile</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/user/addcredit" >Add Credit</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/user/updateProfile">Update Profile</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/user/reset" active>Reset Password</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/user/posts">Posts</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/user/favorites">Favorites</Nav.Link>
        </Nav.Item>
      </Nav>

      <div>
        <Form.Group controlId="inputOldPassword">
          <Form.Label>Old Password:</Form.Label>
          <Form.Control
            type={showOldPassword ? "text" : "password"}
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <Button
            variant="secondary"
            onClick={() => setShowOldPassword(!showOldPassword)}
          >
            Show
          </Button>
        </Form.Group>

        <Form.Group controlId="inputNewPassword">
          <Form.Label>New Password:</Form.Label>
          <Form.Control
            type={showNewPassword ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <Button
            variant="secondary"
            onClick={() => setShowNewPassword(!showNewPassword)}
          >
            Show
          </Button>
        </Form.Group>
        <br></br>
        <Button onClick={handleReset}>Reset</Button>
      </div>
    </div>
  );
}
