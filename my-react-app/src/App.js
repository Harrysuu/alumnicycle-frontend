import React from 'react';
import HomePage from './layouts/HomePage/HomePage';
import Navigator from './layouts/Navigator/Navigator';
import NotFound from './layouts/NotFound/NotFound';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <>
      <Navigator/>
      <div>
        <Router>
          <Switch>
            <Route exact path ="/"> <HomePage/></Route>

            <Route> <NotFound/></Route>
          </Switch>
        </Router>
        
      
      </div>
    </>
  );
}

export default App