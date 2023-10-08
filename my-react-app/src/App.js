import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import HomePage from './layouts/HomePage/HomePage';
import Navigator from './layouts/Navigator/Navigator';
import NotFound from './layouts/NotFound/NotFound';
import GuideSide from './layouts/GuideSide/GuideSide';
import AnnouncementShow from './layouts/HomePage/components/AnnouncementShow';

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

                  <Route> <NotFound /></Route>
                </Switch>
              </Router>

            </div>

          </div>
          <div className="col-md-2">
            <div className="d-flex justify-content-end align-items-start" style={{ minHeight: '100vh' }}>

              <GuideSide/>
            </div>
          </div>
        </div>
      </div>




    </>
  );
}

export default App