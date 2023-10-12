import React, { useState, useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';


export default function beifen() {
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
          <Nav.Link as={Link} to="/user/reset">Reset Password</Nav.Link>
        </Nav.Item>


        <Nav.Item>
          <Nav.Link as={Link} to="/user/posts">Posts</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/user/favorites">Favorites</Nav.Link>
        </Nav.Item>
      </Nav>


      <div>

        <Form.Group controlId="inputCredit">
          {/* <Form.Label>Add Credit:</Form.Label> */}
          {/* <Form.Control
            type="number"
            inputMode="none"
            value={creditToAdd}
            onChange={(e) => setCreditToAdd(Number(e.target.value))}
          />
          <Form.Text muted>
            Please enter the amount of credit you want to add.
          </Form.Text> */}
        </Form.Group>
        <Button onClick={handleReset}>Reset</Button>
      </div>


    </div>
  )
}
