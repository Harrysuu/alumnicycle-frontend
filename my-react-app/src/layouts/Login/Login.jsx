import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Container, Nav, Navbar, Button, Card, Col, Form, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import "./Login.css"

export default function Login() {
  const [isPhoneLogin, setIsPhoneLogin] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  
  const [isShowRegister,setIsShowRegister] = useState(false)
  const [countdown, setCountdown] = useState(180);
  const [timer, setTimer] = useState(null);
  const [isRegister, setIsRegister] = useState(false);
  
  const [isShowErrortips,setIsShowErrortips]=useState(false)
  
  const [tips,setTips] = useState("")
  const phoneRex = /^(13[0-9]|14[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])\d{8}$/;
  const  regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!]).{8,}$/;

  
  function toggleLogin  (){
    setIsShowRegister (!isShowRegister)
    setIsShowErrortips (false)
  }

  const imageStyle = {
    width: '100%',
    height: 'auto',
  };
  const cardStyle = {
    width: '100%',
    height: '100vh',
  };

  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
    phoneNumber: '',
    code: '',
  });

  const [SignData,setSignData] = useState({
    college: "",
    email: "", 
    password: "",
    phoneNumber: "",
    username: ""
  })

  const history = useHistory();



  const handleSubmit = async (e) => {
    e.preventDefault();
    const {username,password,code} = loginData
    if (isPhoneLogin){
      const {phoneNumber} = loginData
      if (!phoneNumber){
        setIsShowErrortips (true)
        setTips ('please input your phoneNumber ')
        return
      }
      else if (!phoneRex.test(phoneNumber)){
        setIsShowErrortips (true)
        setTips ('phoneNumber does not meet the requirement')
        return
      }else if (code.length!==4){
          setIsShowErrortips (true)
          setTips("The verification code should be 4 digits")
          return
      }
    }else{
      if (!username){
        setIsShowErrortips (true)
        setTips ('please input your username')
        return
      }
      else if (!regex.test(password)){
        setIsShowErrortips (true)
        setTips ('password does not meet the requirement')
        return
      }
      else{
        setIsShowErrortips (false)
      }
    }
    try {
      const response = await axios.post('/user/login', loginData);
      console.log(response)
      
      console.log('Login successful:', response.data);
      if (response.data.res===0){
        setIsShowErrortips (true)
        setTips (response.data.resMsg)
      }else{
        
        localStorage.setItem('userId', response.data.result.id);
        sessionStorage.setItem('User',response.data.result.id);
       
        history.push('/');
        window.location.reload()
      }
    } catch (error) {
      console.error('Login error:', error);
     
    }

  };


  const handleRegisterSubmit = async (e)=>{
    e.preventDefault();
      const {college,email,password,confirmPassword,phoneNumber,username} = SignData
      if (!username){
        setIsShowErrortips (true)
        setTips ('please input your username')
      }else if (!email){
        setIsShowErrortips (true)
        setTips ('please input your email')
      }else if (!phoneRex.test(phoneNumber)){
        setIsShowErrortips (true)
        setTips ('phoneNumber does not meet the requirement')
      }else if (!regex.test(password)){
        setIsShowErrortips (true)
        setTips ('password does not meet the requirement')
      }else if (password!==confirmPassword){
        setIsShowErrortips (true)
        setTips ('The two password inputs are inconsistent')
      }else if (!college){
        setIsShowErrortips (true)
        setTips ('please select college')
      }else{
        const response= await axios.post('/user/signup',{college,password,email,phoneNumber,username})
        console.log(response)
        if (response.data.res===0){
          setIsShowErrortips (true)
          setTips (response.data.resMsg)
        }else{
          
          localStorage.setItem('userId', response.data.result.id);
        
          history.push('/');
          window.location.reload()
        }
      }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevLoginData) => ({
      ...prevLoginData,
      [name]: value,
    }));
  };

  const handleRegisterForm = (e) => {
    console.log(e)
    e.preventDefault()
    const { name, value } = e.target;
    setSignData((prevLoginData) => ({
      ...prevLoginData,
      [name]: value,
    }));
  };
  
  const handleToggleLogin = () => {
    setIsPhoneLogin(!isPhoneLogin);
    setIsShowErrortips(false);
    setShowVerification(false); // Hide the verification input
    setIsRegister(!isRegister);
  };

  const handleGetVerificationCode = async () => {
    const phoneRex = /^(13[0-9]|14[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])\d{8}$/;
    const {phoneNumber} = loginData
    if (!phoneNumber){
      setIsShowErrortips (true)
      setTips ('please input your phoneNumber ')
      return
    }
    else if (!phoneRex.test(phoneNumber)){
      setIsShowErrortips (true)
      setTips ('phoneNumber does not meet the requirement')
      return
    }
    setShowVerification(true);
    setCountdown(180); // Reset countdown
    const   response=  await axios.post(`/user/loginWithPhone?phoneNumber=${phoneNumber}`);
    console.log(response)
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
    if (localStorage.getItem('userId')){
      history.push('/')
    }
    // Clear the timer
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
    // eslint-disable-next-line
  }, [timer]);

  return (
    <div style={{ position: 'fixed', top: '0', right: '0', bottom: '0', left: '0', overflow: 'auto', backgroundColor: 'white' }}>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/"><img src="/Logo.png" alt="" style={{width: '50%'}} /></Navbar.Brand>
          <Navbar.Brand href="/">Alumni Circle</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">About us</Nav.Link>
          </Nav>
          <Button onClick={toggleLogin}>{isShowRegister ? 'Login':'Register'} </Button>
        </Container>
      </Navbar>

      <div style={{ display: 'flex', width: '100%' }}>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <Card bg="light" text="dark" style={cardStyle}>
            <Card.Body>
              <Container>
                <Row>
                  {
                    isShowRegister ?   <Col md={6}>
                      <h1>Register</h1>
                      <Form onSubmit={handleRegisterSubmit}>
                              <Form.Group controlId="username">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your username"
                                    name='username'
                                    value={SignData.username}
                                    onChange={handleRegisterForm}
                                />
                              </Form.Group>
                              <Form.Group controlId="username">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter your Email"
                                    name='email'
                                    value={SignData.email}
                                    onChange={handleRegisterForm}
                                />
                              </Form.Group>
                              <Form.Group controlId="phoneNumber">
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your phone number"
                                    name='phoneNumber'
                                    value={SignData.phoneNumber}
                                    onChange={handleRegisterForm}
                                />
                              </Form.Group>
                              <Form.Group controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter your password"
                                    name= 'password'
                                    value={SignData.password}
                                    onChange={handleRegisterForm}
                                />
                              </Form.Group>
                              <Form.Group controlId="confirmPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter your password"
                                    name= 'confirmPassword'
                                    value={SignData.confirmPassword}
                                    onChange={handleRegisterForm}
                                />
                              </Form.Group>
                              <Form.Group controlId="password">
                                <Form.Label>Faculty</Form.Label>
                                <Form.Select aria-label="Default select example"  value={SignData.college} name="college" onChange={handleRegisterForm}>
                                  {
                                    ['Art & social sciences','Architecture, design and planning','Business','Economics',
                                    'Education & social work','Engineering and computer science','Law',
                                    'Medicine & health','Music','Science'].map((item,index)=>{
                                      return <option value={item} key={index}>{item}</option>
                                    })
                                  }
                                </Form.Select>
                              </Form.Group>
                              <div className="loginButton registerButton" >
                                <p style={{display: isShowErrortips ? "block":"none"}}>{tips}</p>
                                <Button variant="primary" type="submit" style={{marginTop: '5px'}}>
                                  Register
                                </Button>
                              </div>
                      </Form>
                      <Button variant="link" onClick={toggleLogin}>
                       Login
                      </Button>
                    </Col> :
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
                                    name='username'
                                    value={loginData.username}
                                    onChange={handleChange}
                                />
                              </Form.Group>
                              <Form.Group controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter your password"
                                    name= 'password'
                                    value={loginData.password}
                                    onChange={handleChange}
                                />
                              </Form.Group>
                              <div className="loginButton">
                                <p style={{display: isShowErrortips ? "block":"none"}}>{tips}</p>
                                <Button variant="primary" type="submit" style={{marginTop: '5px'}}>
                                  Login
                                </Button>
                              </div>

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
                              <span id="codeHelpInline" className="form-text">
                              {`(${countdown}s)`}
                              </span>
                                    </div>
                                ) : null}
                              </Form.Group>
                              <div className="loginButton">
                                <p style={{display: isShowErrortips ? "block":"none"}}>{tips}</p>
                                <Button variant="primary" type="submit" style={{marginTop: '5px'}}>
                                  Login
                                </Button>
                              </div>

                            </>
                        ) : (
                            isPhoneLogin && (
                                <div className="loginButton">
                                  <p style={{display: isShowErrortips ? "block":"none"}}>{tips}</p>
                                  <Button variant="primary" onClick={handleGetVerificationCode} style={{marginTop: '5px'}}>
                                    Get verification code
                                  </Button>
                                </div>
                            )
                        )}
                      </Form>
                      <Button variant="link" onClick={handleToggleLogin}>
                        {isPhoneLogin ? 'Use Username and Password' : 'Use Phone Number'}
                      </Button>
                      <Button variant="link" onClick={toggleLogin}>
                        Register
                      </Button>
                    </Col>
                  }
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
