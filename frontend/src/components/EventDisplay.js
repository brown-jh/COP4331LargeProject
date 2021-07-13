import React, { useState, useEffect } from 'react';

function EventDisplay()
{
    var userId = "Eddie Johnson";

    const[eventTitle, setEventTitle] = useState('');
    const[eventDesc, setEventDesc] = useState('');
    const[eventHost, setEventHost] = useState('');
    const[attendeeList, setAttendeeList] = useState('');
    const[eventGroup, setEventGroup] = useState('');
    const[eventTime, setEventTime] = useState('');
    const[eventLocation, setEventLocation] = useState('');

    useEffect(() => {
        //Here, we would normally pull the event ID from the URL, get the event via API, 
        // and use it to get the event's data, but we'll use dummy data for now.

        var thisEvent={
            name: "Smash Tournament for NerdKnighteria",
            host: "Hannah Wrigley",
            description: "NerdKnighteria is holding a Smash 4 tournament at the Student Union at 3 on Monday. Bring snacks and controllers, cash prizes to be awarded up to 50$.",
            attendees: ["John Smith", "Alyx Reckahn", "Hannah Wrigley"],
            group: "NerdKnighteria of UCF",
            time: "July 31 2021, 3:00 PM",
            place: "Student Union, University of Central Florida, Orlando"
        };

        setEventTitle(thisEvent.name);
        setEventDesc(thisEvent.description);
        setEventHost(thisEvent.host);
        setAttendeeList(thisEvent.attendees.map((eventMember) => <div><p>{eventMember}</p><br/></div>));
        setEventGroup(thisEvent.group);
        setEventTime(thisEvent.time);
        setEventLocation(thisEvent.place);
    });

    return(
        <div>
            <h1>{eventTitle}</h1>
            <p>Hosted by {eventHost}</p>

            {/* Display the edit button to hosts and the attending checkbox to other users.*/}
            {
                eventHost == userId.value ?
                <input type="button" onClick={alert("Redirect to edit page")}>Edit/Cancel Event</input>
                :
                <div>
                    <input type="checkbox" id="attendingCheck"/>
                    <label for="attendingCheck">Attending</label>
                </div>
            }

            <div style={{width:"40%", marginLeft:"5%", marginRight: "4%", float:"left"}}>
                <p>TODO: Add photo?</p>
                <h2>Description</h2>
                <p>{eventDesc}</p>

                <p>Attendees:</p>
                {attendeeList}

            </div>
            <div style={{width:"40%", marginLeft:"5%", marginRight: "4%", float:"left"}}>
                <p>{eventGroup}</p>
                <p>{eventTime}</p>
                <p>{eventLocation}</p>
            </div>

            <div style={{clear: "left"}}>
                <p>TODO: Add comments?</p>
            </div>

        </div>
        
    )
}

export default EventDisplay;