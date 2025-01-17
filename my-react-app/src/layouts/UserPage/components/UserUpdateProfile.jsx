import React, { useState, useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Card, Button, Form } from 'react-bootstrap';


export default function UserUpdateProfile() {
  const [user, setUser] = useState('');
  const [college, setCollege] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    
    axios.get('/user/getById', { params: { userId: userId } }) 
      .then(response => {
        console.log(response.data.result);
        setUser(response.data.result);
        setCollege(response.data.result.college);
        setDescription(response.data.result.description);
        setEmail(response.data.result.email);
        // setPicture(response.data.result.picture);
      })
      .catch(error => {
        console.error('Error fetching user:', error);
      });
    // eslint-disable-next-line
  }, []); 


  const handleUpdate = () => {

    axios.post('/user/updateUser', { ...user, college: college, description: description, email: email })
      .then(response => {
        setUser(response.data.result);
        setCollege(''); 
        setDescription(''); 
        setEmail(''); 
        // setPicture(''); 
        window.location.reload();
      })
      .catch(error => {
        console.error('Error updating user:', error);
      });

  };


  return (
    <div style={{ width: '50rem' }}>
     
      <Nav fill variant="tabs" defaultActiveKey="/user/updateProfile" style={{ fontSize: '16px', padding: '10px' }}>
        <Nav.Item >
          <Nav.Link as={Link} to="/user/page" style={{ color: 'white' }} >Profile</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/user/addcredit" style={{ color: 'white' }}>Add Credit</Nav.Link>
        </Nav.Item>


        <Nav.Item>
          <Nav.Link as={Link} to="/user/updateProfile" active style={{ color: 'dark' }}>Update Profile</Nav.Link>
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
          {user && (
            <div>
              <h3>Update Your Profile</h3>

              <Form.Group controlId="inputCollege">
                <Form.Label>College</Form.Label>
                <select
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  className="form-select"
                >
                  {['Art & social sciences', 'Architecture, design and planning', 'Business', 'Economics',
                    'Education & social work', 'Engineering and computer science', 'Law',
                    'Medicine & health', 'Music', 'Science'].map((item, index) => {
                      return (
                        <option value={item} key={index}>
                          {item}
                        </option>
                      );
                    })
                  }
                </select>
              </Form.Group>

              <Form.Group controlId="inputDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="inputEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              
              <Button onClick={handleUpdate}>Update</Button>
            </div>
          )}
        </Card.Body>
      </Card>

    </div>
  )
}
