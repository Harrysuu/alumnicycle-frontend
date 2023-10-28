import React, { useState, useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Card } from 'react-bootstrap';
import { Image } from 'react-bootstrap';


export default function UserPage() {

  const [user, setUser] = useState(null);
  const userId = localStorage.getItem('userId');


  useEffect(() => {
    
    axios.get('/user/getById', { params: { userId: userId } }) 
      .then(response => {
        console.log(response.data.result);
        setUser(response.data.result); 
      })
      .catch(error => {
        console.error('Error fetching user:', error);
      });
    // eslint-disable-next-line
  }, []); 

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
                <div>
                  {user.picture ? (

                    <Image
                      src={`/common/download?name=${user.picture}`}
                      fluid
                      roundedCircle
                      style={{ maxWidth: '400px', maxHeight: '300px' }}
                    />
                  ) : (
                    <img
                      src="/userprofile.png"  
                      alt="User"
                      style={{ maxWidth: '400px', maxHeight: '300px' }}
                    />
                  )}
                </div>
                
                <div className="mb-4"></div>

                <p>Username: {user.username}</p>
                <p>Email: {user.email}</p>
                <p>Phone: {user.phoneNumber}</p>
                <p>Credit: {user.credit}</p>
                <p>College: {user.college}</p>
                <p>Description: {user.description}</p>




              </Card.Text>
            </Card.Body>
          </Card>
        )}
      </div>

    </div>
  )
}
