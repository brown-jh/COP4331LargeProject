import React from 'react';

// This, when given the information regarding an event (name, related group, time, and place),
// creates a box with all the relevant information.
// Props are name, group (if any), time, place.
function GroupBoxPreview(props)
{

    return(
            
        <div class="eventBox" style={{gridTemplateRows: '210px 260px 50px'}}>
                    <div class="eventBox-image" style={{backgroundImage: `url(${props.imageURL})`}}></div>
                    <div class="eventBox-text">
                        <span class="date" style={{color: 'rgb(66, 115, 248)'}}>{"GROUP"}</span>
                        <h2>{props.title}</h2>
                        <p>
                        {props.group}
                        </p>
                    </div>
                    <div class="eventBox-stats" style={{background: 'rgb(66, 115, 248)'}}>
                        <div class="stat groupborder">
                        </div>
                    </div>
                    </div>
    );
}

export default GroupBoxPreview;