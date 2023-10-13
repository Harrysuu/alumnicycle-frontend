import React from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


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
            <Nav.Link href="/academic/page">AcademicPost</Nav.Link>
            <Nav.Link href="/uniTrade/page">UniTrade</Nav.Link>
          </Nav>

          <Button href="/user/page">User</Button>

          <Button href="/">Login</Button>

          <Button href="/">Logout</Button>

        </Container>
      </Navbar>

      <Router>
      <Navbar bg="dark" data-bs-theme="dark">
        {/* ... navigation bar content */}
      </Navbar>

      <Card bg="light" text="dark" style={cardStyle}>
        <Card.Body>
          <Container>
            <Switch>
              <Route path="/lifepost">
                <h1>Welcome to the LifePost Page</h1>
                <p>This is the LifePost description.</p>
              </Route>
              {/* 修改此处 */}
              <Route path="/user">
                <h1>Welcome to the Your Profile</h1>
                <p>This is the other page description.</p>
              </Route>
              <Route path="/">
                <h1>Welcome to Alumni Circle</h1>
                <p>This is an Alumni Connection platform for all USYD students.</p>
              </Route>
            </Switch>
          </Container>
        </Card.Body>
      </Card>
    </Router>


    </>
  );
}
