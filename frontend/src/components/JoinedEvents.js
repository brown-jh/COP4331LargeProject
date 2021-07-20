import React, {useEffect, useState } from 'react';

import EventBox from '../components/EventBox';

function JoinedEvents()
{

    const [joinedEvents, setJoinedEvents] = useState('');

    useEffect(() => {
        // TODO: Here we would find the user's joined events via API and put them in here.
        var dummyJoinedEvents=[
            {
                title: "Sunday Practice for Orlando Tennis Club",
                group: "Women's Tennis Club of Orlando",
                time: "April 23rd, 2021 2:00 PM",
                place: "Big Win Gym, 4913 Greensteel Drive, Orlando, FL, 32828"
            },
            {
                title: "Weekly D&D Night, Newcomers Welcome",
                group: "",
                time: "April 21st, 2021 8:00 PM",
                place: "2123 Rose Lane, Orlando, FL, 32819"
            },
            {
                title: "JavaScript Workshop",
                group: "Programming Club of UCF",
                time: "April 26th, 2021 3:00 PM",
                place: "Online"
            },
            {
                title: "Super Smash Bros Tournament - Cash Prizes",
                group: "NerdKnighteria of UCF",
                time: "May 12th, 2021 5:00 PM",
                place: "Online"
            },
            {
                title: "April Meeting of Jacaranda Book Club",
                group: "Jacaranda Book Club",
                time: "April 6th, 2021 1:00PM",
                place: "4143 Woodmere Park Blvd, Venice, FL 34293"
            }
        ]
        setJoinedEvents(dummyJoinedEvents.map((eventData) => (
            <EventBox title={eventData.title}
                group={eventData.group}
                // Ensures dates are in: Month Day, Year Time format
                time={new Date(eventData.time).toLocaleString('en-us', {year: 'numeric', month: 'long', day: '2-digit'}).
                replace(/(\d+)\/(\d+)\/(\d+)/, '$1-$2-$3') + " " + new Date(eventData.time).toLocaleTimeString()}
                place={eventData.place}/>)));
    });

    return (
        <div>
            <button type="button" onClick={() => window.location.href="/hostedevents"}>Hosted Events</button>
            <div>
                <h1>Your Joined Events</h1>
                {joinedEvents}
            </div>
        </div>
    )
}

export default JoinedEvents;