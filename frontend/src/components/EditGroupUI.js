import React, {useState, useEffect} from 'react';

import GroupBoxPreview from './GroupBoxPreview';
import GroupUserList from '../components/GroupUserList';


function EditGroupUI(props)
{
    const [groupName, setGroupName] = useState('');
    const [groupDesc, setGroupDesc] = useState('');
    const [groupPictureURL, setGroupPictureURL] = useState('');

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

        //TODO: get the group with this ID via API.

        var thisGroup={
            name: "NerdKnighteria of UCF",
            description: "This club is for people at UCF interested in board and video games; we meet Tuesdays at 5 in the Student Union.",
            url: "https://i.ticketweb.com/i/00/09/57/08/29_Original.jpg?v=6",
            admins: ["John Smith", "Alyx Reckahn", "Hannah Wrigley"],
            members: ["Jesse Sampson", "Louis Ferguson", "Isabelle Bathory"]
        };

        setGroupName(thisGroup.name + "\n" + props.groupId);
        setGroupDesc(thisGroup.desc);
        setGroupPictureURL(thisGroup.url);
        setAdminList(thisGroup.admins);
        setMemberList(thisGroup.members);
    });

    function updateName(event)
    {
        event.preventDefault();
        setNameError(event.target.value);
        setGroupName(event.target.value);
    }

    function updateDesc(event)
    {
        event.preventDefault();
        setDescError(event.target.value);
        setGroupDesc(event.target.value);
    }

    function updateURL(event)
    {
        event.preventDefault();
        setPictureError(event.target.value);
        setGroupPictureURL(event.target.value);
    }

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

    function removeAdmin(name)
    {
        setAdminList(adminList.filter(user => user !== name));
    }

    function removeMember(name)
    {
        setMemberList(memberList.filter(user => user !== name));
    }

    // This function determines if there is already an admin or invitee with the same name.
    function compareUserNames(userName)
    {
        for(var i = 0; i < adminList.length; i++)
        {
            if (adminList[i] === userName)
            {
                return false;
            }
        }

        for(var i = 0; i < memberList.length; i++)
        {
            if (memberList[i] === userName)
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
        setAdminList([...adminList, adminName.value]);
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
        setMemberList([...memberList, memberName.value]);
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
            alert("New data for group " + props.groupId + "\nName: " + groupName.value + 
            "\nDescription: " + groupDesc.value + "\nAdmins: " + adminList + 
            "\nMembers: " + memberList + "\nTODO: Call API, cleanup after");

            setGroupSubmitResult("Successfully edited group! Redirecting to your groups.");
            window.location.href = "/adminnedgroups";
        }
    }

    return(
        <div id="mainDiv" style={{width: "60%"}}>
            <span class="inner-title">Create Group</span><br/><br/>
            <button type="button" onClick={() => window.location.href="/joinedgroups"}>Cancel</button>

            <span class="inner-title it_orange">Name</span><br />
            <p><i>Give the group a short, descriptive name.</i></p>
            <input type="text" value={groupName} onChange={updateName} />
            <span id="error-text">{nameError}</span> <br /> 
            <span class="inner-title it_orange"></span><br />


            <br/>
            <span class="inner-title it_yellow">Description</span><br />
            <p><i>Describe the group you're making; what will you do, when and where, who is invited, etc.</i></p>
            <textarea rows="7" cols= "40" maxLength="290" value={groupDesc} onChange={updateDesc} />
            <span id="error-text">{descError}</span> <br /> 
            <span class="inner-title it_yellow"></span><br />

            <br/>
            <span class="inner-title it_green">Group Image</span><br />
            <p><i>Give a image to represent your group; this must be uploaded as a url.</i></p>
            <input type="text" id="location" value={groupPictureURL} onChange={updateURL} />
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
            <button type="button" 
                onClick={() => alert("TODO: Delete group " + props.groupId)}>Disband Group</button>
        </div> 
    )
}

export default EditGroupUI;