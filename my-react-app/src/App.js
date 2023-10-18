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
import UserResetPassword from './layouts/UserPage/components/UserResetPassword';
import UserUpdateProfile from './layouts/UserPage/components/UserUpdateProfile';
import LifePostUpdate from './layouts/LifePost/components/LifePostUpdate';
import LifePostDelete from './layouts/LifePost/components/LifePostDelete';
import AcademicPost from './layouts/AcademicPost/AcademicPost';
import UniTrade from './layouts/UniTrade/UniTrade';
import UserAcademic from './layouts/UserPage/components/UserAcademic';
import UserUniTrade from './layouts/UserPage/components/UserUniTrade';
import Login from './layouts/Login/Login';
import UserPicture from './layouts/UserPage/components/UserPicture';
import ViewOtherUser from './layouts/ViewOtherUser/ViewOtherUser';
import ViewLifePost from './layouts/ViewOtherUser/components/ViewLifePost';
import ViewAcademic from './layouts/ViewOtherUser/components/ViewAcademic';
import ViewUniTrade from './layouts/ViewOtherUser/components/ViewUniTrade';

function App() {
  const [isLoginPage, setIsLoginPage] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
      // 根据当前路径判断是否为登录页
    const currentPath = window.location.pathname;
    if (currentPath === '/login/page') {
      setIsLoginPage(true);
    } else {
      setIsLoginPage(false);
    }
    if (localStorage.getItem('userId')) {
      setIsLoggedIn(true);
    } else{
      setIsLoggedIn(false);
    }
  }, []);

    const customStyle = {
    backgroundColor: '#ccdce8', // 设置背景颜色为浅蓝色
    // 可以添加其他样式属性，例如颜色、边框等
  };

  return (
    <>
    {!isLoginPage && isLoggedIn && <Navigator/>}
      <div className="container " style= {customStyle}>
        <div className="row">
          <div className="col-md-10">
            <div>
              <Router>
                <Switch>
                  <Route exact path="/"> <HomePage /></Route>
                  <Route path="/announcement/:id" component={AnnouncementShow} />
                
                  <Route path="/lifepost/page" component={LifePostCard} />
                  <Route path="/lifepost/:id" component={LifePostShow} />
                  <Route path="/addNewLifePost" component={LifePostAdd} />
                  <Route path="/updateLifePost/:postId" component={LifePostUpdate} />
                  <Route path="/deleteLifePost/:postId" component={LifePostDelete} />
                  {/* <Route path="/ViewUser" component={EnrolledUser} /> */}

                  <Route path="/academic/page" component={AcademicPost} />

                  <Route path="/uniTrade/page" component={UniTrade} />

                  <Route path="/user/page" component={UserPage} />
                  <Route path="/user/addcredit" component={UserCredit} />
                  <Route path="/user/updateProfile" component={UserUpdateProfile} />
                  <Route path="/user/reset" component={UserResetPassword} />
                  <Route path="/user/posts" component={UserPosts} />
                  <Route path="/user/academicPost" component={UserAcademic} />
                  <Route path="/user/uniTradePost" component={UserUniTrade} />

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


          <div className="col-md-2" >
            {isLoginPage ? null :(
              <div className="d-flex justify-content-end align-items-start" style={{ minHeight: '100vh'}}>

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