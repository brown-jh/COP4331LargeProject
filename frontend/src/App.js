import React from 'react';

import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import SearchPage from './pages/SearchPage';
import HomePage from './pages/HomePage';
import MakeEventPage from './pages/MakeEventPage';
import EventPage from './pages/EventPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import FinishPasswordPage from './pages/FinishPasswordPage';
import FinishRegisterPage from './pages/FinishRegisterPage';
import MakeGroupPage from './pages/MakeGroupPage';

function App() {  
  return (    
    <Router >      
      <Switch>        
        <Route path="/" exact>          
          <LoginPage />        
        </Route>   
        <Route path="/home" exact>          
          <HomePage />        
        </Route>
        <Route path="/register" exact>          
          <RegisterPage />        
        </Route>  
        <Route path="/completeregister" exact>          
          <FinishRegisterPage />        
        </Route>
        <Route path="/search" exact>          
          <SearchPage />        
        </Route>
        <Route path="/newevent" exact>          
          <MakeEventPage />        
        </Route>
        <Route path="/events" exact>          
          <EventPage />        
        </Route>
        <Route path="/forgotpassword" exact>          
          <ForgotPasswordPage />        
        </Route>
        <Route path="/resetpassword" exact>          
          <FinishPasswordPage />        
        </Route>
        <Route path="/newgroup" exact>          
          <MakeGroupPage />        
        </Route>
        <Redirect to="/" />      
      </Switch>      
    </Router>  
  );
}

export default App;
