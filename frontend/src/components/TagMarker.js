import React from 'react';

function TagMarker(props)
{
    return(
        <div style={{fontSize: "15px", borderRadius:"30px"}}>
            <p>{props.txt}</p>
        </div>
    );
}

export default TagMarker;