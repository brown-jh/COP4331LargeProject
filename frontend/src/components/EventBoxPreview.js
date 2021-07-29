import React from 'react';

// This, when given the information regarding an event (name, related group, time, and place),
// creates a box with all the relevant information.
// Props are name, group (if any), time, place.
function EventBoxPreview(props)
{

    return(
            
        <div class="eventBox">
                    <div class="eventBox-image" style={{backgroundImage: `url(${props.imageURL})`}}></div>
                    <div class="eventBox-text">
                        <span class="date">{props.time}</span>
                        <h2>{props.title}</h2>
                        <p>
                        {props.group}
                        </p>
                    </div>
                    <div class="eventBox-stats">
                        <div class="stat border">
                        </div>
                        <div class="stat">
                        <div class="value">{props.place}</div>
                        <div class="type">{"Location"}</div>
                        </div>
                    </div>
                    </div>
    );
}

export default EventBoxPreview;