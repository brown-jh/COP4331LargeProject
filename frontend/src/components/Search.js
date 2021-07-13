import React, { useState } from 'react';

import EventBox from '../components/EventBox';

const Search = () =>{  
    
    var bp = require('../components/Path.js');

    var storage = require('../tokenStorage.js');
    const jwt = require("jsonwebtoken");

    var searchParams;
    const [searchResults, setSearchResults] = useState('');

    var _ud = localStorage.getItem('user_data');    
    var ud = JSON.parse(_ud);    
    var userId = ud.id;   

    const searchGroups = async event =>
    {
        event.preventDefault();
        alert("Allan please add function");
    }

    const searchEvents = async event =>
    {
        event.preventDefault();

        var tok = storage.retrieveToken();       
        var obj = {userId:userId,search:searchParams.value,jwtToken:tok};       
        var js = JSON.stringify(obj);    
        try        
        {            
            const response = await fetch(bp.buildPath('api/searchevents'),            
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
            var txt = await response.text();   
            alert("Events are: " + txt);      
            var res = JSON.parse(txt);            
            if( res.error.length > 0 )            
            {                
                setSearchResults( "API Error:" + res.error );     
                       
            }            
            else            
            {            

                // For each event, make an EventBox with its data.
                setSearchResults(res.results.map((eventData) => (
                    <EventBox title={eventData.EventName}
                        group={"Allan please add group"}
                        time={eventData.EventTime}
                        place={eventData.EventLocation}/>)));
                
                var retTok = res.jwtToken;
                storage.storeToken( retTok );
            }        
        }        
        catch(e)        
        {            
            setSearchResults(e.toString());        
        }
    }

    return(     
        <div id="mainDiv" style={{width: "80%"}}>
            <span class="inner-title">Search Events and Groups</span><br />
            <input type="text" ref={(c) => searchParams = c} /><br / >
            <button style={{width: "25%", marginLeft:"12%", marginRight:"12%"}} type="button" 
                class="buttons" onClick={searchEvents}>Search Events</button>
            <button style={{width: "25%", marginLeft:"12%", marginRight:"12%"}} type="button" 
                class="buttons" onClick={searchGroups}>Search Groups</button><br />
            
            <div class = "flex-container">
                <div class="searchResultDiv">{searchResults}</div>       
            </div>
            
        </div>
    );
};

export default Search;