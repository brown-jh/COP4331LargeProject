import React, {useEffect, useState } from 'react';

import GroupBox from '../components/GroupBox';

function AdminnedGroups()
{

    var bp = require('../components/Path.js');

    var storage = require('../tokenStorage.js');
    const jwt = require("jsonwebtoken");

    var _ud = localStorage.getItem('user_data');    
    var ud = JSON.parse(_ud);    
    var userId = ud.id;

    const [adminnedGroups, setAdminnedGroups] = useState('');

    useEffect(() => {
        
        var tok = storage.retrieveToken();
        var obj = {search:userId,jwtToken:tok};
        var js = JSON.stringify(obj);

        async function fetchData(){
            try
            {
                const response = await fetch(bp.buildPath('api/searchgroupadmins'),
                    {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

                var txt = await response.text();
                var res = JSON.parse(txt);

  
                    setAdminnedGroups(res.results.map((groupData) => (
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