import React, { useState } from 'react';

import EventBox from '../components/EventBox';

const SearchPage = () =>{  
    
    var bp = require('./Path.js');

    var storage = require('../tokenStorage.js');
    const jwt = require("jsonwebtoken");

    var searchParams;
    const [searchResults, setSearchResults] = useState('');

    var _ud = localStorage.getItem('user_data');    
    var ud = JSON.parse(_ud);    
    var userId = ud.id;    

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
                var retTok = res.jwtToken;
                storage.storeToken( retTok );
            }        
        }        
        catch(e)        
        {            
            setSearchResults(e.toString());        
        }

        // Here, we would take searchParams and run a search based on it, but I'll make do with
        // some dummy results.

        const dummyEventList = [
            {
                title: "Sunday Practice for Orlando Tennis Club",
                group: "Women's Tennis Club of Orlando",
                time: "Sunday, April 23rd, 2:00 PM",
                place: "Big Win Gym, 4913 Greensteel Drive, Orlando, FL, 32828"
            },
            {
                title: "Weekly D&D Night, Newcomers Welcome",
                group: "",
                time: "Friday, April 21st, 8:00 PM",
                place: "2123 Rose Lane, Orlando, FL, 32819"
            },
            {
                title: "JavaScript Workshop",
                group: "Programming Club of UCF",
                time: "Wednesdy, April 26th, 3:00 PM",
                place: "Online"
            },
            {
                title: "Super Smash Bros Tournament - Cash Prizes",
                group: "NerdKnighteria of UCF",
                time: "Thursday, May 12th, 5:00 PM",
                place: "Online"
            },
            {
                title: "April Meeting of Jacaranda Book Club",
                group: "Jacaranda Book Club",
                time: "Saturday, April 6th, 1:00 PM",
                place: "4143 Woodmere Park Blvd, Venice, FL 34293"
            }
        ];

        //For each event in the results, make an EventBox for it, and put it all in searchResults.
        setSearchResults(dummyEventList.map((eventData) => (
            <EventBox title={eventData.title}
                group={eventData.group}
                time={eventData.time}
                place={eventData.place}/>)));
    }

    return(     
        <div>
            <h1 style={{textAlign:"center"}}>Search Events</h1>
            <input style={{width: "25%", marginLeft:"12%", marginRight:"12%"}} type="text" 
                ref={(c) => searchParams = c} />
            <button style={{width: "25%", marginLeft:"12%", marginRight:"12%"}} type="button" 
                class="buttons" onClick={searchEvents}>Search</button><br />
            <div id="searchResultDiv">{searchResults}</div>
        </div>
    );
};

export default SearchPage;