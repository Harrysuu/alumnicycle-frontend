import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Container, Nav, Navbar, Button, Card, Col, Form, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

export default function Login() {
  const [isPhoneLogin, setIsPhoneLogin] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [countdown, setCountdown] = useState(180);
  const [timer, setTimer] = useState(null);

  const imageStyle = {
    width: '100%',
    height: 'auto',
  };
  const cardStyle = {
    width: '100%',
    height: '100vh',
  };

  const [loginData, setLoginData] = useState({
    userName: '',
    password: '',
    phoneNumber: '',
    code: '',
  });

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/user/login', loginData);
      // 处理登录成功的逻辑，可能会存储用户信息等
      console.log('Login successful:', response.data);
      localStorage.setItem('userId', response.data.id);
      console.log(localStorage.getItem('userId'))
      // 重定向到其他页面，例如用户主页
      history.push('/');
    } catch (error) {
      console.error('Login error:', error);
      // 处理登录失败的逻辑，例如显示错误消息
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevLoginData) => ({
      ...prevLoginData,
      [name]: value,
    }));
  };
  
  const handleToggleLogin = () => {
    setIsPhoneLogin(!isPhoneLogin);
    setShowVerification(false); // Hide the verification input
  };

  const handleGetVerificationCode = () => {
    setShowVerification(true);
    setCountdown(180); // Reset countdown

    const timer = setInterval(() => {
      if (countdown > 1) {
        setCountdown((prevCountdown) => prevCountdown - 1); // Use closure to ensure using the latest countdown value
      } else {
        clearInterval(timer);
        setShowVerification(false); // Hide the verification input
      }
    }, 1000);
    setTimer(timer);
  };

  useEffect(() => {
    // Clear the timer
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [timer]);

  return (
    <div style={{ position: 'fixed', top: '0', right: '0', bottom: '0', left: '0', overflow: 'auto', backgroundColor: 'white' }}>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/"><img src="/Logo.png" alt="" style={{width: '40%'}} /></Navbar.Brand>
          <Navbar.Brand href="/">Alumni Circle</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">About us</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <div style={{ display: 'flex', width: '100%' }}>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <Card bg="light" text="dark" style={cardStyle}>
            <Card.Body>
              <Container>
                <Row>
                  <Col md={6}>
                    <h1>{isPhoneLogin ? 'Phone Login' : 'Login'}</h1>
                    <Form onSubmit={handleSubmit}>
                    {isPhoneLogin ? (
                      <Form.Group controlId="phone">
                        <Form.Label>Phone Number</Form.Label>
                        <div style={{ display: 'flex' }}>
                          <Form.Control 
                          type="text" 
                          placeholder="Enter your phone number"
                          name='phoneNumber' 
                          value={loginData.phoneNumber}
                          onChange={handleChange}
                          />
                        </div> 
                      </Form.Group>
                    ): (
                        <>
                          <Form.Group controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control 
                            type="text" 
                            placeholder="Enter your username" 
                            name='userName'
                            value={loginData.userName}
                            onChange={handleChange}
                            />
                          </Form.Group>
                          <Form.Group controlId="password" >
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                            type="password" 
                            placeholder="Enter your password" 
                            name= 'password'
                            value={loginData.password}
                            onChange={handleChange}
                            />
                          </Form.Group>
                          <Button variant="primary" type="submit" style={{marginTop: '5px'}}>
                            Login
                          </Button>
                        </>
                      )}

                      {showVerification ? (
                        <>
                          <Form.Group controlId="verification">
                            <Form.Label>Verification Code</Form.Label>
                            <Form.Control 
                            type="text" 
                            placeholder="Enter verification code" 
                            name='code'
                            value={loginData.code}
                            onChange={handleChange}
                            />
                            {showVerification ? (
                            <div className="col-auto">
                              <span id="codeHelpInline" class="form-text">
                              {`(${countdown}s)`}
                              </span>
                            </div>
                          ) : null}
                          </Form.Group>
                          <Button variant="primary" type="submit" style={{marginTop: '5px'}}>
                            Login
                          </Button>
                        </>
                      ) : (
                        isPhoneLogin && (
                          <Button variant="primary" onClick={handleGetVerificationCode} style={{marginTop: '5px'}}>
                            Get verification code
                          </Button>
                        )
                      )}
                    </Form>
                    <Button variant="link" onClick={handleToggleLogin}>
                      {isPhoneLogin ? 'Use Username and Password' : 'Use Phone Number'}
                    </Button>
                  </Col>
                </Row>
              </Container>
            </Card.Body>
          </Card>
        </div>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <img src="/fb_share1.png" alt="" style={imageStyle} />
        </div>
      </div>
    </div>
  );
}
