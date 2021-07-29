import React from 'react';

import FrontButton from '../components/FrontButton';

const Home = () =>
{
    var _ud = localStorage.getItem('user_data');    
    var ud = JSON.parse(_ud);    
    var userId = ud.id;    
    var firstName = ud.firstName;    
    var lastName = ud.lastName; 

    const LogOut = async event =>     
    {    
        event.preventDefault();    
        window.location.href="/";
    }

    const ToSearchPage = async event =>     
    {    
        event.preventDefault();    
        window.location.href="/search";
    }

    const ToManageEvents = async event =>     
    {    
        event.preventDefault();    
        window.location.href = "/hostedevents";
    }

    const ToManageGroups = async event =>     
    {    
        event.preventDefault();    
        window.location.href = "/adminnedgroups";
    }

    return(
        
        <div id="mainDiv" style={{width: "70%"}}>
            
            
            <span class="inner-title">Hello {firstName} {lastName}! What would you like to do?</span><br />
        
            <span class="inner-title it_orange">Features</span>
            <button style={{width: "28%", marginRight:"2%"}} onClick={ToSearchPage} type="button" 
                class="buttons btn-search">Search Events & Groups</button>
            <button style={{width: "28%", marginRight:"2%"}} onClick={ToManageEvents} type="button" 
                class="buttons btn-search">Manage My Events</button>
            <button style={{width: "28%"}} onClick={ToManageGroups} type="button" 
                class="buttons btn-search">Manage My Groups</button>
                <br /><br />
            <img src="/images/download.png" class="imgresponsive"/>
            {/* <FrontButton txt="Search Events and Groups" clickAct={ToSearchPage}/> */}
            <span class="inner-title it_orange"></span><br />
            <button type="button" style={{width: "25%"}} class="buttons" onClick={LogOut}>Log Out</button>
        </div>
    );
}

export default Home;



