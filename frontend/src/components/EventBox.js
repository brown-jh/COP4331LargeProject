import React from 'react';
import TagMarker from './TagMarker';

// This, when given the information regarding an event (name, related group, time, place, and list of tags)
// creates a box with all the relevant information.
// Props are name, group (if any), time, place, tags.
function EventBox(props)
{
    const clickThis = (title) =>
    {
        alert("Go to page for " + title);
    }

    return(
        <div style={{width:"30%", margin: "1%", border : "2px solid black", 
            backgroundColor: "#CCCCCC", float:"left"}} onClick={() => clickThis(props.title)}>
                
            <h1>{props.title}</h1>
            <h2>{props.group}</h2>
            <br/><br/>
            <h3>{props.time}</h3>
            <h3>{props.place}</h3>
            {/* For each tag in the list, generate a TagMarker with that tag in it.*/}
            {props.tags.map((tag) => (<TagMarker txt={tag}/>))}
        </div>
    );
}

export default EventBox;