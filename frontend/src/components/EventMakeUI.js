import React, { useState } from 'react';

function EventMakeUI()
{
    var bp = require('./Path.js');

    var storage = require('../tokenStorage.js');
    const jwt = require("jsonwebtoken");

    var eventName = '';
    var eventDesc = '';
    var eventGroup = '';
    var eventTime = '';
    var eventPlace = '';
    
    const [nameError, setNameError] = useState('');
    const [descError, setDescError] = useState('');
    const [timeError, setTimeError] = useState('');
    const [locationError, setLocationError] = useState('');
    const [eventMakeResult, setEventMakeResult] = useState('');
    const [isOnline, setIsOnline] = useState(false);

    const flipOnlineCheck = async event =>
    {
        setIsOnline(!isOnline);
    }

    const addNewEvent = async event =>
    {
        setNameError(""); //Clear any errors from the last submit.
        setDescError("");
        setTimeError("");
        setLocationError("");
        setEventMakeResult("");

        if (eventName.value == "") //Check for any missing information.
        {
            setNameError("Please give a name.");
            setEventMakeResult("Information missing; check above.");
        }
        if (eventDesc.value == "")
        {
            setDescError("Please give a description.");
            setEventMakeResult("Information missing; check above.");
        }
        if (eventTime.value == "")
        {
            setTimeError("Please give a time.");
            setEventMakeResult("Information missing; check above.");
        }
        if (eventPlace.value == "" && !isOnline.value)
        {
            setLocationError("Please give a location or check \"Online\".");
            setEventMakeResult("Information missing; check above.");
        }

        if (eventMakeResult.value == "") //If no errors, submit.
        {
            if (isOnline.value)
            {
                eventPlace.value = ""; // No place if online.
            }

            alert("Name: " + eventName.value + "\nDescription: " + eventDesc.value + "\nTime: " + 
            eventTime.value + "\nPlace: " + eventPlace.value + 
            "\nTODO: Add group dropdown, checks for time/place.");
        }
    }

    return(
        <div>
            <h2>Create Event</h2>

            <br/>
            <h3>Name</h3>
            <p>Give the event a short, descriptive name.</p>
            <input type="text" ref={(c) => eventName = c} />
            <p style={{color: "red"}}>{nameError}</p>
            
            <br/>
            <h3>Description</h3>
            <p>Tell your attendees about the event; what it involves, what they should bring, etc.</p>
            <input type="textarea" ref={(c) => eventDesc = c} />
            <p style={{color: "red"}}>{descError}</p>
            
            <br/>
            <h3>Date/Time</h3>
            <p>When is the event going to happen?</p>
            <input type="text" ref={(c) => eventTime = c} />
            <p style={{color: "red"}}>{timeError}</p>
                        
            <br/>
            <h3>Location</h3>
            <p>Where is the event going to happen? If online, instead check the box.</p>
            <input type="checkbox" clicked={isOnline} onChange={flipOnlineCheck}/>
            <p>"  Online"</p><br/>
            <input type="text" ref={(c) => eventPlace = c} />
            <p style={{color: "red"}}>{locationError}</p>

                        
            <br/>
            <h3>Group</h3>
            <p>If this is for a group, select it from the dropdown; otherwise pick "None".</p>
            <p>TODO: How do we do a dropdown in React?</p>

            <button type="button" style={{width: "50%", marginLeft: "25%"}} 
            class="buttons" onClick={addNewEvent}>Submit</button>

            <div>{eventMakeResult}</div>
        </div>
    );
}

export default EventMakeUI;