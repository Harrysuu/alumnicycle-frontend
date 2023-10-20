import React, { useState } from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';
import bg1 from './bg1.png';
import bg2 from './bg2.png';
import bg3 from './bg3.png';
import bg4 from './bg4.png';
import bg5 from './bg5.png';

export default function Navigator() {


  const [cardStyle, setCardStyle] = useState({
    height: '300px',
    background: `url(${bg1})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  });

  const history = useHistory();

  function updateCardStyle(newStyle) {
    setCardStyle(newStyle);
  }

  function logout() {
    localStorage.removeItem("userId");
    history.push('login/page');
  }

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>

          <Navbar.Brand href="/"><img src="/Logo.png" alt="" style={{ width: '20%' }} />    Alumni Circle</Navbar.Brand>

          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/lifepost/page">LifePost</Nav.Link>
            <Nav.Link href="/academic/page">AcademicPost</Nav.Link>
            <Nav.Link href="/secondPost/page">SecondPost</Nav.Link>
          </Nav>

          <Button href="/user/page">User</Button>

          <Button href="/login/page">Login</Button>

          <Button href="/" onClick={logout}>Logout</Button>


        </Container>
      </Navbar>

      <Router>


        <Card text="light" style={cardStyle}>
          <Card.Body>
            <Container>
              <Switch>
                <Route path="/lifepost" render={() => {
                  const newStyle = {
                    height: '300px',
                    background: `url(${bg2})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  };
                  updateCardStyle(newStyle);
                  return (
                    <>
                      <h1>LifePost to Share, Enroll, and Experience Together</h1>
                      <p>In this forum, students have the opportunity to create and share posts about various events and activities that others can join. Whether it's a sports game, a social gathering, or a study group, our platform is the perfect place to post and let fellow students know about your upcoming events. Share your plans, interests, and opportunities for others to enroll and participate. It's a hub for students to connect, engage, and enrich their university experience together.</p>
                    </>
                  );
                }} />
                <Route path="/user" render={() => {
                  const newStyle = {
                    height: '300px',
                    background: `url(${bg3})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  };
                  updateCardStyle(newStyle);
                  return (
                    <>
                      <h1>Welcome to Your Profile</h1>
                      <p>Creating, Engaging, and Connecting Lives</p>
                    </>
                  );
                }} />
                <Route path="/academic" render={() => {
                  const newStyle = {
                    height: '300px',
                    background: `url(${bg5})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  };
                  updateCardStyle(newStyle);
                  return (
                    <>
                      <h1>AcademicPost to Navigate Your Acadamic and Career Journey with Us </h1>
                      <p>Staying true to our academic roots, we offer a dedicated section where you can ask academic questions, seek advice, and foster intellectual discussions. Connect with like-minded alumni to explore new knowledge, ideas, and academic pursuits. We offer a dedicated job-seeking section to help you find job opportunities, network with alumni in your industry, and access career development resources. Take your career to new heights with the support of a thriving alumni network.</p>
                    </>
                  );
                }} />
                <Route path="/uniTrade" render={() => {
                  const newStyle = {
                    height: '300px',
                    background: `url(${bg4})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  };
                  updateCardStyle(newStyle);
                  return (
                    <>
                      <h1>UniTrade to Shop Smart, Give Items New Starts</h1>
                      <p>Looking to buy or sell items within a trusted community? Our second-hand goods marketplace is the place to be. Discover great deals on everything from textbooks to furniture while giving your unused items a new life.</p>
                    </>
                  );
                }} />
                <Route path="/" render={() => {
                  const newStyle = {
                    height: '300px',
                    background: `url(${bg1})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  };
                  updateCardStyle(newStyle);
                  return (
                    <>
                      <h1>Welcome to Alumni Circle</h1>
                      <p>Welcome to the USYD Alumni Circle Forum, the ultimate online platform designed exclusively for University of Sydney alumni to connect, share, and engage in a vibrant community. Our forum serves as a dynamic space for alumni to stay connected with their fellow graduates, access valuable resources, and explore a wide range of opportunities. </p>
                    </>
                  );
                }} />
              </Switch>
            </Container>
          </Card.Body>
        </Card>
      </Router>
    </>
  );
}
