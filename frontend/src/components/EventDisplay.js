import React, { useState, useEffect } from 'react';
import CommentBlock from '../components/CommentBlock';

var attendeeVar = [];

function EventDisplay(props)
{

    var bp = require('../components/Path.js');

    var storage = require('../tokenStorage.js');
    const jwt = require("jsonwebtoken");

    var _ud = localStorage.getItem('user_data');    
    var ud = JSON.parse(_ud);    
    var userId = ud.id;
    var userName = ud.username;

    //var userName = "Test User";

    var URLid = props.eventId;

    const[eventTitle, setEventTitle] = useState('');
    const[eventDesc, setEventDesc] = useState('');
    const[eventHost, setEventHost] = useState('');
    const[eventImage, setEventImage] = useState('');
    const[attendeeList, setAttendeeList] = useState('');
    const[eventGroup, setEventGroup] = useState('');
    const[eventTime, setEventTime] = useState('');
    const[eventLocation, setEventLocation] = useState('');
    const[eventComments, setEventComments] = useState([]);
    const[joinLeaveButton, setJoinLeaveButton] = useState("Join");

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
                    //alert(txt);
                    res = JSON.parse(txt); 
                    alert(res.results[0].EventAttendees);   
                    alert(res.results[0].EventComments);

                        setEventTitle(res.results[0].EventName); //To test the parameter pass-in.
                        setEventDesc(res.results[0].EventDescription);
                        setEventHost(res.results[0].EventHosts[0].Name);
                        setAttendeeList(<div><p>{makeUsernameList(res.results[0].EventAttendees)}</p></div>);
                        attendeeVar = res.results[0].EventAttendees; //So we can access the attendees outside of useEffect.
                        setEventGroup(res.results[0].GroupID);
                        setEventTime(new Date(res.results[0].EventTime).toLocaleString('en-us', {year: 'numeric', month: 'long', day: '2-digit'}).
                        replace(/(\d+)\/(\d+)\/(\d+)/, '$1-$2-$3') + " " + new Date(res.results[0].EventTime).toLocaleTimeString());
                        setEventLocation(res.results[0].EventLocation);
                        //setEventComments(res.results[0].EventComments);
                        setEventImage(res.results[0].ImageURL); //Dummy data, fix with rest of API call.

                        // Flip the status of the join/leave button to Leave if the user is in the list of attendees.
                        if (attendeeVar.filter(user => user.Id == userId).length != 0)
                        {
                            setJoinLeaveButton("Leave");
                        }
                        
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

        var thisEvent={
            name: "Smash Tournament for NerdKnighteria",
            host: {name: "Hannah Wrigley", id:"0"},
            description: "NerdKnighteria is holding a Smash 4 tournament at the Student Union at 3 on Monday. Bring snacks and controllers, cash prizes to be awarded up to 50$.",
            attendees: [{name:"John Smith", id:"1"}, 
            {name:"Alyx Reckahn", id:"2"}, 
            {name:"Sienna Liskwell", id:"3"}],
            group: "NerdKnighteria of UCF",
            time: "July 31 2021, 3:00 PM",
            place: "Student Union, University of Central Florida, Orlando",
            comments: [
                {
                    user: "QuinnH",
                    text: "Hey guys, I can't come tonight; have to study for a test.",
                    date: "7-12-2021"
                },
                {
                    user: "ThomasMahBoi",
                    text: "Hannah, my friend who isn't in the club wanted to come in and watch the tournament; is that okay?",
                    date: "7-13-2021"
                },
                {
                    user: "badumtssXD",
                    text: "I have extra controllers if anyone wants them!",
                    date: "7-19-2021"
                }
            ]
        };
    }, []);

    // This function handles the user clicking the Join/Leave button.
    const joinOrLeave = async event =>
    {
        //If user is in the attendee list, remove them.
        if (attendeeVar.filter(user => user.Id == userId).length != 0) 
        {
            //alert("TODO: use API to remove from event.");

            var tok = storage.retrieveToken();
            var obj = {eventId:URLid,jwtToken:tok};
            var js = JSON.stringify(obj);

            try
            {
                const response = await fetch(bp.buildPath('api/unsubevent'),
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
                    attendeeVar = attendeeVar.filter(user => user.Id !== userId);
                    setAttendeeList(<div><p>{makeUsernameList(attendeeVar)}</p></div>);
                    setJoinLeaveButton("Join");
                }
            }
            catch(e)
            {
                alert(e.toString());
            }            
        }
        else //User is not attending, so add them.
        {
            //alert("TODO: use API to add to event.");

            var tok = storage.retrieveToken();
            var obj = {eventId:URLid,jwtToken:tok};
            var js = JSON.stringify(obj);

            try
            {
                const response = await fetch(bp.buildPath('api/subtoevent'),
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
                    attendeeVar = [...attendeeVar, {Name: res.FullName, Id:userId}];
                    setAttendeeList(<div><p>{makeUsernameList(attendeeVar)}</p></div>);
                    setJoinLeaveButton("Leave");
                }
            }
            catch(e)
            {
                alert(e.toString());
            }              
        }
    }

    // Turn an array of users into a comma-separated string.
    function makeUsernameList(users)
    {
        var userList = "";
        for (var i = 0; i < users.length; i++)
        {
            userList += users[i].Name;
            if (i < users.length-1)
            {
                userList += ", ";
            }
        }
        return userList;
    }

    //This function adds a comment to the list.
    const addComment = async (commentText) =>
    {

        var today = new Date();
        var currentDate = (today.getMonth()+1)+'-'+today.getDate()+'-'+today.getFullYear();

        //TODO: Use API call to send user ID number and comment to the server; the code to add the
        // visible comment should use the username instead of userId.

        var tok = storage.retrieveToken();       
        var obj = {jwtToken:tok,text:commentText, date:currentDate, eventId:props.eventId};       
        var js = JSON.stringify(obj);

        try
            {
                const response = await fetch(bp.buildPath('api/addcomment'),
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
                    var newComment = {
                        user: res.FullName,
                        text: commentText,
                        date: currentDate 
                    };
                    setEventComments([...eventComments, newComment]);
                }
            }
            catch(e)
            {
                alert(e.toString());
            }         
    }
    return(
        <div id="mainDiv" style={{width: "80%"}}>
            <br /><p style={{fontSize: "50px", marginTop: "0px", marginLeft: "15px", marginRight: "15px"}}>{eventTitle}</p>
            <p>Hosted by: {eventHost}</p>

            {/* Display the edit button to the host and the join/leave button to other users.*/}
            {
               eventHost == userName ?
                <button type="button" style={{width: "40%"}} class="buttons" onClick={() => window.location.href="/editevent/" + props.eventId}>Edit/Cancel Event</button>
                :
                <button type="button" style={{width: "40%"}} class="buttons" onClick={joinOrLeave}>{joinLeaveButton}</button>
            }

            <span class="inner-title"></span><br />

            <img src={eventImage} class="imgeventpage"/><br/>
            
            <br /><span class="inner-title it_orange">Event Information</span><br />
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

            <span class="inner-title it_green">Comments</span>
                <CommentBlock comments={eventComments} submitCommand={addComment}/>
            <span class="inner-title it_green"></span>
            
            </div>

        </div>
        
    )
}

export default EventDisplay;