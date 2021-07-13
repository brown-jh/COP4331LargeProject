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
        <div class="eventBox" 
            onClick={() => clickThis(props.title)}>
            
            {/* Placeholder photo */}
            <img src="/images/download.png" class="imgresponsive eventpic"/>
            <h4>{props.title}</h4>
            <p class="event">{props.group}</p>
            <span class="inner-title it_orange"></span>
            <p class="event">{props.time}</p>
            <p class="event">{props.place}</p>
        </div>
    );
}

export default EventBox;