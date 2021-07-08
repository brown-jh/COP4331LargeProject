import React from 'react';

function TagMarker(props)
{
    return(
        <span style={{display: "inline", fontSize: "15px", backgroundColor: "#8080FF", border: "1px solid black", borderRadius:"15px"}}>
            {props.txt}
        </span>
    );
}

export default TagMarker;