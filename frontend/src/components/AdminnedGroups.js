import React, {useEffect, useState } from 'react';

import GroupBox from '../components/GroupBox';

function AdminnedGroups()
{
    const [adminnedGroups, setAdminnedGroups] = useState('');

    useEffect(() => {
        // TODO: Here we would find the groups the user admins via API and put them in here.
        var dummyAdminGroups=[
            {
                title: "NerdKnighteria of UCF",
                desc: "This is a club for board and video gamers at UCF.",
            },
            {
                title: "Dark Side Comics Game Night",
                desc: "We meet at Dark Side Comics on Sundays to play board games.",
            },
            {
                title: "YMCA Swimming Club",
                desc: "We're here to dive in and have fun!",
            },
            {
                title: "Game Jammers",
                desc: "Interested in game dev or game jams? Try here!",
            }
        ]
        setAdminnedGroups(dummyAdminGroups.map((groupData) => (
            <GroupBox title={groupData.title}
                desc={groupData.desc}/>)));
    });

    return (

        <div id="mainDiv" style={{width: "80%"}}>
             <span class="inner-title">Your Adminned Groups</span><br />
             <button style={{width: "25%", marginLeft:"12%", marginRight:"12%"}} type="button" 
                class="buttons buttons btn-search" onClick={() => window.location.href="/joinedgroups"}>Joined Groups</button>
            <button style={{width: "25%", marginLeft:"12%", marginRight:"12%"}} type="button" 
                class="buttons btn-search"onClick={() => window.location.href="/newgroup"}>Create Group</button><br />
            <div class = "flex-container">
            {adminnedGroups}
            </div>
        </div>
    )
}

export default AdminnedGroups;