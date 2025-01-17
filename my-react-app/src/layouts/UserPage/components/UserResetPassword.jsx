import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';
import { Card } from 'react-bootstrap';

export default function UserResetPassword() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  // const userId = localStorage.getItem('userId');

  const handleReset = () => {
    
    axios.post('/user/changePassword', { oldPassword, newPassword })
      .then(response => {
        console.log(response.data.res);
        if (response.data.res) {
          
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
        
        console.error('Error changing password:', error);
      });
  };

  return (
    <div style={{ width: '50rem' }}>
      <Nav fill variant="tabs" defaultActiveKey="/user/reset" style={{ fontSize: '16px', padding: '10px' }}>
        <Nav.Item >
          <Nav.Link as={Link} to="/user/page" style={{ color: 'white' }}>Profile</Nav.Link>
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
          <Nav.Link as={Link} to="/user/reset" active style={{ color: 'dark' }}>Reset Password</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/user/posts" style={{ color: 'white' }}>Posts</Nav.Link>
        </Nav.Item>

      </Nav>

      <div className="mb-4"></div>

      <Card>
        <Card.Body>
          <h3>Set Password</h3>

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
        </Card.Body>
      </Card>



    </div>
  );
}
