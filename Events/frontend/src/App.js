import React from 'react';
//import logo from './logo.svg';
import { BrowserRouter as Router, Route, Redirect, Switch } 
        from 'react-router-dom';
import './App.css';

import LoginPage from './pages/LoginPage';
import EventPage from './pages/EventPage';

function App() {
  return (
    // Routing
      <Router >      
        <Switch>        
          <Route path="/" exact>          
            <LoginPage />        
          </Route>        
          <Route path="/event" exact>          
            <EventPage />        
          </Route>        
          <Redirect to="/" />      
        </Switch>      
      </Router>

    // Direct returns to the EventPage or LoginPage:
    // <EventPage />
    // <LoginPage />

    // Default App.js code
    /*
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
    */

  );
}

export default App;
