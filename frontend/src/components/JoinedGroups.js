import React, {useEffect, useState } from 'react';

import GroupBox from '../components/GroupBox';

function JoinedGroups()
{
    const [joinedGroups, setJoinedGroups] = useState('');

    useEffect(() => {
        // TODO: Here we would find the groups the user is in via API and put them in here.
        var dummyJoinedGroups=[
            {
                id: "12345",
                title: "NerdKnighteria of UCF",
                desc: "This is a club for board and video gamers at UCF.",
            },
            {
                id: "56789",
                title: "Dark Side Comics Game Night",
                desc: "We meet at Dark Side Comics on Sundays to play board games.",
            },
            {
                id: "13579",
                title: "YMCA Swimming Club",
                desc: "We're here to dive in and have fun!",
            },
            {
                id: "54321",
                title: "Game Jammers",
                desc: "Interested in game dev or game jams? Try here!",
            }
        ]
        setJoinedGroups(dummyJoinedGroups.map((groupData) => (
            <GroupBox title={groupData.title}
                desc={groupData.desc}
                groupId={groupData.id}/>)));
    });

    return (

        <div id="mainDiv" style={{width: "80%"}}>
                <span class="inner-title">Your Attending Groups</span><br />
                <button type="button" 
                class="buttons buttons btn-search" onClick={() => window.location.href="/adminnedgroups"}>Adminning Groups</button>
            <div class = "flex-container">
                {joinedGroups}
            </div>
        </div>
    )
}

export default JoinedGroups;