import React, { useState, useEffect } from 'react';

function EventDisplay(props)
{
    var userId = "Hannah Wrigley";

    const[eventTitle, setEventTitle] = useState('');
    const[eventDesc, setEventDesc] = useState('');
    const[eventHost, setEventHost] = useState('');
    const[attendeeList, setAttendeeList] = useState('');
    const[eventGroup, setEventGroup] = useState('');
    const[eventTime, setEventTime] = useState('');
    const[eventLocation, setEventLocation] = useState('');

    useEffect(() => {
        //TODO: Here, we would normally pull the event ID from the URL, get the event via API, 
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

        setEventTitle(thisEvent.name + "\nEvent ID: " + props.eventId); //To test the parameter pass-in.
        setEventDesc(thisEvent.description);
        setEventHost(thisEvent.host);
        setAttendeeList(thisEvent.attendees.map((eventMember) => <div><p>{eventMember}</p></div>));
        setEventGroup(thisEvent.group);
        setEventTime(thisEvent.time);
        setEventLocation(thisEvent.place);
    }, []);

    return(
        <div id="mainDiv" style={{width: "80%", paddingTop: "7%"}}>
            <img src="https://i.ticketweb.com/i/00/09/57/08/29_Original.jpg?v=6" class="imgeventpage"/>

            <span class="inner-title"></span>
            <p style={{fontSize: "50px", marginTop: "0px", marginLeft: "15px", marginRight: "15px"}}>{eventTitle}</p>
            <p>Hosted by: {eventHost}</p>

            {/* Display the edit button to hosts and the attending checkbox to other users.*/}
            {
               eventHost == userId ?
                <button type="button" style={{width: "40%"}} class="buttons" onClick={() => alert("Redirect to edit page")}>Edit/Cancel Event</button>
                :
                <button type="button" style={{width: "40%"}} class="buttons" onClick={() => alert("Redirect to edit page")}>Join Event</button>
            }
            
        
            <span class="inner-title"></span><br />
            <span class="inner-title it_orange">Event Information</span><br />
            <div style={{width:"40%", marginLeft:"5%", marginRight: "4%", float:"left"}}>
                <p>{eventDesc}</p>
            </div>

            <div style={{width:"40%", marginLeft:"5%", marginRight: "4%", float:"left"}}>
                <p>{eventGroup}</p>
                <p>{eventTime}</p>
                <p>{eventLocation}</p>
            </div>
            <span class="inner-title it_orange"></span>

            <div>
            <span class="inner-title it_yellow">Event Attendees</span>
                {attendeeList}
            <span class="inner-title it_yellow"></span>
            
            </div>

        </div>
        
    )
}

export default EventDisplay;