import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import HomePage from './layouts/HomePage/HomePage';
import Navigator from './layouts/Navigator/Navigator';
import NotFound from './layouts/NotFound/NotFound';
import GuideSide from './layouts/GuideSide/GuideSide';
import AnnouncementShow from './layouts/HomePage/components/AnnouncementShow';
import LifePostShow from './layouts/LifePost/components/LifePostShow';
import LifePostCard from './layouts/LifePost/components/LifePostCard';
// import Footer from './layouts/Navigator/Footer';
import LifePostAdd from './layouts/LifePost/components/LifePostAdd';
import UserPage from './layouts/UserPage/UserPage';
import UserPosts from './layouts/UserPage/components/UserPosts';
import UserCredit from './layouts/UserPage/components/UserCredit';
import UserPicture from './layouts/UserPage/components/UserPicture';
import UserResetPassword from './layouts/UserPage/components/UserResetPassword';
import UserUpdateProfile from './layouts/UserPage/components/UserUpdateProfile';
import LifePostUpdate from './layouts/LifePost/components/LifePostUpdate';
import LifePostDelete from './layouts/LifePost/components/LifePostDelete';
import AcademicPost from './layouts/AcademicPost/AcademicPost';
import UserAcademic from './layouts/UserPage/components/UserAcademic';
import Login from './layouts/Login/Login';
import SecondPostCard from './layouts/SecondPost/components/SecondPostCard';
import SecondPostShow from './layouts/SecondPost/components/SecondPostShow';
import SecondPostAdd from './layouts/SecondPost/components/SecondPostAdd';
import SecondPost from './layouts/SecondPost/SecondPost';
import SecondPostUpdate from './layouts/SecondPost/components/SecondPostUpdate';
import SecondPostDelete from './layouts/SecondPost/components/SecondPostDelete';
import ViewOtherUser from './layouts/ViewOtherUser/ViewOtherUser'
import ViewAcademic from './layouts/ViewOtherUser/components/ViewAcademic'
import ViewLifePost from './layouts/ViewOtherUser/components/ViewLifePost'
import ViewUniTrade from './layouts/ViewOtherUser/components/ViewUniTrade';

function App() {
  const [isLoginPage, setIsLoginPage] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {

    // 根据当前路径判断是否为登录页
    const currentPath = window.location.pathname;
    console.log(currentPath)
    if (currentPath === '/login/page') {
      setIsLoginPage(true);
    } else {
      setIsLoginPage(false);
    }
    //
    if (localStorage.getItem('userId')) {
      setIsLoggedIn(true);
    } else{
      setIsLoggedIn(false);
    }
  }, []);

    const customStyle = {
    backgroundColor: '#8d9da8', // 设置背景颜色为深蓝色 #55738a #ccdce8
    width: '100%',               // 设置宽度为100%
    padding: '0px 300px',             // 设置padding值
    boxSizing: 'border-box'      // 使用box-sizing: border-box;

  };

  return (
    <>
    {!isLoginPage && isLoggedIn && <Navigator/>}
      <div className="container-fluid  " style= {customStyle}>
      <div className="d-flex justify-content-center">
          <div className="col-md-10" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
            <div>
              <Router>
                <Switch>
                  <Route exact path="/"> <HomePage /></Route>
                  <Route path="/announcement/:id" component={AnnouncementShow} />
                
                  <Route path="/lifePost/page" component={LifePostCard} />
                  <Route path="/lifePost/:id" component={LifePostShow} />
                  <Route path="/addNewLifePost" component={LifePostAdd} />
                  <Route path="/updateLifePost/:postId" component={LifePostUpdate} />
                  <Route path="/deleteLifePost/:postId" component={LifePostDelete} />
                  {/* <Route path="/ViewUser" component={EnrolledUser} /> */}

                  <Route path="/academic/page" component={AcademicPost} />


                  <Route path="/secondPost/page" component={SecondPostCard} />
                  <Route path="/secondPost/:id" component={SecondPostShow} />
                  <Route path="/addNewSecondPost" component={SecondPostAdd} />
                  <Route path="/updateSecondPost/:postId" component={SecondPostUpdate} />
                  <Route path="/deleteSecondPost/:postId" component={SecondPostDelete} />

                  <Route path="/user/page" component={UserPage} />
                  <Route path="/user/addCredit" component={UserCredit} />
                  <Route path="/user/updateProfile" component={UserUpdateProfile} />
                  <Route path="/user/reset" component={UserResetPassword} />
                  <Route path="/user/posts" component={UserPosts} />
                  <Route path="/user/academicPost" component={UserAcademic} />
                  <Route path="/user/uniTradePost" component={SecondPost} />

                  <Route path="/user/picture" component={UserPicture} />

                  {isLoginPage && <Route path="/login/page" component={Login} />}


                  <Route path="/ViewOtherUser/:userId" component={ViewOtherUser} />
                  <Route path="/ViewLifePost/:userId" component={ViewLifePost} />
                  <Route path="/ViewAcademic/:userId" component={ViewAcademic} />
                  <Route path="/ViewUniTrade/:userId" component={ViewUniTrade} />
                  


                  <Route> <NotFound /></Route>
                </Switch>
              </Router>

            </div>
          </div>


          <div className="col-md-2" style={{ marginLeft: 'auto', marginRight: 'auto' }} >
            {isLoginPage ? null :(
              <div className="d-flex justify-content-end align-items-start" style={{ minHeight: '100vh' }}>

              <GuideSide />
            </div>
            )}
          </div>
        </div>


      </div>
      {/* <Footer /> */}



    </>
  );
}

export default App