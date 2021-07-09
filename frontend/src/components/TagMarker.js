import React from 'react';

// This SHOULD take a piece of text and return an HTML element with the text wrapped up in a colored bubble.
function TagMarker(props)
{
    return(
        <span style={{display: "inline", fontSize: "15px", backgroundColor: "#80FFFF", 
            border: "1px solid black", borderRadius:"15px"}}>
                
                {props.txt}
        </span>
    );
}

export default TagMarker;