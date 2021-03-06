import React, { useState, useEffect } from 'react';

import EventBox from '../components/EventBox';

var adminVar = [];
var memberVar = [];

function GroupDisplay(props)
{

    var bp = require('../components/Path.js');

    var storage = require('../tokenStorage.js');
    const jwt = require("jsonwebtoken");

    var _ud = localStorage.getItem('user_data');    
    var ud = JSON.parse(_ud);    
    var userId = ud.id;


    var URLid = props.groupId;

    const[groupTitle, setGroupTitle] = useState('');
    const[groupDesc, setGroupDesc] = useState('');
    const[groupImage, setGroupImage] = useState('');
    const[adminList, setAdminList] = useState('');
    const[memberList, setMemberList] = useState('');
    const[eventList, setEventList] = useState('');
    const[joinLeaveButton, setJoinLeaveButton] = useState("Join");

    useEffect(() => {
    

        var tok = storage.retrieveToken();
        var obj = {search:URLid,jwtToken:tok};
        var js = JSON.stringify(obj);
        var res;

        // Keep empty
        var searchParams = "";

        const fetchData = async () =>
        {
            try        
                {            
                    const response = await fetch(bp.buildPath('api/searchgroupid'),            
                        {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
                    var txt = await response.text();   
                    res = JSON.parse(txt); 


                    setGroupTitle(res.results[0].GroupName);
                    var gName = res.results[0].GroupName;
                    setGroupDesc(res.results[0].GroupDescription);
                    setAdminList(<div><p>{makeUsernameList(res.results[0].GroupAdmins)}</p></div>);
                    adminVar = res.results[0].GroupAdmins;
                    //adminVar = res.results[0].GroupAdmins;
                    setMemberList(<div><p>{makeUsernameList(res.results[0].GroupSubscribers)}</p></div>);
                    memberVar = res.results[0].GroupSubscribers;
                    //memberVar = res.results[0].GroupSubscribers; //So we can track the admins and members outside of useEffect.
                    setGroupImage(res.results[0].ImageURL);

    
                    // Flip the status of the join/leave button to Leave if the user has joined the group.
                    if(memberVar.filter(user => user.Id == userId).length != 0)
                    {
                        setJoinLeaveButton("Leave");
                    }

                    //NOTE: WTF?
                    // Flip the status of the join/leave button to Leave if the user has joined the group.
                    if(memberVar.filter(user => user.Id == userId).length != 0)
                    {
                        setJoinLeaveButton("Leave");
                    }
                        
                        var retTok = res.jwtToken;     
                        storage.storeToken( retTok );      
                        
                    var searchObj = {userId:userId,search:searchParams,jwtToken:tok};
                    var jse = JSON.stringify(searchObj);    


                    try        
                    {            
                        const response = await fetch(bp.buildPath('api/searchevents'),            
                            {method:'POST',body:jse,headers:{'Content-Type': 'application/json'}});
                        var txt = await response.text();   
                        var res = JSON.parse(txt);
                                    
                        if( res.error.length > 0 )            
                        {                
                            setEventList( "API Error:" + res.error );     
                            return;
                        }            
                        else            
                        { 
                            const foundevents = res.results.filter(event => event.GroupID == gName);
                            

                            // For each event, make an EventBox with its data.
                            setEventList(foundevents.map((eventData) => (
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
                    }        
                    catch(e)        
                    {      

                        setEventList(e.toString());  
                        return;      
                    }

                }        
                catch(e)        
                {            
                    alert(e.toString());      
                }
            }


        fetchData();

    }, []);

    // This function handles the user clicking the Join/Leave button.
    const joinOrLeave = async event =>
    {
        //If the user is in the list of members, remove them.
        if (memberVar.filter(user => user.Id == userId).length != 0)
        {

            var tok = storage.retrieveToken();
            var obj = {groupId:URLid,jwtToken:tok};
            var js = JSON.stringify(obj);

            try
            {
                const response = await fetch(bp.buildPath('api/unsubgroup'),
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
                    memberVar = memberVar.filter(user => user.Id !== userId);
                    setMemberList(<div><p>{makeUsernameList(memberVar)}</p></div>);
                    setJoinLeaveButton("Join");
                }
            }
            catch(e)
            {
                alert(e.toString());
            }
        }
        else //User is not a member, so add them.
        {

            var tok = storage.retrieveToken();
            var obj = {groupId:URLid,jwtToken:tok};
            var js = JSON.stringify(obj);

            try
            {
                const response = await fetch(bp.buildPath('api/subtogroup'),
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
                    // Maybe change
                    memberVar = [...memberVar, {Id:userId, Name:res.FullName}];
                    setMemberList(<div><p>{makeUsernameList(memberVar)}</p></div>);
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

    return(
        <div id="mainDiv" style={{width: "80%"}}>
            <br /><p style={{fontSize: "50px", marginTop: "0px", marginLeft: "15px", marginRight: "15px"}}>{groupTitle}</p>
            <p>Adminned by: {adminList}</p>
            {
                /* Display the edit button to admins and the join/leave button to other users.*/
                (adminVar.filter(user => user.Id == userId).length != 0) ?
                <button type="button" style={{width: "40%"}} class="buttons" 
                    onClick={() => window.location.href="/editgroup/" + props.groupId}>
                    Edit/Disband Group</button>
                :
                <div>
                    <button type="button" style={{width: "40%"}} class="buttons" 
                    onClick={joinOrLeave}>{joinLeaveButton}</button>
                </div>
            }
            <span class="inner-title"></span><br />
            <img src={groupImage} class="imgeventpage"/><br/>

            <br /><span class="inner-title it_orange">Group Information</span><br />

            <div>
                <p style={{marginLeft: "30px", marginRight: "30px"}}>{groupDesc}</p>
            </div>
            <span class="inner-title it_orange"></span><br />

            <div>
            <span class="inner-title it_yellow">Group Members</span>
                {memberList}
            <span class="inner-title it_yellow"></span>
            
            </div>

            <div>
            <span class="inner-title it_green">Events Hosted</span>
                <div class = "flex-container">
                    {eventList}
                </div>
            <span class="inner-title it_green"></span>
                
            </div>

        </div>
        
    )
}

export default GroupDisplay;