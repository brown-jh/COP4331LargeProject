import React, {useEffect, useState } from 'react';

import EventBox from '../components/EventBox';

function HostedEvents()
{

    var bp = require('../components/Path.js');

    var storage = require('../tokenStorage.js');
    const jwt = require("jsonwebtoken");

    var _ud = localStorage.getItem('user_data');    
    var ud = JSON.parse(_ud);    
    var userId = ud.id;

    const [hostedEvents, setHostedEvents] = useState('');

    useEffect(() => {
        
        var tok = storage.retrieveToken();
        var obj = {search:userId,jwtToken:tok};
        var js = JSON.stringify(obj);

        async function fetchData(){
            try
            {
                const response = await fetch(bp.buildPath('api/searchgroupadmins'),
                    {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

                var txt = await response.text();
                var res = JSON.parse(txt);

  
                setHostedEvents(res.results.map((eventData) => (
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
            catch(e)
            {
                
                return;
            }
        };

        fetchData();

        
    });

    return (
        <div id="mainDiv" style={{width: "80%"}}>
             <span class="inner-title">Your Hosted Events</span><br />
             <button style={{width: "25%", marginLeft:"12%", marginRight:"12%"}} type="button" 
                class="buttons buttons btn-search" onClick={() => window.location.href="/joinedevents"}>Joined Events</button>
            <button style={{width: "25%", marginLeft:"12%", marginRight:"12%"}} type="button" 
                class="buttons btn-search"onClick={() => window.location.href="/newevent"}>Create Event</button><br />
            <div class = "flex-container">
                {hostedEvents}
            </div>
        </div>
    )
}

export default HostedEvents;