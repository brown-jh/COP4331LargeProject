import React from 'react';

function TagMarker(props)
{
    return(
        <div style={{display: "inline-block", fontSize: "15px", borderRadius:"30px", borderStyle: "solid", borderColor: "#000000"}}>
            <p>{props.txt}</p>
        </div>
    );
}

export default TagMarker;