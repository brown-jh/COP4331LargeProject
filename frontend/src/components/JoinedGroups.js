import React, {useEffect, useState } from 'react';

import GroupBox from '../components/GroupBox';

function JoinedGroups()
{
    const [joinedGroups, setJoinedGroups] = useState('');

    useEffect(() => {
        // TODO: Here we would find the groups the user is in via API and put them in here.
        var dummyJoinedGroups=[
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
        setJoinedGroups(dummyJoinedGroups.map((groupData) => (
            <GroupBox title={groupData.title}
                desc={groupData.desc}/>)));
    });

    return (
        <div>
            <button type="button" onClick={() => location.href="/adminnedgroups"}>Adminning Groups</button>
            <div>
                <h1>Your Attending Groups</h1>
                {joinedGroups}
            </div>
        </div>
    )
}

export default JoinedGroups;