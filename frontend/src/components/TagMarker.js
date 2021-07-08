import React from 'react';

function TagMarker(props)
{
    return(
        <span style={{display: "inline-block", fontSize: "15px", color: "#CCCCCC", border: "1px solid black", borderRadius:"15px"}}>
            <p>{props.txt}</p>
        </span>
    );
}

export default TagMarker;