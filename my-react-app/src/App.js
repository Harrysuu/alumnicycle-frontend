import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

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
import AcademicPostUpdate from './layouts/AcademicPost/components/AcademicPostUpdate';
import AcademicPostDelete from './layouts/AcademicPost/components/AcademicPostDelete';

import AcademicPostShow from './layouts/AcademicPost/components/AcademicPostShow';
import AcademicPostCard from './layouts/AcademicPost/components/AcademicPostCard';
import AcademicPostAdd from './layouts/AcademicPost/components/AcademicPostAdd';
import UserAcademic from './layouts/UserPage/components/UserAcademic';
import UserUniTrade from './layouts/UserPage/components/UserUniTrade';
import Login from './layouts/Login/Login';
import SecondPostCard from './layouts/SecondPost/components/SecondPostCard';
import SecondPostShow from './layouts/SecondPost/components/SecondPostShow';
import SecondPostAdd from './layouts/SecondPost/components/SecondPostAdd';

import SecondPostUpdate from './layouts/SecondPost/components/SecondPostUpdate';
import SecondPostDelete from './layouts/SecondPost/components/SecondPostDelete';
import ViewOtherUser from './layouts/ViewOtherUser/ViewOtherUser'
import ViewAcademic from './layouts/ViewOtherUser/components/ViewAcademic'
import ViewLifePost from './layouts/ViewOtherUser/components/ViewLifePost'
import ViewUniTrade from './layouts/ViewOtherUser/components/ViewUniTrade';
import ShoppingCartCard from './layouts/ShoppingCart/components/ShoppingCartCard';
import SecondPostDetail from './layouts/SecondPost/components/SecondPostDetail';


const ProtectedRoute = ({ children }) => {
  if (localStorage.getItem('userId')) {
    return children;
  }
  return <Redirect to='/login/page' />
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    if (localStorage.getItem('userId')) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const customStyle = {
    backgroundColor: '#8d9da8', 
    width: '100%',               
    padding: '30px 100px',             
    boxSizing: 'border-box'      

  };

  return (
    <>
      <div style={{ width: '100%' }}>
        {isLoggedIn && <Navigator />}
      </div>

      <div className="container-fluid  " style={customStyle}>
        <div className="d-flex justify-content-center">
          <div className="col-md-10" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
            <div>
              <Router>
                <Switch>
                  <Route path="/login/page" component={Login} />
                  <Route exact path="/">
                    <ProtectedRoute>
                      <HomePage />
                    </ProtectedRoute>
                  </Route>

                  <Route path="/announcement/:id">
                    <ProtectedRoute>
                      <AnnouncementShow />
                    </ProtectedRoute>
                  </Route>

                  <Route path="/lifePost/page">
                    <ProtectedRoute>
                      <LifePostCard />
                    </ProtectedRoute>
                  </Route>

                  <Route path="/lifepost/:id">
                    <ProtectedRoute>
                      <LifePostShow />
                    </ProtectedRoute>
                  </Route>

                  <Route path="/addNewLifePost">
                    <ProtectedRoute>
                      <LifePostAdd />
                    </ProtectedRoute>
                  </Route>

                  <Route path="/updateLifePost/:postId">
                    <ProtectedRoute>
                      <LifePostUpdate />
                    </ProtectedRoute>
                  </Route>

                  <Route path="/deleteLifePost/:postId">
                    <ProtectedRoute>
                      <LifePostDelete />
                    </ProtectedRoute>
                  </Route>
                  {/* <Route path="/ViewUser" component={EnrolledUser} /> */}

                  <Route path="/academic/page">
                    <ProtectedRoute>
                      <AcademicPostCard />
                    </ProtectedRoute>
                  </Route>


                  <Route path="/academicpost/:id">
                    <ProtectedRoute>
                      <AcademicPostShow />
                    </ProtectedRoute>
                  </Route>

                  <Route path="/addNewAcademicPost">
                    <ProtectedRoute>
                      <AcademicPostAdd />
                    </ProtectedRoute>
                  </Route>


                  <Route path="/updateAcademicPost/:postId">
                    <ProtectedRoute>
                      <AcademicPostUpdate />
                    </ProtectedRoute>
                  </Route>

                  <Route path="/deleteAcademicPost/:postId">
                    <ProtectedRoute>
                      <AcademicPostDelete />
                    </ProtectedRoute>
                  </Route>




                  <Route path="/secondPost/page">
                    <ProtectedRoute>
                      <SecondPostCard />
                    </ProtectedRoute>
                  </Route>

                  <Route path="/secondPost/:id">
                    <ProtectedRoute>
                      <SecondPostShow />
                    </ProtectedRoute>
                  </Route>

                  <Route path="/addNewSecondPost">
                    <ProtectedRoute>
                      <SecondPostAdd />
                    </ProtectedRoute>
                  </Route>

                  <Route path="/updateSecondPost/:postId">
                    <ProtectedRoute>
                      <SecondPostUpdate />
                    </ProtectedRoute>
                  </Route>

                  <Route path="/deleteSecondPost/:postId">
                    <ProtectedRoute>
                      <SecondPostDelete />
                    </ProtectedRoute>
                  </Route>

                  <Route path="/user/page">
                    <ProtectedRoute>
                      <UserPage />
                    </ProtectedRoute>
                  </Route>

                  <Route path="/user/addCredit">
                    <ProtectedRoute>
                      <UserCredit />
                    </ProtectedRoute>
                  </Route>

                  <Route path="/user/updateProfile">
                    <ProtectedRoute>
                      <UserUpdateProfile />
                    </ProtectedRoute>
                  </Route>

                  <Route path="/user/reset">
                    <ProtectedRoute>
                      <UserResetPassword />
                    </ProtectedRoute>
                  </Route>

                  <Route path="/user/posts">
                    <ProtectedRoute>
                      <UserPosts />
                    </ProtectedRoute>
                  </Route>

                  <Route path="/user/academicPost">
                    <ProtectedRoute>
                      <UserAcademic />
                    </ProtectedRoute>
                  </Route>

                  <Route path="/user/uniTradePost">
                    <ProtectedRoute>
                      <UserUniTrade />
                    </ProtectedRoute>
                  </Route>

                  <Route path="/user/picture">
                    <ProtectedRoute>
                      <UserPicture />
                    </ProtectedRoute>
                  </Route>

                  <Route path="/ViewOtherUser/:userId">
                    <ProtectedRoute>
                      <ViewOtherUser />
                    </ProtectedRoute>
                  </Route>

                  <Route path="/ViewLifePost/:userId">
                    <ProtectedRoute>
                      <ViewLifePost />
                    </ProtectedRoute>
                  </Route>

                  <Route path="/ViewAcademic/:userId">
                    <ProtectedRoute>
                      <ViewAcademic />
                    </ProtectedRoute>
                  </Route>

                  <Route path="/ViewUniTrade/:userId">
                    <ProtectedRoute>
                      <ViewUniTrade />
                    </ProtectedRoute>
                  </Route>

                  <Route path="/shopping/cartCard">
                    <ProtectedRoute>
                      <ShoppingCartCard />
                    </ProtectedRoute>
                  </Route>

                  <Route path="/secondPostDetail/:id">
                    <ProtectedRoute>
                      <SecondPostDetail />
                    </ProtectedRoute>
                  </Route>

                  <Route> <NotFound /></Route>
                </Switch>
              </Router>

            </div>
          </div>


          <div className="col-md-2" style={{ marginLeft: '0', marginRight: '0' }} >
            {isLoggedIn &&
              <div className="d-flex justify-content-end align-items-start" style={{ minHeight: '100vh' }}>
                <GuideSide />
              </div>
            }
          </div>
        </div>


      </div>
      {/* <Footer /> */}



    </>
  );
}

export default App