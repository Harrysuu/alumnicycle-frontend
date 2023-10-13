import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import HomePage from './layouts/HomePage/HomePage';
import Navigator from './layouts/Navigator/Navigator';
import NotFound from './layouts/NotFound/NotFound';
import GuideSide from './layouts/GuideSide/GuideSide';
import AnnouncementShow from './layouts/HomePage/components/AnnouncementShow';
import LifePostShow from './layouts/LifePost/components/LifePostShow';
import LifePostCard from './layouts/LifePost/components/LifePostCard';
import Footer from './layouts/Navigator/Footer';
import LifePostAdd from './layouts/LifePost/components/LifePostAdd';
import UserPage from './layouts/UserPage/UserPage';
import UserPosts from './layouts/UserPage/components/UserPosts';
import UserFavorites from './layouts/UserPage/components/UserFavorites';
import UserCredit from './layouts/UserPage/components/UserCredit';
import UserResetPassword from './layouts/UserPage/components/UserResetPassword';
import UserUpdateProfile from './layouts/UserPage/components/UserUpdateProfile';
import LifePostUpdate from './layouts/LifePost/components/LifePostUpdate';
import LifePostDelete from './layouts/LifePost/components/LifePostDelete';

function App() {
  return (
    <>
      <Navigator />

      <div className="container">
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



                  <Route path="/user/page" component={UserPage} />
                  <Route path="/user/addcredit" component={UserCredit} />
                  <Route path="/user/updateProfile" component={UserUpdateProfile} />
                  <Route path="/user/reset" component={UserResetPassword} />
                  <Route path="/user/posts" component={UserPosts} />
                  <Route path="/user/favorites" component={UserFavorites} />
                  

                  


                  <Route> <NotFound /></Route>
                </Switch>
              </Router>

            </div>
          </div>


          <div className="col-md-2" >
            <div className="d-flex justify-content-end align-items-start" style={{ minHeight: '100vh'}}>

              <GuideSide />
            </div>
          </div>
        </div>


      </div>
      <Footer />




    </>
  );
}

export default App