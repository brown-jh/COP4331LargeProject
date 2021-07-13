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
        <div onClick={() => clickThis(props.title)}>
            
            <div class="eventBox">
                        {/* Placeholder Image */}
                        <div class="eventBox-image" style={{background: `url("https://media.istockphoto.com/photos/tennis-rackets-and-balls-leaned-against-the-net-picture-id1171084311?k=6&m=1171084311&s=612x612&w=0&h=9-NQ0etpeyIdqmpa1eK1D1Kal8yruIIsimRM38UbkYM=")`, backgroundSize: "cover" }}></div>
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
        </div>
    );
}

export default EventBox;