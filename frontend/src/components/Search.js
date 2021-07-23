import React, { useState } from 'react';

import EventBox from '../components/EventBox';
import GroupBox from '../components/GroupBox';


const searchingType = {
    GROUPS : "groups",
    EVENTS : "events"
}

var searchType;

const Search = () =>{  
    
    var bp = require('../components/Path.js');

    var storage = require('../tokenStorage.js');
    const jwt = require("jsonwebtoken");

    var searchParams;
    const [searchResults, setSearchResults] = useState('');

    var _ud = localStorage.getItem('user_data');    
    var ud = JSON.parse(_ud);    
    var userId = ud.id;  
    
    const setTypeEvent = async event =>
    {
        searchType = searchingType.EVENTS;
        searchEventsAndGroups();
    }

    const setTypeGroup = async event =>
    {
        searchType = searchingType.GROUPS;
        searchEventsAndGroups();
    }

    const searchEventsAndGroups = async event =>
    {
        
        switch (searchType)
        {
            case searchingType.EVENTS:
                var tok = storage.retrieveToken();       
                var obj = {userId:userId,search:searchParams.value,jwtToken:tok};       
                var js = JSON.stringify(obj);    
                try        
                {            
                    const response = await fetch(bp.buildPath('api/searchevents'),            
                        {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
                    var txt = await response.text();   
                    // alert("Events are: " + txt);      
                    var res = JSON.parse(txt);            
                    if( res.error.length > 0 )            
                    {                
                        setSearchResults( "API Error:" + res.error );     
                        return;
                    }            
                    else            
                    {            

                        // For each event, make an EventBox with its data.
                        setSearchResults(res.results.map((eventData) => (
                            <EventBox 
                                imageURL={eventData.ImageURL}
                                title={eventData.EventName}
                                group={eventData.EventDescription}
                                // Ensures dates are in: Month Day, Year Time format
                                time={new Date(eventData.EventTime).toLocaleString('en-us', {year: 'numeric', month: 'long', day: '2-digit'}).
                                replace(/(\d+)\/(\d+)\/(\d+)/, '$1-$2-$3') + " " + new Date(eventData.EventTime).toLocaleTimeString()}
                                place={eventData.EventLocation}/>)));
                        
                        var retTok = res.jwtToken;
                        storage.storeToken( retTok );
                        return;
                    }        
                }        
                catch(e)        
                {            
                    setSearchResults(e.toString());  
                    return;      
                }

            case searchingType.GROUPS:
                var dummyAdminGroups=[
                    {
                        title: "NerdKnighteria of UCF",
                        desc: "This is a club for board and video gamers at UCF.",
                    },
                    {
                        title: "Dark Side Comics Game Night",
                        desc: "We meet at Dark Side Comics on Sundays to play board games.",
                    },
                    {
                        title: "YMCA Swimming Club",
                        desc: "We're here to dive in and have fun!",
                    },
                    {
                        title: "Game Jammers",
                        desc: "Interested in game dev or game jams? Try here!",
                    }
                ]
                setSearchResults(dummyAdminGroups.map((groupData) => (
                    <GroupBox title={groupData.title}
                        desc={groupData.desc}/>)));
                        return;
            default:
                return;
        }
        
    }

    return(     
        <div id="mainDiv" style={{width: "80%"}}>
            <span class="inner-title">Search Events and Groups</span><br />
            <input type="text" onChange={searchEventsAndGroups} ref={(c) => searchParams = c} /><br / >
            <button style={{width: "25%", marginLeft:"12%", marginRight:"12%"}} type="button" 
                class="buttons buttons btn-search" onClick={setTypeEvent}>View Only Events</button>
            <button style={{width: "25%", marginLeft:"12%", marginRight:"12%"}} type="button" 
                class="buttons btn-search" onClick={setTypeGroup}>View Only Groups</button><br />
            
            <div class = "flex-container">
                {searchResults}
            </div>
            
        </div>
    );
};

export default Search;