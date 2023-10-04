import React from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';


export default function index() {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Alumni Circle</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>

          <Button>Register</Button>

          <Button>Sign In</Button>

        </Container>
      </Navbar>
      
    </>
  );
}
