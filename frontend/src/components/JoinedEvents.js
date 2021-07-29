import React, {useEffect, useState } from 'react';

import EventBox from '../components/EventBox';

function JoinedEvents()
{

    var bp = require('../components/Path.js');

    var storage = require('../tokenStorage.js');
    const jwt = require("jsonwebtoken");

    var _ud = localStorage.getItem('user_data');    
    var ud = JSON.parse(_ud);    
    var userId = ud.id;

    const [joinedEvents, setJoinedEvents] = useState('');

    useEffect(() => {

        var tok = storage.retrieveToken();
        var obj = {search:userId,jwtToken:tok};
        var js = JSON.stringify(obj);

        async function fetchData(){
            try
            {
                const response = await fetch(bp.buildPath('api/searcheventsubbed'),
                    {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

                var txt = await response.text();
                var res = JSON.parse(txt);

  
                setJoinedEvents(res.results.map((eventData) => (
                    <EventBox 
                        imageURL={eventData.ImageURL}
                        eventId={eventData._id}
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
            catch(e)
            {
                
                return;
            }
        };

        fetchData();
        
       
    },[]);

    return (
        <div id="mainDiv" style={{width: "80%"}}>
             <span class="inner-title">Your Joined Events</span><br />
              <button type="button" 
                class="buttons buttons btn-search" onClick={() => window.location.href="/hostedevents"}>Hosted Events</button>
            <div class = "flex-container">
                {joinedEvents}
            </div>
        </div>
    )
}

export default JoinedEvents;