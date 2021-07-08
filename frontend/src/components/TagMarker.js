import React from 'react';

function TagMarker(props)
{
    return(
        <span style={{display: "inline", fontSize: "15px", backgroundColor: "#CCCCCC", border: "1px solid black", borderRadius:"15px"}}>
            {props.txt}
        </span>
    );
}

export default TagMarker;