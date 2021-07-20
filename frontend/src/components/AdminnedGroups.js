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
        <div>
            <button type="button" onClick={() => location.href="/joinedgroups"}>Attending Groups</button>
            <button type="button" onClick={() => location.href="/newevent"}>Create Group</button>
            <div>
                <h1>Your Adminned Groups</h1>
                {adminnedGroups}
            </div>
        </div>
    )
}

export default AdminnedGroups;