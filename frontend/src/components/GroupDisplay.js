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

    var userName = "Test User";

    const[groupTitle, setGroupTitle] = useState('');
    const[groupDesc, setGroupDesc] = useState('');
    const[groupImage, setGroupImage] = useState('');
    const[adminList, setAdminList] = useState('');
    const[memberList, setMemberList] = useState('');
    const[eventList, setEventList] = useState('');
    const[joinLeaveButton, setJoinLeaveButton] = useState("Join");

    useEffect(() => {
        

        var url = window.location.pathname;
        var URLid = url.substring(url.lastIndexOf('/') + 1);

        var tok = storage.retrieveToken();
        var obj = {search:URLid,jwtToken:tok};
        var js = JSON.stringify(obj);
        var res;

        const fetchData = async () =>
        {
            try        
                {            
                    const response = await fetch(bp.buildPath('api/searchgroupid'),            
                        {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
                    var txt = await response.text();   
                    //alert(txt);
                    res = JSON.parse(txt); 

                    alert(res.results[0].GroupAdmins);

                    setGroupTitle(res.results[0].GroupName);
                    setGroupDesc(res.results[0].GroupDescription);
                    setAdminList(<div><p>{makeUsernameList(res.results[0].GroupAdmins)}</p></div>);
                    adminVar = res.results[0].GroupAdmins;
                    setMemberList(<div><p>{makeUsernameList(res.results[0].GroupSubscribers)}</p></div>);
                    memberVar = res.results[0].GroupSubscribers; //So we can track the admins and members outside of useEffect.
                    setGroupImage(res.results[0].ImageURL);
    
                    // Flip the status of the join/leave button to Leave if the user has joined the group.
                    if(memberVar.filter(user => user.id == userId).length != 0)
                    {
                        setJoinLeaveButton("Leave");
                    }

                    // For each event, make an EventBox with its data.
                    setEventList(thisGroup.events.map((eventData) => (
                    <EventBox title={eventData.title}
                        group={eventData.group}
                        eventId={eventData.id}
                        // Ensures dates are in: Month Day, Year Time format
                        time={new Date(eventData.time).toLocaleString('en-us', {year: 'numeric', month: 'long', day: '2-digit'}).
                        replace(/(\d+)\/(\d+)\/(\d+)/, '$1-$2-$3') + " " + new Date(eventData.time).toLocaleTimeString()}
                        place={eventData.place}/>)));

                // Flip the status of the join/leave button to Leave if the user has joined the group.
                if(memberVar.filter(user => user.id == userId).length != 0)
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

        var thisGroup={
            name: "NerdKnighteria of UCF",
            description: "This club is for people at UCF interested in board and video games; we meet Tuesdays at 5 in the Student Union.",
            admins: [
                {name:"John Smith", id:"1"}, 
                {name:"Alyx Reckahn", id:"2"}, 
                {name:"Hannah Wrigley", id:"3"}],
            members: [
                {name:"Cassia Lengtree", id: "4"}, 
                {name:"Louis Ferguson", id:"5"}, 
                {name:"Isabelle Bathory", id:"6"}],
            events:[
                {
                    id: "1111",
                    title: "Sunday Practice for Orlando Tennis Club",
                    group: "Women's Tennis Club of Orlando",
                    time: "April 23rd, 2021 2:00 PM",
                    place: "Big Win Gym, 4913 Greensteel Drive, Orlando, FL, 32828"
                },
                {
                    id: "2222",
                    title: "Weekly D&D Night, Newcomers Welcome",
                    group: "",
                    time: "April 21st, 2021 8:00 PM",
                    place: "2123 Rose Lane, Orlando, FL, 32819"
                },
                {
                    id:"3333",
                    title: "JavaScript Workshop",
                    group: "Programming Club of UCF",
                    time: "April 26th, 2021 3:00 PM",
                    place: "Online"
                },
                {
                    id:"4444",
                    title: "Super Smash Bros Tournament - Cash Prizes",
                    group: "NerdKnighteria of UCF",
                    time: "May 12th, 2021 5:00 PM",
                    place: "Online"
                },
                {
                    id:"5555",
                    title: "April Meeting of Jacaranda Book Club",
                    group: "Jacaranda Book Club",
                    time: "April 6th, 2021 1:00PM",
                    place: "4143 Woodmere Park Blvd, Venice, FL 34293"
                }
            ]
        };
    }, []);

    // This function handles the user clicking the Join/Leave button.
    function joinOrLeave()
    {
        //If the user is in the list of members, remove them.
        if (memberVar.filter(user => user.id == userId).length != 0)
        {
            alert("TODO: use API to remove from group.");
            memberVar = memberVar.filter(user => user.id !== userId);
            setMemberList(<div><p>{makeUsernameList(memberVar)}</p></div>);
            setJoinLeaveButton("Join");
        }
        else //User is not a member, so add them.
        {
            alert("TODO: use API to add to group.");
            memberVar = [...memberVar, {id:userId, name:userName}];
            setMemberList(<div><p>{makeUsernameList(memberVar)}</p></div>);
            setJoinLeaveButton("Leave");
        }
    }

    // Turn an array of users into a comma-separated string.
    function makeUsernameList(users)
    {
        var userList = "";
        for (var i = 0; i < users.length; i++)
        {
            userList += users[i].name;
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
                (adminVar.filter(user => user.id == userId).length != 0) ?
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