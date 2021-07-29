import React, {useEffect, useState } from 'react';

import GroupBox from '../components/GroupBox';

function JoinedGroups()
{

    var bp = require('../components/Path.js');

    var storage = require('../tokenStorage.js');
    const jwt = require("jsonwebtoken");

    var _ud = localStorage.getItem('user_data');    
    var ud = JSON.parse(_ud);    
    var userId = ud.id;

    const [joinedGroups, setJoinedGroups] = useState('');

    useEffect(() => {
        var tok = storage.retrieveToken();
        var obj = {search:userId,jwtToken:tok};
        var js = JSON.stringify(obj);

        async function fetchData(){
            try
            {
                const response = await fetch(bp.buildPath('api/searchgroupsubbed'),
                    {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

                var txt = await response.text();
                var res = JSON.parse(txt);

  
                setJoinedGroups(res.results.map((groupData) => (
                        <GroupBox title={groupData.GroupName}
                            imageURL={groupData.ImageURL}
                            desc={groupData.GroupDescription}
                            groupId={groupData._id}/>)));
                        
                    var retTok = res.jwtToken;
                   storage.storeToken( retTok );
                  return;

            }
            catch(e)
            {
                
                return;
            }
        };

        fetchData();
        
    },[]);

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