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
    const [adminList, setAdminList] = useState('');
    const [memberError, setMemberError] = useState('');
    const [memberList, setMemberList] = useState('');
    const [groupSubmitResult, setGroupSubmitResult] = useState('');

    // This function is used in the map to turn a user into a visible entry.
    function makeUserEntry(userName)
    {
        return(
            <div>
                <p>{userName}</p>
                <button type="button" onClick={alert("TODO: Remove " + {userName})}>Remove</button>
            </div>
        )
    }

    const addAdmin = async event =>
    {
        // Check if the username is long enough. TODO: Do API call to check if user exists.
        var loginRegex = /^\w{5,}$/; // Matches a string of 5 or more alphanumerics.
        if (!loginRegex.test(adminName.value))
        {
            setAdminError("That user does not exist.");
            return;
        }

        // Put the user in the admin list and display it.
        admins.push(adminName.value); 
        setAdminList(admins.map(makeUserEntry));
    }

    const addMember = async event =>
    {
        // Check if the username is long enough. TODO: Do API call to check if user exists.
        var loginRegex = /^\w{5,}$/; // Matches a string of 5 or more alphanumerics.
        if (!loginRegex.test(memberName.value))
        {
            setAdminError("That user does not exist.");
            return;
        }

        // Put the user in the admin list and display it.
        members.push(memberName.value);
        setMemberList(members.map(makeUserEntry));
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
            setGroupSubmitResult("Information missing; check above.");
        }
        else
        {
            alert("Name: " + groupName.value + "\nDescription: " + groupDesc.value + 
            "\nAdmins: " + admins.toString() + "\nMembers: " + members.toString() + 
            "TODO: Add current user as admin, call API, cleanup after");
        }
    }

    return(
        <div>
            <span class="inner-title">Create Group</span><br/><br/>

            <p>Give the group a short, descriptive name.</p>
            <input type="text" ref={(c) => groupName = c} />
            <span id="error-text">{nameError}</span> <br /> 

            <p>Describe the group you're making: what will you do, when and where, who is invited, etc.</p>
            <textarea rows="8" cols= "40" ref={(c) => groupDesc = c} />
            <span id="error-text">{descError}</span> <br /> 

            <p>If you want to include other users as group admins, enter their names here.</p>
            <input type="text" ref={(c) => adminName = c} />
            <button type="button" onClick={addAdmin}>Add User as Admin</button>
            <p>{adminError}</p>
            {adminList}

            <p>If you want to invite users as group attendees, enter their names here.</p>
            <input type="text" ref={(c) => memberName = c} />
            <p>{memberError}</p>
            <button type="button" onClick={addMember}>Add User as Member</button>
            {memberList}

            <button type="button" onClick={submitGroup}>Submit</button>
            <p>{groupSubmitResult}</p>
        </div> 
    )
}

export default MakeGroupUI;