import React from 'react';
import HomePage from './layouts/HomePage/HomePage';
import Navigator from './layouts/Navigator/Navigator';
import NotFound from './layouts/NotFound/NotFound';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

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

                  <Route> <NotFound /></Route>
                </Switch>
              </Router>

            </div>

          </div>
          <div className="col-md-2">
            <div className="d-flex justify-content-end align-items-start" style={{ minHeight: '100vh' }}>

              <p>This is a right-top div</p>
            </div>
          </div>
        </div>
      </div>




    </>
  );
}

export default App