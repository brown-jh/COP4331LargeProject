import React from 'react';
import GroupUserEntry from '../components/GroupUserEntry';


function GroupUserList(props)
{
    return(
        <div>
            {props.users.map(user => <GroupUserEntry name={user.Name} id={user.Id} 
                iconAct={props.delFunc}/>)}
        </div>
    )
}

export default GroupUserList;