import React, { useEffect, useState } from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Switch ,useHistory} from 'react-router-dom';
import bg1 from './bg1.png';
import bg2 from './bg2.png';
import bg3 from './bg3.png';

export default function beifen() {

  // const [cardStyle, setCardStyle] = useState({});
  
  // useEffect(() => {
  //   // 根据不同的路径设置不同的样式
  //   if (window.location.pathname === '/lifepost') {
  //     setCardStyle(lifePostCardStyle);
  //   } else if (window.location.pathname === '/user') {
  //     setCardStyle(userCardStyle);
  //   } else {
  //     setCardStyle(defaultCardStyle);
  //   }
  // }, []);


  const cardStyle = {
    height: '300px', // 设置高度
    // backgroundColor: '#55738a', // 设置背景颜色为浅蓝色
    background: `url(${bg1})`, // 默认背景图片
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  const lifePostCardStyle = {
    height: '200px', // 设置高度
    // backgroundColor: '#55738a', // 设置背景颜色为浅蓝色
    background: `url(${bg2})`, // 默认背景图片
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  const userCardStyle = {
    height: '200px', // 设置高度
    // backgroundColor: '#55738a', // 设置背景颜色为浅蓝色
    background: `url(${bg3})`, // 默认背景图片
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  const history = useHistory ()

  function logout (){
    localStorage.removeItem("userId")
    history.push('login/page')
  }


  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/"><img src="/Logo.png" alt="" style={{width: '20%'}} />    Alumni Circle</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/lifepost/page">LifePost</Nav.Link>
            <Nav.Link href="/academic/page">AcademicPost</Nav.Link>
            <Nav.Link href="/uniTrade/page">UniTrade</Nav.Link>
          </Nav>

          <Button href="/user/page">User</Button>

          <Button href="/login/page">Login</Button>

          <Button href="/" onClick={logout}>Logout</Button>

        </Container>
      </Navbar>

      <Router>
      <Navbar bg="dark" data-bs-theme="dark">
        {/* ... navigation bar content */}
      </Navbar>


      <Card text="light" style ={cardStyle} >
        <Card.Body>
          <Container>
            <Switch>
              <Route path="/lifepost" >
                <h1>Welcome to the LifePost Page</h1>
                <p>This is the LifePost description.</p>
              </Route>
              {/* 修改此处 */}
              <Route path="/user" >
                <h1>Welcome to the Your Profile</h1>
                <p>This is the other page description.</p>
              </Route>
              <Route path="/" >
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
