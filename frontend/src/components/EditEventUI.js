import React, { useState, useEffect } from 'react';
import GoogleAutocomplete from '../components/GoogleAutocomplete';
import EventBoxPreview from './EventBoxPreview';

// Global variables, these we're getting reset for some reason.
var eventPlace = '';
var eventGroup = '';

var eventTime = '';
var isoDateTime;

function EditEventUI(props)
{
    var URLid = props.eventId;
 
    var bp = require('./Path.js');
    var storage = require('../tokenStorage.js');
    const jwt = require("jsonwebtoken");

    var _ud = localStorage.getItem('user_data');    
    var ud = JSON.parse(_ud);    
    var userId = ud.id;

    var userGroups = [];
    var eventName = '';
    var eventDesc = '';
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


        var tok = storage.retrieveToken();
        var obj = {search:URLid,jwtToken:tok};
        var js = JSON.stringify(obj);
        var res;

        const fetchData = async () =>
        {
            try        
                {            
                    const response = await fetch(bp.buildPath('api/searcheventid'),            
                        {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
                    var txt = await response.text();   
                    res = JSON.parse(txt); 

                    eventName.value = res.results[0].EventName;
                    eventDesc.value = res.results[0].EventDescription;
                    eventTime.value = res.results[0].EventTime;
                    var date = new Date(res.results[0].EventTime); // Or the date you'd like converted.
                    isoDateTime = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().slice(0, -1);
                    eventGroup = res.results[0].GroupID;
                    eventPlace = res.results[0].EventLocation;
                    eventPictureURL.value = res.results[0].ImageURL;
                        
                        var retTok = res.jwtToken;     
                        storage.storeToken( retTok );      
                        
                        return;    

                }        
                catch(e)        
                {            
                    alert(e.toString());      
                }
            }

        fetchData();

        
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
        // var newTime = new Date(event.target.value).toLocaleString('en-us', {year: 'numeric', month: 'long', day: '2-digit'}).
        // replace(/(\d+)\/(\d+)\/(\d+)/, '$1-$2-$3') + " " + new Date(event.target.value).toLocaleTimeString()
        // setTimeError(newTime);
    }

    function updateURL(event)
    {
        event.preventDefault();
        // setPictureError(event.target.value);
    }


    const flipOnlineCheck = async event =>
    {
        setIsOnline(!isOnline);
    }

    // Updates eventPlace variable when user selects a location from Google API.
    const getGoogleData = (e) =>
    {
        eventPlace = e;
        // setLocationError(e);
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

    const confirmDelete = async event =>
    {
        if(window.confirm("Are you sure you want to disband this event?"))
        {
            var tok = storage.retrieveToken();
            var obj = {eventId:props.eventId,jwtToken:tok};
            var js = JSON.stringify(obj);

            try        
                {            
                    const response = await fetch(bp.buildPath('api/deleteevent'),            
                        {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
                    var txt = await response.text();
                    //alert("return errors" + txt);
                }
                    catch(e)        
                    {            
                        alert(e.toString());      
                    }
      
                window.location.href = "/hostedevents";
                  
        
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
            isError = true;
        }
        if (eventDesc.value == "")
        {
            setDescError("Please give a description.");
            isError = true;
        }
        if (eventTime.value == "")
        {
            setTimeError("Please give a time.");
            isError = true;
        }
        if (eventPlace == "" && !isOnline)
        {
            setLocationError("Please give a location or check \"Online\".");
            isError = true;
        }
        if (eventPictureURL.value == "")
        {
            setPictureError("Please enter a URL that contains desired image.");
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

            var _eventPlace = eventPlace.toString()
            var _eventTime = eventTime.value + ":00.000"

            var tok = storage.retrieveToken();
            var obj = {eventId:props.eventId, eventName:eventName.value, eventDescription:eventDesc.value, groupID:eventGroup, eventTime:_eventTime, eventLocation:_eventPlace, imageURL:eventPictureURL.value, eventhost:userId,jwtToken:tok};
            var js = JSON.stringify(obj);

            try
            {
                const response = await fetch(bp.buildPath('api/updateevent'),
                    {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

                var txt = await response.text();
                var res = JSON.parse(txt);
                var retTok = res.jwtToken;

                if( res.error.length > 0 )
                {
                    alert( "API Error:" + res.error );
                }
                else
                {
                    setEventMakeResult("Successfully updated event! Redirecting back to your events.");
                    storage.storeToken( retTok );
                    window.location.href = "/hostedevents";
                }
            }
            catch(e)
            {
                alert(e.toString());
            }

        }

        
    }    

    return(
        <div id="mainDiv" style={{width: "60%"}}>
            <span class="inner-title">Update Event</span><br />
            <button type="button" style={{width: "30%"}} class="buttons" onClick={() => window.location.href="/hostedevents"}>Back</button><br/>
            <br/>
            <button type="button" style={{width: "30%"}} class="buttons"  onClick={() => confirmDelete(props.eventId)}>Disband Event</button><br/>
            <br/>


            <span class="inner-title it_orange">Name</span><br />
            <p><i>Give the event a short, descriptive name.</i></p>
            <input type="text" onChange={updateName} defaultValue={eventName} ref={(c) => eventName = c} />
            <span id="error-text" style={{color: "white"}}>{nameError}</span> <br /> 
            <span class="inner-title it_orange"></span><br />

            
            <br/>
            <span class="inner-title it_yellow">Description</span><br />
            <p><i>Tell your attendees about the event; what it involves, what they should bring, etc.</i></p>
            <textarea rows="7" cols= "40" maxLength= "210" onChange={updateDesc} defaultValue={eventDesc} ref={(c) => eventDesc = c} />
            <span id="error-text" style={{color: "white"}} >{descError}</span> <br /> 
            <span class="inner-title it_yellow"></span><br />

            
            <br/>
            <span class="inner-title it_green">Date/Time</span><br />
            <p><i>When is the event going to happen?</i></p>
            <input type="datetime-local" class="meeting-time"
                name="meeting-time" onChange={updateTime} defaultValue={isoDateTime} ref={(c) => eventTime = c} />
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
         
            {/*NOTE: Should be unavailable.*/}
            <br/>
            <span class="inner-title it_pink">Group</span><br />
            <p><i>We currently do not support editing groups at this time.</i></p>
            <p style={{fontSize: "20px"}}>Current Group ID: {eventGroup}</p>
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