import React from 'react';

function TagMarker(props)
{
    return(
        <span style={{fontSize: "15px", borderRadius:"30px", borderStyle: "solid", borderColor: "#000000"}}>
            <p>{props.txt}</p>
        </span>
    );
}

export default TagMarker;