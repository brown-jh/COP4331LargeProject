import React from 'react';

const SearchPage = () =>
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
            <div style={{width: "40%", margin:"5%", float: "left", backgroundColor: "#FFFF80"}}>
                <p style={{textAlign:"center"}} onClick={ToSearchEvents}>Search Events</p>
            </div>
            <div style={{width: "40%", margin:"5%", float: "left", backgroundColor: "#FFFF80"}}>
                <p style={{textAlign:"center"}} onClick={ToSearchGroups}>Search Groups</p>
            </div>

            <h3 style={{textAlign:"center"}}>Manage</h3>
            <div style={{width: "40%", margin:"5%", float: "left", backgroundColor: "#FFFF80"}}>
                <p style={{textAlign:"center"}} onClick={ToManageEvents}>Manage My Events</p>
            </div>
            <div style={{width: "40%", margin:"5%", float: "left", backgroundColor: "#FFFF80"}}>
                <p style={{textAlign:"center"}} onClick={ToManageGroups}>Manage My Groups</p>
            </div>

            <br/>
            <button type="button" class="buttons" onClick={LogOut}>Log Out</button>
        </div>
        

    );
}