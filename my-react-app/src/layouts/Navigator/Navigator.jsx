import React from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';


export default function Navigator() {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">Alumni Circle</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/home">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>

          <Button>Register</Button>

          <Button>Sign In</Button>

        </Container>
      </Navbar>
      
    </>
  );
}
