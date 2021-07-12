import React from 'react';

import FrontButton from '../components/FrontButton';

const Home = () =>
{
    // var _ud = localStorage.getItem('user_data');    
    // var ud = JSON.parse(_ud);    
    // var userId = ud.id;    
    // var firstName = ud.firstName;    
    // var lastName = ud.lastName; 

    const LogOut = async event =>     
    {    
        event.preventDefault();    
        alert("Log out");
    }

    const ToSearchPage = async event =>     
    {    
        event.preventDefault();    
        window.location.href="/search";
    }

    const ToManageEvents = async event =>     
    {    
        event.preventDefault();    
        alert("Go to event manage page");
    }

    const ToManageGroups = async event =>     
    {    
        event.preventDefault();    
        alert("Go to group manage page");
    }

    return(
        
        <div id="mainDiv" style={{width: "70%"}}>
            
            
            <span class="inner-title">Hello Josh Sipe! What would you like to do?</span><br />
            {/* <span class="inner-title">Hello {firstName} {lastName}! What would you like to do?</span><br /> */}
            
            <span class="inner-title it_orange">Search</span><br />
            <FrontButton txt="Search Events and Groups" clickAct={ToSearchPage}/>
            <span class="inner-title it_orange"></span><br />


            <span class="inner-title it_yellow">Manage</span><br />
            <FrontButton txt="Manage My Events" clickAct={ToManageEvents}/>
            <FrontButton txt="Manage My Groups" clickAct={ToManageGroups}/>
            <span class="inner-title it_yellow"></span><br />

            <br/>
            <button type="button" style={{width: "25%"}} class="buttons" onClick={LogOut}>Log Out</button>
        </div>
    );
}

export default Home;



