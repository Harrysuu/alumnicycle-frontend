import React from 'react'
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

export default function UserUniTrade() {
  return (
    <div style={{ width: '50rem' }}>

<Nav fill variant="tabs" defaultActiveKey="/user/posts" style={{ fontSize: '16px', padding: '10px' }}>
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
          <Nav.Link as={Link} to="/user/reset" style={{ color: 'white' }}>Reset Password</Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link as={Link} to="/user/posts" active style={{ color: 'dark' }}>Posts</Nav.Link>
        </Nav.Item>

      </Nav>

      <Nav fill variant="tabs" defaultActiveKey="/user/posts" style={{ fontSize: '14px', padding: '10px' }}>

        <Nav.Item>
          <Nav.Link as={Link} to="/user/posts"  style={{ color: 'white' }}>Life Posts</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/user/academicPost" style={{ color: 'white' }}>Academic</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/user/uniTradePost"  active style={{ color: 'dark' }}>UniTrade</Nav.Link>
        </Nav.Item>
      </Nav>

    </div>
  )
}
