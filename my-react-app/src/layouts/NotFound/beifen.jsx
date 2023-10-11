import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function UserSetting() {


  return (
    <div style={{ width: '50rem' }}>
      <Nav fill variant="tabs"  defaultActiveKey="/user/settings" style={{ fontSize: '18px', padding: '10px' }}>
        <Nav.Item >
          <Nav.Link as={Link} to="/user/page" >Profile</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/user/settings" active>Settings</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/user/posts">Posts</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/user/favorites">Favorites</Nav.Link>
        </Nav.Item>
      </Nav>


  
    </div>
  )
}
