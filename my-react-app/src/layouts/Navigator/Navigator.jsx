import React from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { Card } from 'react-bootstrap';


export default function Navigator() {
  const cardStyle = {
    height: '200px', // 设置高度
  };


  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">Alumni Circle</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/lifepost/page">LifePost</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>

          <Button>Register</Button>

          <Button>Sign In</Button>

        </Container>
      </Navbar>

      <Card bg="light" text="dark" style={cardStyle}>
        <Card.Body>
          <Container>
            <h1>Welcome to Alumni Circle</h1>
            <p>
              This is an Alumni Connection platform for all USYD students.
            </p>
          </Container>
        </Card.Body>
      </Card>



    </>
  );
}
