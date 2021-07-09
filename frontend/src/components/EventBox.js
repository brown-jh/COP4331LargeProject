import React from 'react';

// This, when given the information regarding an event (name, related group, time, and place),
// creates a box with all the relevant information.
// Props are name, group (if any), time, place.
function EventBox(props)
{
    const clickThis = (title) =>
    {
        alert("Go to page for " + title);
    }

    return(
        <div style={{width:"80%", margin: "10%", border : "2px solid black"}} 
            onClick={() => clickThis(props.title)}>
                
            <h3>{props.title}</h3>
            <p>{props.group}</p>
            <br/><br/>
            <p>{props.time}</p>
            <p>{props.place}</p>
        </div>
    );
}

export default EventBox;