import React, { useState, useEffect } from 'react';
import GoogleAutocomplete from '../components/GoogleAutocomplete';
import EventBoxPreview from './EventBoxPreview';

// Global variables, these we're getting reset for some reason.
var eventPlace = '';
var eventGroup = '';

function EditEventUI(props)
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

    useEffect(() => {

        //TODO: get the event with this ID via API.
        //TODO : Also add groups.
        var thisEvent={
            name: "Firehawks",
            description: "This is a bird watching group with an unbefitting name. YEE.",
            time: "2021-08-08T00:00:00",
            location: "University of Central Florida",
            url: "https://wildlife.org/wp-content/uploads/2018/02/firehawks.png"
        };

        eventName.value = thisEvent.name + "\n" + props.eventId;
        eventDesc.value = thisEvent.description;
        eventTime.value = thisEvent.time;
        eventPlace = thisEvent.location;
        eventPictureURL.value = thisEvent.url;
        
        // This [], ensures useEffect only runs once.
    }, []);

    function updateName(event)
    {
        event.preventDefault();
        setNameError(event.target.value);
    }

    function updateDesc(event)
    {
        event.preventDefault();
        setDescError(event.target.value);
    }

    function updateTime(event)
    {
        event.preventDefault();
        var newTime = new Date(event.target.value).toLocaleString('en-us', {year: 'numeric', month: 'long', day: '2-digit'}).
        replace(/(\d+)\/(\d+)\/(\d+)/, '$1-$2-$3') + " " + new Date(event.target.value).toLocaleTimeString()
        setTimeError(newTime);
    }

    function updateURL(event)
    {
        event.preventDefault();
        setPictureError(event.target.value);
    }


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
        setLocationError(e);
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

    function confirmDelete(eventId)
    {
        if(window.confirm("Are you sure you want to disband this event?"))
        {
            alert("deleting id: " + eventId)
        }
        else
        {
            return;
        }
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
                eventPlace = ""; // No place if online.
            }

            // May need to append :00.000Z to eventTime.value to add to database
            alert("Name: " + eventName.value + "\nDescription: " + eventDesc.value + "\nGroup: " + 
            eventGroup + "\nTime: " + eventTime.value + "\nPlace: " + eventPlace.toString() + 
            "\nURL: " + eventPictureURL.value);

            setEventMakeResult("Successfully created event! Redirecting back to search.");
            window.location.href = "/search";
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
            <span class="inner-title">Create Event</span><br />
            <button type="button" style={{width: "30%"}} class="buttons" onClick={() => window.location.href="/joinedevents"}>Cancel</button><br/>
            <br/>
            <button type="button" style={{width: "30%"}} class="buttons"  onClick={() => confirmDelete(props.eventId)}>Disband Event</button><br/>
            <br/>


            <span class="inner-title it_orange">Name</span><br />
            <p><i>Give the event a short, descriptive name.</i></p>
            <input type="text" onChange={updateName} defaultValue={eventName} ref={(c) => eventName = c} />
            <span id="error-text">{nameError}</span> <br /> 
            <span class="inner-title it_orange"></span><br />

            
            <br/>
            <span class="inner-title it_yellow">Description</span><br />
            <p><i>Tell your attendees about the event; what it involves, what they should bring, etc.</i></p>
            <textarea rows="7" cols= "40" maxLength= "210" onChange={updateDesc} defaultValue={eventDesc} ref={(c) => eventDesc = c} />
            <span id="error-text">{descError}</span> <br /> 
            <span class="inner-title it_yellow"></span><br />

            
            <br/>
            <span class="inner-title it_green">Date/Time</span><br />
            <p><i>When is the event going to happen?</i></p>
            <input type="datetime-local" class="meeting-time"
                name="meeting-time" onChange={updateTime} defaultValue={eventTime} ref={(c) => eventTime = c} />
            <span id="error-text">{timeError}</span> <br /> 
            <span class="inner-title it_green"></span><br />

                        
            <br/>
            <span class="inner-title it_blue">Location</span><br />
            <p><i>Where is the event going to happen? If online, instead check the box.</i></p>
            <input type="checkbox" class="onlineCheck" clicked={isOnline} onChange={flipOnlineCheck}/>
            <label for="onlineCheck"> Online</label>
            <br/>
            <GoogleAutocomplete defaultValue={eventPlace} onPlaceLoaded={getGoogleData}/>
            
            <span id="error-text">{locationError}</span> <br /> 
            <span class="inner-title it_blue"></span><br />

            <br/>
            <span class="inner-title it_purple">Event Image</span><br />
            <p><i>Give a image to represent your event; this must be uploaded as a url.</i></p>
            <input type="text" id="location" onChange={updateURL} defaultValue={eventPictureURL} ref={(c) => eventPictureURL = c} />
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

export default EditEventUI;