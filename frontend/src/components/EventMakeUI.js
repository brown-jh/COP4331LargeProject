import React, { useState, useEffect } from 'react';

function EventMakeUI()
{
    var bp = require('./Path.js');



    var storage = require('../tokenStorage.js');
    const jwt = require("jsonwebtoken");

    var userGroups = [];
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
    const [groupSelector, setGroupSelector] = useState('');
    const [isOnline, setIsOnline] = useState(false);

    const flipOnlineCheck = async event =>
    {
        setIsOnline(!isOnline.value);
        alert("Flipped online value");
    }

    function changeGroup(event)
    {
        eventGroup = event.target.value;
        alert("Updated group");
    }

    const addNewEvent = async event =>
    {
        var isError = false;
        setNameError(""); //Clear any errors from the last submit.
        setDescError("");
        setTimeError("");
        setLocationError("");
        setEventMakeResult("");

        if (eventName.value == "") //Check for any missing information.
        {
            setNameError("Please give a name.");
            setEventMakeResult("Information missing; check above.");
            isError = true;
        }
        if (eventDesc.value == "")
        {
            setDescError("Please give a description.");
            setEventMakeResult("Information missing; check above.");
            isError = true;
        }
        if (eventTime.value == "")
        {
            setTimeError("Please give a time.");
            setEventMakeResult("Information missing; check above.");
            isError = true;
        }
        if (eventPlace.value == "" && !isOnline.value)
        {
            setLocationError("Please give a location or check \"Online\".");
            setEventMakeResult("Information missing; check above.");
            isError = true;
        }

        if (isError) //Notify the user if any info is missing, otherwise submit.
        {
            setEventMakeResult("Information missing or invalid; check above.");
        }
        else
        {
            if (isOnline.value)
            {
                eventPlace.value = ""; // No place if online.
            }

            alert("Name: " + eventName.value + "\nDescription: " + eventDesc.value + "\nGroup: " + 
            eventGroup.value + "\nTime: " + eventTime.value + "\nPlace: " + eventPlace.value + 
            "\nTODO: Add group dropdown, checks for time/place.");
        }
    }

    useEffect(() => {
        // Here we would find the user's groups and put them in here.
        userGroups = ["NerdKnighteria of UCF", "Orlando Fencing Club", "Mu Alpha Theta"];
        setGroupSelector(
            <select onChange={changeGroup}>
                <option value="">None</option>
                {userGroups.map((groupName) => (<option value={groupName}>{groupName}</option>))}
            </select>
        );
    });

    return(
        <div id="mainDiv" style={{width: "60%"}}>
            <span class="inner-title">Create Event</span><br /><br />


            <span class="inner-title it_orange">Name</span><br />
            <p><i>Give the event a short, descriptive name.</i></p>
            <input type="text" ref={(c) => eventName = c} />
            <span id="error-text">{nameError}</span> <br /> 
            <span class="inner-title it_orange"></span><br />

            
            <br/>
            <span class="inner-title it_yellow">Description</span><br />
            <p><i>Tell your attendees about the event; what it involves, what they should bring, etc.</i></p>
            <textarea rows="8" cols= "40" ref={(c) => eventDesc = c} />
            <span id="error-text">{descError}</span> <br /> 
            <span class="inner-title it_yellow"></span><br />

            
            <br/>
            <span class="inner-title it_green">Date/Time</span><br />
            <p><i>When is the event going to happen?</i></p>
            <input type="datetime-local" class="meeting-time"
                name="meeting-time" ref={(c) => eventTime = c} />
            <span id="error-text">{timeError}</span> <br /> 
            <span class="inner-title it_green"></span><br />

                        
            <br/>
            <span class="inner-title it_blue">Location</span><br />
            <p><i>Where is the event going to happen? If online, instead check the box.</i></p>
            <input type="checkbox" class="onlineCheck" clicked={isOnline} onChange={flipOnlineCheck}/>
            <label for="onlineCheck"> Online</label>
            <br/>
            <input type="text" ref={(c) => eventPlace = c} />
            <span id="error-text">{locationError}</span> <br /> 
            <span class="inner-title it_blue"></span><br />


                        
            <br/>
            <span class="inner-title it_purple">Group</span><br />
            <p><i>If this is for a group, select it from the dropdown; otherwise pick "None".</i></p>
            {groupSelector}
            <span class="inner-title it_purple"><b></b></span><br />

            <button type="button" style={{width: "50%"}} 
            class="buttons" onClick={addNewEvent}>Submit</button>
            <span class="smaller-inner-title">Please make sure to review your event before you submit!</span><br />
            <div><span id="error-text">{eventMakeResult}</span> <br /> </div>
        </div>
    );
}

export default EventMakeUI;