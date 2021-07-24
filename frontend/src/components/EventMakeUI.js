import React, { useState, useEffect } from 'react';
import GoogleAutocomplete from '../components/GoogleAutocomplete';
import EventBoxPreview from './EventBoxPreview';

// Global variables, these we're getting reset for some reason.
var eventPlace = '';
var eventGroup = '';

var _ud = localStorage.getItem('user_data');    
    var ud = JSON.parse(_ud);    
    var userId = ud.id.toString();
    var firstName = ud.firstName;    
    var lastName = ud.lastName;

function EventMakeUI()
{

    var bp = require('./Path.js');
    var storage = require('../tokenStorage.js');
    const jwt = require("jsonwebtoken");

    var userGroups = [];
    var eventName = '';
    var eventDesc = '';
    var eventTime = '';
    var eventPictureURL = '';
    
    const [nameError, setNameError] = useState('');
    const [descError, setDescError] = useState('');
    const [timeError, setTimeError] = useState('');
    const [locationError, setLocationError] = useState('');
    const [pictureError, setPictureError] = useState('');
    const [eventMakeResult, setEventMakeResult] = useState('');
    const [groupSelector, setGroupSelector] = useState('');
    const [isOnline, setIsOnline] = useState(false);

    const [cardResults, setCardResults] = useState('');


    const flipOnlineCheck = async event =>
    {
        setIsOnline(!isOnline);
        alert("Flipped online value");
    }

    function changeGroup(event)
    {
        eventGroup = event.target.value;
        // alert("Updated group to event: " + event + "\nTarget: " + event.target + 
        // "\nValue: " + event.target.value);
        // alert("Result is " + eventGroup + "\nValue: " + eventGroup.value);
    }

    // Updates eventPlace variable when user selects a location from Google API.
    const getGoogleData = (e) =>
    {
        eventPlace = e;
    }

    const refreshCard = async event =>
    {
        setCardResults(
            <div>{ 
                <EventBoxPreview 
                        imageURL={eventPictureURL.value}
                        title={eventName.value}
                        group={eventDesc.value}
                        time={new Date(eventTime.value).toLocaleString('en-us', {year: 'numeric', month: 'long', day: '2-digit'}).
                        replace(/(\d+)\/(\d+)\/(\d+)/, '$1-$2-$3') + " " + new Date(eventTime.value).toLocaleTimeString()}
                        place={eventPlace.toString()}/>}
            </div>  

        )
    }

    const addNewEvent = async event =>
    {
        var isError = false;
        setNameError(""); //Clear any errors from the last submit.
        setDescError("");
        setTimeError("");
        setLocationError("");
        setPictureError("");
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
        if (eventPlace == "" && !isOnline)
        {
            setLocationError("Please give a location or check \"Online\".");
            setEventMakeResult("Information missing; check above.");
            isError = true;
        }
        if (eventPictureURL.value == "")
        {
            setPictureError("Please enter a URL that contains desired image.");
            setEventMakeResult("Information missing; check above.");
            isError = true;
        }

        if (isError) //Notify the user if any info is missing, otherwise submit.
        {
            setEventMakeResult("Information missing or invalid; check above.");
        }
        else
        {
            if (isOnline)
            {
                eventPlace = "Online"; // No place if online.
            }

            // editing to send
            var _eventPlace = eventPlace.toString()
            var _eventTime = eventTime.value + ":00.000Z"

            alert("Name: " + eventName.value + "\nDescription: " + eventDesc.value + "\nGroup: " + 
            eventGroup + "\nTime: " + _eventTime + "\nPlace: " + _eventPlace + 
            "\nURL: " + eventPictureURL.value + "\nUser: " + userId);

            var tok = storage.retrieveToken();
            var obj = {eventname:eventName.value, eventDescription:eventDesc.value, groupID:eventGroup, eventtime:_eventTime, eventLocation:_eventPlace, imageURL:eventPictureURL.value, eventhost:userId,jwtToken:tok};
            var js = JSON.stringify(obj);

            try
            {
                const response = await fetch(bp.buildPath('api/addevent'),
                    {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

                var txt = await response.text();
                var res = JSON.parse(txt);
                var retTok = res.jwtTocken;

                if( res.error.length > 0 )
                {
                    alert( "API Error:" + res.error );
                }
                else
                {
                    setEventMakeResult("Successfully created event! Redirecting back to search.");
                    storage.storeToken( retTok );
                    window.location.href = "/search";
                }
            }
            catch(e)
            {
                alert(e.toString());
            }

            
            alert("Name: " + eventName.value + "\nDescription: " + eventDesc.value + "\nGroup: " + 
            eventGroup + "\nTime: " + eventTime.value + "\nPlace: " + eventPlace.toString() + 
            "\nURL: " + eventPictureURL.value);

        }
    }

    useEffect(() => {
        // TODO: Here we would find the user's groups and put them in here.
        userGroups = ["NerdKnighteria of UCF", "Orlando Fencing Club", "Mu Alpha Theta"];
        setGroupSelector(
            <select class="meeting-time" onChange={changeGroup}>
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
            <textarea rows="7" cols= "40" maxLength= "210" ref={(c) => eventDesc = c} />
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
            <GoogleAutocomplete onPlaceLoaded={getGoogleData}/>
            
            <span id="error-text">{locationError}</span> <br /> 
            <span class="inner-title it_blue"></span><br />

            <br/>
            <span class="inner-title it_purple">Event Image</span><br />
            <p><i>Give a image to represent your event; this must be uploaded as a url.</i></p>
            <input type="text" id="location" ref={(c) => eventPictureURL = c} />
            <span id="error-text">{pictureError}</span> <br /> 
            <span class="inner-title it_purple"></span><br />
         
            <br/>
            <span class="inner-title it_pink">Group</span><br />
            <p><i>If this is for a group, select it from the dropdown; otherwise pick "None".</i></p>
            {groupSelector}
            <span class="inner-title it_pink"><b></b></span><br />

            <br/>
            <span class="inner-title it_lightred">Review</span><br />
            <p><i>Please review your event, as this is what users will view on the Search page.</i></p>
            
            <button type="button" style={{width: "30%"}} 
            class="buttons" onClick={refreshCard}>Refresh</button>
            <div class = "flex-container">
            <div>{cardResults}</div>
            </div>
            <span class="inner-title it_lightred"><b></b></span><br />

            <button type="button" style={{width: "50%"}} 
            class="buttons" onClick={addNewEvent}>Submit</button>
            <span class="smaller-inner-title">Please make sure to review your event before you submit!</span><br />
            <div><span id="error-text">{eventMakeResult}</span> <br /> </div>
        </div>
    );
}

export default EventMakeUI;