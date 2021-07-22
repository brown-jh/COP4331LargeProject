import React from 'react';

import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import SearchPage from './pages/SearchPage';
import HomePage from './pages/HomePage';
import MakeEventPage from './pages/MakeEventPage';
import EventPage from './pages/EventPage';
import GroupPage from './pages/GroupPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import FinishPasswordPage from './pages/FinishPasswordPage';
import FinishRegisterPage from './pages/FinishRegisterPage';
import MakeGroupPage from './pages/MakeGroupPage';
import HostedEventsPage from './pages/HostedEventsPage';
import JoinedEventsPage from './pages/JoinedEventsPage';
import AdminnedGroupsPage from './pages/AdminnedGroupsPage';
import JoinedGroupsPage from './pages/JoinedGroupsPage';
import EditGroupPage from './pages/EditGroupPage';

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
        <Route path="/events/:eventId">          
          <EventPage />        
        </Route>
        <Route path="/groups/:groupId" exact>          
          <GroupPage />        
        </Route>
        <Route path="/editgroup/:groupId" exact>          
          <EditGroupPage />        
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
        <Route path="/hostedevents" exact>          
          <HostedEventsPage />        
        </Route>
        <Route path="/joinedevents" exact>          
          <JoinedEventsPage />        
        </Route>
        <Route path="/adminnedgroups" exact>          
          <AdminnedGroupsPage />        
        </Route>
        <Route path="/joinedgroups" exact>          
          <JoinedGroupsPage />        
        </Route>
        <Redirect to="/" />      
      </Switch>      
    </Router>  
  );
}

export default App;
