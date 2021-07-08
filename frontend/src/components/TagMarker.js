import React from 'react';

function TagMarker(props)
{
    return(
        <div style={{display: "inline-block", fontSize: "15px", height: "30px", borderRadius:"15px", borderStyle: "solid", borderColor: "#000000"}}>
            <p>{props.txt}</p>
        </div>
    );
}

export default TagMarker;