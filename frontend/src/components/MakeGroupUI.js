import React, {useState } from 'react';

function MakeGroupUI()
{
    var groupName = '';
    var groupDesc = '';
    var adminName = '';
    var memberName = '';
    var admins = [];
    var members = [];

    const [nameError, setNameError] = useState('');
    const [descError, setDescError] = useState('');
    const [adminError, setAdminError] = useState('');
    const [adminList, setAdminList] = useState([]);
    const [memberError, setMemberError] = useState('');
    const [memberList, setMemberList] = useState([]);
    const [groupSubmitResult, setGroupSubmitResult] = useState('');

    // This function is used in the map to turn a user into a visible entry.
    function makeUserEntry(userName)
    {
        return(
            <div>
                <p class="group-remove">{userName}</p>
                <i class="fa fa-trash-o fa-color" aria-hidden="true" onClick={() => alert("TODO: Remove " + {userName})}></i>
            </div>
        )
    }
    

    const addAdmin = async event =>
    {
        // Check if the username is long enough. TODO: Do API call to check if user exists.
        var loginRegex = /^\w{5,}$/; // Matches a string of 5 or more alphanumerics.

        // Clears text when user adds another user.
        setAdminError("");
        if (!loginRegex.test(adminName.value))
        {
            setAdminError("That user does not exist.");
            return;
        }

        // Put the user in the admin list and display it.
        setAdminList( admins => [...admins, makeUserEntry(adminName.value)]);
    }

    const addMember = async event =>
    {
        // Check if the username is long enough. TODO: Do API call to check if user exists.
        var loginRegex = /^\w{5,}$/; // Matches a string of 5 or more alphanumerics.
        
        // Clears text when user adds another user.
        setMemberError("");
        if (!loginRegex.test(memberName.value))
        {
            setMemberError("That user does not exist.");
            return;
        }

        // Put the user in the admin list and display it.
        setMemberList( members => [...members, makeUserEntry(memberName.value)]);
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

        //Notify the user of any errors, otherwise submit.
        if (isError)
        {
            setGroupSubmitResult("Information missing or invalid; check above.");
        }
        else
        {
            alert("Name: " + groupName.value + "\nDescription: " + groupDesc.value + 
            "\nAdmins: " + adminList + "\nMembers: " + memberList + 
            "\nTODO: Add current user as admin, call API, cleanup after");
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
            <textarea rows="8" cols= "40" ref={(c) => groupDesc = c} />
            <span id="error-text">{descError}</span> <br /> 
            <span class="inner-title it_yellow"></span><br />

            <br/>
            <span class="inner-title it_green">Admins</span><br />
            <p><i>If you want to include other users as group admins, enter their names here.</i></p>
            <input type="text" ref={(c) => adminName = c} /><br />
            <button type="button" style={{width: "30%"}} 
            class="buttons" onClick={addAdmin}>Add User as Admin</button>
            <span id="error-text">{adminError}</span> <br /> 
            {adminList}
            <span class="inner-title it_green"></span><br />
            <br />

            <span class="inner-title it_blue">Invitees</span><br />
            <p><i>If you want to invite users as group attendees, enter their names here.</i></p>
            <input type="text" ref={(c) => memberName = c} /><br />
            <button type="button" style={{width: "30%"}} 
            class="buttons" onClick={addMember}>Invite User</button>
            <span id="error-text">{memberError}</span> <br /> 
            {memberList}
            <span class="inner-title it_blue"></span><br />


            <button type="button" style={{width: "50%"}} 
            class="buttons" onClick={submitGroup}>Submit</button>
            <span class="smaller-inner-title">Please make sure to review your group before you submit!</span><br />
            <div><span id="error-text">{groupSubmitResult}</span> <br /> </div>
        </div> 
    )
}

export default MakeGroupUI;