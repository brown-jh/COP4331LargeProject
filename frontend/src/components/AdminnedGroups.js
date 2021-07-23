import React, {useEffect, useState } from 'react';

import GroupBox from '../components/GroupBox';

function AdminnedGroups()
{

    var _ud = localStorage.getItem('user_data');    
    var ud = JSON.parse(_ud);    
    var userId = ud.id;

    const [adminnedGroups, setAdminnedGroups] = useState('');

    useEffect(() => {
        
        var tok = storage.retrieveToken();
        var obj = {search:userId,jwtToken:tok};
        var js = JSON.stringify(obj);

        try
        {
            const response = await fetch(bp.buildPath('api/searchgroupadmins'),
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            var txt = await response.text();
            var res = JSON.parse(txt);

            if( res.error.length > 0 )
            {
                setMessage( "API Error:" + res.error );
            }
            else
            {
                setAdminnedGroups(res.results.map((groupData) => (
                    <GroupBox title={groupData.title}
                        desc={groupData.desc}/>)));
                
                var retTok = res.jwtToken;
                storage.storeToken( retTok );
                return;
            }
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }

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