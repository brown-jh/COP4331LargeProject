import React, {useState } from 'react';
import GroupBoxPreview from './GroupBoxPreview';


function MakeGroupUI()
{
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

    //This function removes a specific entry from one of the div arrays.
    // We would use filter(), but it was misbehaving for some reason.
    function removeEntry (userArray, removeKey)
    {
        var newArray = []; //The modified array we will return.
        for (var i = 0; i < userArray.length; i++)
        {
            alert("Comparing " + userArray[i].key + " to " + removeKey);
            if (userArray[i].key !== removeKey)
            {
                newArray.push(userArray[i]);
                alert("Added");
            }
            else
            {
                alert("Entry removed");
            }
        }
        return newArray;
    }

    // This function is called to remove a user from the admin or member list.
    function removeUser(userName, userList)
    {
        alert("Remove " + userName + " from " + userList);
        if (userList == "adminList")
        {
            alert("If this shows up, we have the newest code.");
            setAdminList(removeEntry(adminList, userName));
        }
        else if (userList == "memberList")
        {
            setMemberList(removeEntry(memberList, userName));
        }
    }

    // This function is used in the map to turn a user into a visible entry.
    function makeUserEntry(userName, userList)
    {
        return(
            <div key={userName}>
                <p class="group-remove">{userName}</p>
                <i class="fa fa-trash-o fa-color" aria-hidden="true" 
                    onClick={() => removeUser(userName, userList)}></i>
            </div>
        )
    }

    // This function determines if there is already an admin or invitee with the same name.
    function compareUserNames(userName)
    {
        for(var i = 0; i < adminList.length; i++)
        {
            if (adminList[i].key === userName)
            {
                return false;
            }
        }

        for(var i = 0; i < memberList.length; i++)
        {
            if (memberList[i].key === userName)
            {
                return false;
            }
        }

        return true;
    }


    const addAdmin = async event =>
    {
        // Check if the username is long enough. TODO: Do API call to check if user exists and get ID.
        var loginRegex = /^\w{5,}$/; // Matches a string of 5 or more alphanumerics.

        // Clears text when user adds another user.
        setAdminError("");
        if (!loginRegex.test(adminName.value))
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
        setAdminList( adminList => [...adminList, makeUserEntry(adminName.value, "adminList")]);
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

        if (!compareUserNames(memberName.value))
        {
            setMemberError("That user is already in the group.");
            return;
        }

        // Put the user in the member list and display it.
        setMemberList( memberList => [...memberList, makeUserEntry(memberName.value, "memberList")]);
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
            alert("Name: " + groupName.value + "\nDescription: " + groupDesc.value + 
            "\nAdmins: " + adminList.map(admin => admin.key) + "\nMembers: " + 
            memberList.map(member => member.key) + 
            "\nTODO: Add current user as admin, call API, cleanup after");

            setGroupSubmitResult("Successfully created group! Redirecting to your groups.");
            window.location.href = "/adminnedgroups";
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
            {adminList}
            <span class="inner-title it_blue"></span><br />
            <br />

            <span class="inner-title it_purple">Invitees</span><br />
            <p><i>If you want to invite users as group attendees, enter their names here.</i></p>
            <input type="text" ref={(c) => memberName = c} /><br />
            <button type="button" style={{width: "30%"}} 
            class="buttons" onClick={addMember}>Invite User</button>
            <span id="error-text">{memberError}</span> <br /> 
            {memberList}
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
