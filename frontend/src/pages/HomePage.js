import React from 'react';

import FrontButton from '../components/FrontButton';

const HomePage = () =>
{
    var _ud = localStorage.getItem('user_data');    
    var ud = JSON.parse(_ud);    
    var userId = ud.id;    
    var firstName = ud.firstName;    
    var lastName = ud.lastName; 

    const LogOut = async event =>     
    {    
        event.preventDefault();    
        alert("Log out");
    }

    const ToSearchEvents = async event =>     
    {    
        event.preventDefault();    
        window.location.href="/search";
    }

    const ToSearchGroups = async event =>     
    {    
        event.preventDefault();    
        alert("Go to group search page");
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
        <div>
            <h2>Hello {firstName} {lastName}! What would you like to do?</h2><br/>
            <h3 style={{textAlign:"center"}}>Search</h3>
            <FrontButton txt="Search Events" clickAct={toSearchEvents}/>
            <FrontButton txt="Search Groups" clickAct={toSearchGroups}/>

            <h3 style={{textAlign:"center"}}>Manage</h3>

            <FrontButton txt="Manage My Events" clickAct={toManageEvents}/>
            <FrontButton txt="Manage My Groups" clickAct={toManageGroups}/>

            <br/>
            <button type="button" style={{width: "25%"}} class="buttons" onClick={LogOut}>Log Out</button>
        </div>
    );
}

export default HomePage;