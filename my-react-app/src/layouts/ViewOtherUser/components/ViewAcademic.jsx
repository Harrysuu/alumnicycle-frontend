import React, { useState, useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function ViewAcademic(props) {

  const userId = props.match.params.userId;

  return (
    <div style={{ width: '50rem' }}>
    <Nav fill variant="tabs" defaultActiveKey={`/ViewOtherUser/${userId}`} style={{ fontSize: '16px', padding: '10px' }}>
      <Nav.Item>
        <Nav.Link as={Link} to={`/ViewOtherUser/${userId}`} >Profile</Nav.Link>
      </Nav.Item>

      <Nav.Item>
        <Nav.Link as={Link}  to={`/ViewLifePost/${userId}`} >Life Posts</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link}  to={`/ViewAcademic/${userId}`} active >Academic</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link}  to={`/ViewUniTrade/${userId}`} >UniTrade</Nav.Link>
      </Nav.Item>

    </Nav>


   

  </div>
  )
}
