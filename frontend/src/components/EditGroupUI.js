import React, {useState, useEffect} from 'react';

import GroupBoxPreview from './GroupBoxPreview';
import GroupUserList from '../components/GroupUserList';




function EditGroupUI(props)
{
    var URLid = props.groupId;

    var bp = require('./Path.js');
    var storage = require('../tokenStorage.js');
    const jwt = require("jsonwebtoken");

    //NOTE: Why doesn't this happen?
    // TODO: MAKE SURE TO GET RID OF IS ************************************************
    var userName = "";

    var _ud = localStorage.getItem('user_data');
    var ud = JSON.parse(_ud);
    var userId = ud.id;

    var groupName = '';
    var groupDesc = '';
    var groupPictureURL = '';

    var adminName = '';
    var memberName = '';

    const [nameError, setNameError] = useState('');
    const [descError, setDescError] = useState('');
    const [pictureError, setPictureError] = useState('');
    const [adminError, setAdminError] = useState('');
    const [adminList, setAdminList] = useState([]);
    const [memberError, setMemberError] = useState('');
    const [memberList, setMemberList] = useState([]);
    const [groupSubmitResult, setGroupSubmitResult] = useState('');

    const [cardResults, setCardResults] = useState('');

    useEffect(() => {

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
                    res = JSON.parse(txt);


                    groupName.value = res.results[0].GroupName;
                    groupDesc.value = res.results[0].GroupDescription;

                    groupPictureURL.value = res.results[0].ImageURL;

                    setAdminList(res.results[0].GroupAdmins);
                    setMemberList(res.results[0].GroupSubscribers);

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

        // This [], ensures useEffect only runs once.
    }, []);

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

    function removeAdmin(delId)
    {
        setAdminList(adminList.filter(user => user.Id !== delId));
    }

    function removeMember(delId)
    {
        setMemberList(memberList.filter(user => user.Id !== delId));
    }

    // This function determines if there is already an admin or invitee with the same id.
    function compareUserNames(userId)
    {
        for(var i = 0; i < adminList.length; i++)
        {
            if (adminList[i].Id === userId)
            {
                return false;
            }
        }

        for(var i = 0; i < memberList.length; i++)
        {
            if (memberList[i].Id === userId)
            {
                return false;
            }
        }

        return true;
    }


    const addAdmin = async event =>
    {

        var tok = storage.retrieveToken();
        var obj = {login:adminName.value,jwtToken:tok};
        var js = JSON.stringify(obj);
        try
        {
            const response = await fetch(bp.buildPath('api/getuserid'),
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
            var txt = await response.text();
            var res = JSON.parse(txt);
            var retTok = res.jwtToken;
            storage.storeToken( retTok );

        }
        catch(e)
        {

        }

        // Clears text when user adds another user.
        setAdminError("");
        if (res.userId == undefined)
        {
            setAdminError("That user does not exist.");
            return;
        }

        if (!compareUserNames(res.userId))
        {
            setAdminError("That user is already in the group.");
            return;
        }

        if(res.userId == userId) //User cannot manually add themselves.
        {
            setAdminError("You will automatically be an admin on group creation.");
            return;
        }



        // Put the user in the admin list and display it.

        setAdminList([...adminList, {Name: res.Name, Id:res.userId}]);
    }


    const addMember = async event =>
    {

        var tok = storage.retrieveToken();
        var obj = {login:memberName.value,jwtToken:tok};
        var js = JSON.stringify(obj);
        try
        {
            const response = await fetch(bp.buildPath('api/getuserid'),
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
            var txt = await response.text();
            var res = JSON.parse(txt);
            var retTok = res.jwtToken;
            storage.storeToken( retTok );

        }
        catch(e)
        {

        }
        // Clears text when user adds another user.
        setMemberError("");

        if (res.userId == undefined)
        {
            setMemberError("That user does not exist.");
            return;
        }

        if (!compareUserNames(res.userId))
        {
            setMemberError("That user is already in the group.");
            return;
        }

        if(res.userId == userId) //User cannot manually add themselves.
        {
            setMemberError("You will automatically be an admin on group creation.");
            return;
        }

        // Put the user in the member list and display it.

        setMemberList([...memberList, {Name: res.Name, Id:res.userId}]);
    }


    const confirmDelete = async event =>
    {
        if(window.confirm("Are you sure you want to disband this group?"))
        {
            var tok = storage.retrieveToken();
            var obj = {groupId:props.groupId,jwtToken:tok};
            var js = JSON.stringify(obj);

            try
                {
                    const response = await fetch(bp.buildPath('api/deletegroup'),
                        {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
                    var txt = await response.text();
                    window.location.href = "/adminnedgroups";
                }
                    catch(e)
                    {
                        alert(e.toString());
                    }
        }
        else
        {
            return;
        }
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

            var tok = storage.retrieveToken();
            var obj = {groupId:props.groupId,groupName:groupName.value,groupDescription:groupDesc.value,groupAdmins:adminList,groupSubscribers:memberList,imageURL:groupPictureURL.value,jwtToken:tok};
            var js = JSON.stringify(obj);

            try
            {
                const response = await fetch(bp.buildPath('api/updategroup'),
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
                    setGroupSubmitResult("Successfully edited group! Redirecting to your groups.");
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

            <span class="inner-title">Update Group</span><br/>
            <button type="button" style={{width: "30%"}} class="buttons" onClick={() => window.location.href="/adminnedgroups"}>Back</button><br/>
            <br/>
            <button type="button" style={{width: "30%"}} class="buttons"  onClick={() => confirmDelete()}>Disband Group</button><br/>
            <br/>

            <span class="inner-title it_orange">Name</span><br />
            <p><i>Give the group a short, descriptive name.</i></p>
            <input type="text" defaultValue={groupName} ref={(c) => groupName = c}/>
            <span id="error-text">{nameError}</span> <br />
            <span class="inner-title it_orange"></span><br />


            <br/>
            <span class="inner-title it_yellow">Description</span><br />
            <p><i>Describe the group you're making; what will you do, when and where, who is invited, etc.</i></p>
            <textarea rows="7" cols= "40" maxLength="290" defaultValue={groupDesc} ref={(c) => groupDesc = c}></textarea>
            <span id="error-text">{descError}</span> <br />
            <span class="inner-title it_yellow"></span><br />

            <br/>
            <span class="inner-title it_green">Group Image</span><br />
            <p><i>Give a image to represent your group; this must be uploaded as a url.</i></p>
            <input type="text" id="location" defaultValue={groupPictureURL} ref={(c) => groupPictureURL = c} />
            <span id="error-text">{pictureError}</span> <br />
            <span class="inner-title it_green"></span><br />

            <br/>
            <span class="inner-title it_blue">Admins</span><br />
            <p><i>If you want to include other users as group admins, enter their usernames here.</i></p>
            <input type="text" ref={(c) => adminName = c} /><br />
            <button type="button" style={{width: "30%"}}
            class="buttons" onClick={addAdmin}>Add User as Admin</button>
            <span id="error-text">{adminError}</span> <br />
            <GroupUserList users={adminList} delFunc={removeAdmin}/>
            <span class="inner-title it_blue"></span><br />
            <br />

            <span class="inner-title it_purple">Invitees</span><br />
            <p><i>If you want to invite users as group attendees, enter their usernames here.</i></p>
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

export default EditGroupUI;