import React from 'react';
import TagMarker from './TagMarker';

// Props are name, group (if any), time, place, tags.
function EventBox(props)
{
    const clickThis = (title) =>
    {
        alert("Go to page for " + title);
    }

    return(
        <div style={{width:"30%", border : "2px solid black", backgroundColor: "#CCCCCC"}} onClick={() => clickThis(props.title)}>
            <h1>{props.title}</h1><br/>
            <h2>{props.group}</h2><br/>
            <br/>
            <h3>{props.time}</h3><br/>
            <h3>{props.place}</h3><br/>
            {props.tags.map((tag) => (<TagMarker txt={tag}/>))}
        </div>
    );
}

export default EventBox;