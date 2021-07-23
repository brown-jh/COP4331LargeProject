import React, { useState, useEffect } from 'react';

import EventBox from '../components/EventBox';

var adminVar = [];

function GroupDisplay(props)
{
    var userId = "Hannah Wrigley"; //Dummy value, should be set in UseEffect(). Should see edit button.

    const[groupTitle, setGroupTitle] = useState('');
    const[groupDesc, setGroupDesc] = useState('');
    const[adminList, setAdminList] = useState('');
    const[memberList, setMemberList] = useState('');
    const[eventList, setEventList] = useState('');

    useEffect(() => {
        //TODO: Here, we would normally pull the group ID from the URL, get the group via API, 
        // and use it to get the group's data, but we'll use dummy data for now.

        var thisGroup={
            name: "NerdKnighteria of UCF",
            description: "This club is for people at UCF interested in board and video games; we meet Tuesdays at 5 in the Student Union.",
            admins: ["John Smith", "Alyx Reckahn", "Hannah Wrigley"],
            members: ["Member 1", "Louis Ferguson", "Isabelle Bathory"],
            events:[
                {
                    title: "Sunday Practice for Orlando Tennis Club",
                    group: "Women's Tennis Club of Orlando",
                    time: "April 23rd, 2021 2:00 PM",
                    place: "Big Win Gym, 4913 Greensteel Drive, Orlando, FL, 32828"
                },
                {
                    title: "Weekly D&D Night, Newcomers Welcome",
                    group: "",
                    time: "April 21st, 2021 8:00 PM",
                    place: "2123 Rose Lane, Orlando, FL, 32819"
                },
                {
                    title: "JavaScript Workshop",
                    group: "Programming Club of UCF",
                    time: "April 26th, 2021 3:00 PM",
                    place: "Online"
                },
                {
                    title: "Super Smash Bros Tournament - Cash Prizes",
                    group: "NerdKnighteria of UCF",
                    time: "May 12th, 2021 5:00 PM",
                    place: "Online"
                },
                {
                    title: "April Meeting of Jacaranda Book Club",
                    group: "Jacaranda Book Club",
                    time: "April 6th, 2021 1:00PM",
                    place: "4143 Woodmere Park Blvd, Venice, FL 34293"
                }
            ]
        };

        setGroupTitle(thisGroup.name + "\nGroup ID: " + props.groupId); //To test the parameter pass-in.
        setGroupDesc(thisGroup.description);
        setAdminList(<div><p>{makeUsernameList(thisGroup.admins)}</p></div>);
        adminVar = thisGroup.admins;
        setMemberList(<div><p>{makeUsernameList(thisGroup.members)}</p></div>);

        // For each event, make an EventBox with its data.
        setEventList(thisGroup.events.map((eventData) => (
            <EventBox title={eventData.title}
                group={eventData.group}
                // Ensures dates are in: Month Day, Year Time format
                time={new Date(eventData.time).toLocaleString('en-us', {year: 'numeric', month: 'long', day: '2-digit'}).
                replace(/(\d+)\/(\d+)\/(\d+)/, '$1-$2-$3') + " " + new Date(eventData.time).toLocaleTimeString()}
                place={eventData.place}/>)));
    }, []);

        // Turn an array of users into a comma-separated string.
        function makeUsernameList(users)
        {
            var userList = "";
            for (var i = 0; i < userList.length; i++)
            {
                userList += userList[i];
                if (i < userList.length-1)
                {
                    userList += ", ";
                }
            }
            return userList;
        }

    return(
        <div id="mainDiv" style={{width: "80%"}}>
            <span class="inner-title"><h2>{groupTitle}</h2></span><br />
            <img src="https://i.ticketweb.com/i/00/09/57/08/29_Original.jpg?v=6" class="imgresponsive"/>
            <p></p> {/* To make the button below line up properly, like on the event page.*/}
            {/* Display the edit button to admins and the enroll checkbox to other users.*/}
            {

                adminVar.indexOf(userId) != -1 ?
                <button type="button" style={{width: "50%"}} class="buttons" 
                    onClick={() => window.location.href="/editgroup/" + props.groupId}>
                    Edit/Disband Group</button>
                :
                <div>
                    <input type="checkbox" id="memberCheck"/>
                    <label for="memberCheck">Joined group</label>
                </div>
            }
            <span class="inner-title"></span><br />

            <span class="inner-title it_yellow"></span><br />

            <div>
                <p>{groupDesc}</p>
            </div>
            <span class="inner-title it_yellow"></span><br />

            

            <div>
            <p>Admins:</p>
                {adminList} <br />
            <p>Members:</p>
                {memberList}
            </div>

            <div>
            <p>Events:</p>
                <div class = "flex-container">
                    {eventList}
                </div>
            </div>

        </div>
        
    )
}

export default GroupDisplay;