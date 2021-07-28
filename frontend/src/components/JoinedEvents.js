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
                //alert(txt)
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
        
        var dummyJoinedEvents=[
            {
                id: "123",
                title: "Sunday Practice for Orlando Tennis Club",
                group: "Women's Tennis Club of Orlando",
                time: "April 23rd, 2021 2:00 PM",
                place: "Big Win Gym, 4913 Greensteel Drive, Orlando, FL, 32828"
            },
            {
                id: "34567",
                title: "Weekly D&D Night, Newcomers Welcome",
                group: "",
                time: "April 21st, 2021 8:00 PM",
                place: "2123 Rose Lane, Orlando, FL, 32819"
            },
            {
                id: "0",
                title: "JavaScript Workshop",
                group: "Programming Club of UCF",
                time: "April 26th, 2021 3:00 PM",
                place: "Online"
            },
            {
                id: "666666",
                title: "Super Smash Bros Tournament - Cash Prizes",
                group: "NerdKnighteria of UCF",
                time: "May 12th, 2021 5:00 PM",
                place: "Online"
            },
            {
                id: "1111",
                title: "April Meeting of Jacaranda Book Club",
                group: "Jacaranda Book Club",
                time: "April 6th, 2021 1:00PM",
                place: "4143 Woodmere Park Blvd, Venice, FL 34293"
            }
        ]
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