import React, {useState } from 'react';
import GroupBoxPreview from './GroupBoxPreview';
import GroupUserList from '../components/GroupUserList';


function MakeGroupUI()
{
    var groupName = '';
    var groupDesc = '';
    var groupPictureURL = '';

    var adminName = '';
    var memberName = '';
    
    var _ud = localStorage.getItem('user_data');    
    var ud = JSON.parse(_ud);    
    var userId = ud.id;
    var firstName = ud.firstName;    
    var lastName = ud.lastName;

    var bp = require('./Path.js');
    var storage = require('../tokenStorage.js');
    const jwt = require("jsonwebtoken");

    const [nameError, setNameError] = useState('');
    const [descError, setDescError] = useState('');
    const [pictureError, setPictureError] = useState('');
    const [adminError, setAdminError] = useState('');
    const [adminList, setAdminList] = useState([]);
    const [memberError, setMemberError] = useState('');
    const [memberList, setMemberList] = useState([]);
    const [groupSubmitResult, setGroupSubmitResult] = useState('');

    const [cardResults, setCardResults] = useState('');

    const refreshCard = async event =>
    {
        setCardResults(
            <div>{ 
                <GroupBoxPreview 
                        imageURL={groupPictureURL.value}
                        title={groupName.value}
                        desc={groupDesc.value}
                        />}
            </div>  

        )
    }

    function removeAdmin(delName)
    {
        setAdminList(adminList.filter(user => user.name !== delName));
    }

    function removeMember(delName)
    {
        setMemberList(memberList.filter(user => user.name !== delName));
    }

    // This function determines if there is already an admin or invitee with the same name.
    function compareUserNames(userName)
    {
        for(var i = 0; i < adminList.length; i++)
        {
            if (adminList[i].name === userName)
            {
                return false;
            }
        }

        for(var i = 0; i < memberList.length; i++)
        {
            if (memberList[i].name === userName)
            {
                return false;
            }
        }

        return true;
    }


    const addAdmin = async event =>
    {
        // Check if the username is long enough.

        var tok = storage.retrieveToken();       
        var obj = {login:adminName.value,jwtToken:tok};       
        var js = JSON.stringify(obj);    
        try        
        {            
            const response = await fetch(bp.buildPath('api/getuserid'),            
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
            var txt = await response.text();   
            alert(txt);       
            var res = JSON.parse(txt);                     
            var retTok = res.jwtToken;
            storage.storeToken( retTok );
      
        }        
        catch(e)        
        {            
                  
        }
        
        alert(res.userId);

        var loginRegex = /^\w{5,}$/; // Matches a string of 5 or more alphanumerics.

        // Clears text when user adds another user.
        setAdminError("");
        if (!loginRegex.test(adminName.value)||res.userId == undefined)
        {
            setAdminError("That user does not exist.");
            return;
        }

        if (!compareUserNames(adminName.value))
        {
            setAdminError("That user is already in the group.");
            return;
        }



        // Put the user in the admin list and display it.
        // TODO: Replace dummy 0 ID with whatever API retrieves for user's ID.
        setAdminList([...adminList, {name: adminName.value, id:res.userId}]);
    }


    const addMember = async event =>
    {
        // Check if the username is long enough. TODO: Do API call to check if user exists and get ID.
        var loginRegex = /^\w{5,}$/; // Matches a string of 5 or more alphanumerics.
        
        var tok = storage.retrieveToken();       
        var obj = {login:memberName.value,jwtToken:tok};       
        var js = JSON.stringify(obj);    
        try        
        {            
            const response = await fetch(bp.buildPath('api/getuserid'),            
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
            var txt = await response.text();   
            alert(txt);       
            var res = JSON.parse(txt);                     
            var retTok = res.jwtToken;
            storage.storeToken( retTok );
      
        }        
        catch(e)        
        {            
                  
        }
        
        alert(res.userId);

        // Clears text when user adds another user.
        setMemberError("");
        if (!loginRegex.test(memberName.value)||res.userId == undefined)
        {
            setMemberError("That user does not exist.");
            return;
        }

        if (!compareUserNames(memberName.value))
        {
            setMemberError("That user is already in the group.");
            return;
        }

        // Put the user in the member list and display it.
        // TODO: Replace dummy 0 ID with whatever API retrieves for user's ID.
        setMemberList([...memberList, {name: memberName.value, id:res.userId}]);
    }

    const submitGroup = async event =>
    {
        var isError = false;
        setNameError(""); //Clear any errors from the last submit.
        setDescError("");
        setAdminError("");
        setMemberError("");
        setGroupSubmitResult("");

        if (groupName.value == "") //Check for any missing information.
        {
            setNameError("Please give a name.");
            isError = true;
        }
        if (groupDesc.value == "")
        {
            setDescError("Please give a description.");
            isError = true;
        }
        if (groupPictureURL.value == "")
        {
            setPictureError("Please enter a URL that contains desired image.");
            isError = true;
        }


        //Notify the user of any errors, otherwise submit.
        if (isError)
        {
            setGroupSubmitResult("Information missing or invalid; check above.");
        }
        else
        {

            //NOTE: Edited these so admins and subscribers treated differently, and API gets IDs
            //as intended.
            var _groupAdmins = adminList.map(user => user.id);
            var _groupSubscribers = memberList.map(user => user.id);

            alert("Name: " + groupName.value + "\nDescription: " + groupDesc.value + 
            "\nAdmins: " + adminList.map(user => user.name + " " + user.id) + "\nMembers: " + 
            memberList.map(user => user.name + " " + user.id) + "\nURL: " + groupPictureURL.value +
            "\nTODO: Add current user as admin, call API, cleanup after");

            var tok = storage.retrieveToken();
            var obj = {groupname:groupName.value, groupDescription:groupDesc.value, groupAdmins:_groupAdmins,jwtToken:tok,groupSubscribers:_groupSubscribers, imageURL:groupPictureURL.value};
            var js = JSON.stringify(obj);

            try
            {
                const response = await fetch(bp.buildPath('api/addgroup'),
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
                    setGroupSubmitResult("Successfully created group! Redirecting to your groups.");
                    storage.storeToken( retTok );
                    window.location.href = "/adminnedgroups";
                }
            }
            catch(e)
            {
                alert(e.toString());
            }         
        }
    }

    return(
        <div id="mainDiv" style={{width: "60%"}}>
            <span class="inner-title">Create Group</span><br/><br/>

            <span class="inner-title it_orange">Name</span><br />
            <p><i>Give the group a short, descriptive name.</i></p>
            <input type="text" ref={(c) => groupName = c} />
            <span id="error-text">{nameError}</span> <br /> 
            <span class="inner-title it_orange"></span><br />


            <br/>
            <span class="inner-title it_yellow">Description</span><br />
            <p><i>Describe the group you're making; what will you do, when and where, who is invited, etc.</i></p>
            <textarea rows="7" cols= "40" maxLength="290" ref={(c) => groupDesc = c} />
            <span id="error-text">{descError}</span> <br /> 
            <span class="inner-title it_yellow"></span><br />

            <br/>
            <span class="inner-title it_green">Group Image</span><br />
            <p><i>Give a image to represent your group; this must be uploaded as a url.</i></p>
            <input type="text" id="location" ref={(c) => groupPictureURL = c} />
            <span id="error-text">{pictureError}</span> <br /> 
            <span class="inner-title it_green"></span><br />

            <br/>
            <span class="inner-title it_blue">Admins</span><br />
            <p><i>If you want to include other users as group admins, enter their names here.</i></p>
            <input type="text" ref={(c) => adminName = c} /><br />
            <button type="button" style={{width: "30%"}} 
            class="buttons" onClick={addAdmin}>Add User as Admin</button>
            <span id="error-text">{adminError}</span> <br /> 
            <GroupUserList users={adminList} delFunc={removeAdmin}/>
            <span class="inner-title it_blue"></span><br />
            <br />

            <span class="inner-title it_purple">Invitees</span><br />
            <p><i>If you want to invite users as group attendees, enter their names here.</i></p>
            <input type="text" ref={(c) => memberName = c} /><br />
            <button type="button" style={{width: "30%"}} 
            class="buttons" onClick={addMember}>Invite User</button>
            <span id="error-text">{memberError}</span> <br />
            <GroupUserList users={memberList} delFunc={removeMember}/>
            <span class="inner-title it_purple"></span><br />

            <br/>
            <span class="inner-title it_pink">Review</span><br />
            <p><i>Please review your group, as this is what users will view on the Search page.</i></p>
            
            <button type="button" style={{width: "30%"}} 
            class="buttons" onClick={refreshCard}>Refresh</button>
            <div class = "flex-container">
            <div>{cardResults}</div>
            </div>
            <span class="inner-title it_pink"><b></b></span><br />


            <button type="button" style={{width: "50%"}} 
            class="buttons" onClick={submitGroup}>Submit</button>
            <span class="smaller-inner-title">Please make sure to review your group before you submit!</span><br />
            <div><span id="error-text">{groupSubmitResult}</span> <br /> </div>
        </div> 
    )
}

export default MakeGroupUI;
