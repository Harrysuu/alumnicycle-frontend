import React from 'react'
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

export default function UserPosts() {
  return (

    <div style={{ width: '50rem' }}>
    <Nav fill variant="tabs"  defaultActiveKey="/user/posts"  style={{ fontSize: '16px', padding: '10px' }}>
      <Nav.Item >
        <Nav.Link as={Link} to="/user/page" >Profile</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/user/addcredit">Add Credit</Nav.Link>
      </Nav.Item>

      <Nav.Item>
          <Nav.Link as={Link} to="/user/updateProfile">Update Profile</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/user/reset">Reset Password</Nav.Link>
        </Nav.Item>

      <Nav.Item>
        <Nav.Link as={Link} to="/user/posts" active>Posts</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/user/favorites">Favorites</Nav.Link>
      </Nav.Item>
    </Nav>

  </div>

  )
}