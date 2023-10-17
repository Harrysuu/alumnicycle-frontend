import React, { useState } from 'react';
import { Container, Nav, Navbar, Button, Card, Col, Form, Row } from 'react-bootstrap';

export default function Login() {
  const [isPhoneLogin, setIsPhoneLogin] = useState(false);

  const imageStyle = {
    margin: '5px',
    position: 'relative',
    bottom: '220px',
    left: '900px',
  };
  const cardStyle = {
    width: '800px',
    height: '200px',
    position: 'fixed',
    top: '500px',
    left: '90px',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const handleToggleLogin = () => {
    setIsPhoneLogin(!isPhoneLogin);
  };

  return (
    <div style={{ position: 'fixed', top: '0', right: '0', bottom: '0', left: '0', overflow: 'auto', backgroundColor: 'white' }}>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">Alumni Circle</Navbar.Brand>
          <Navbar.Brand>Logo</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">About us</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <div style={cardStyle}>
        <Card bg="light" text="dark">
          <Card.Body>
            <Container>
              <Row>
                <Col md={6}>
                  <h1>{isPhoneLogin ? 'Phone Login' : 'Login'}</h1>
                  <Form>
                    {isPhoneLogin ? (
                      <Form.Group controlId="phone">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control type="text" placeholder="Enter your phone number" />
                      </Form.Group>
                    ) : (
                      <>
                        <Form.Group controlId="username">
                          <Form.Label>Username</Form.Label>
                          <Form.Control type="text" placeholder="Enter your username" />
                        </Form.Group>
                        <Form.Group controlId="password">
                          <Form.Label>Password</Form.Label>
                          <Form.Control type="password" placeholder="Enter your password" />
                        </Form.Group>
                      </>
                    )}

                    <Button variant="primary" type="submit" style={{ marginTop: '10px' }}>
                      {isPhoneLogin ? 'Send Verification Code' : 'Login'}
                    </Button>
                  </Form>
                  <Button variant="link" onClick={handleToggleLogin}>
                    {isPhoneLogin ? 'Use Username and Password' : 'Use Phone Number'}
                  </Button>
                </Col>
              </Row>
              <div className="col-md-6">
                <img src="/fb_share1.png" alt="" style={imageStyle} />
              </div>
            </Container>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
