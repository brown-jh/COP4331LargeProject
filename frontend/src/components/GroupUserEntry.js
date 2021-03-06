import React from 'react';

function GroupUserEntry(props)
{
    return(
        <div>
        <p class="group-remove">{props.name}</p>
        <i class="fa fa-trash-o fa-color" aria-hidden="true" 
            onClick={() => props.iconAct(props.id)}></i>
        </div>
    )
}

export default GroupUserEntry;