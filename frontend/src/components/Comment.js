import React from 'react';


function Comment(props)
{
    // Generates a random color to use for the user icon.
    var randomColor = Math.floor(Math.random()*16777215).toString(16);

    return(
        <div class="comments">
            <p style={{fontSize: "22px"}}><i class="fa fa-user-circle userIcon" style={{color: "#" + randomColor}} 
                aria-hidden="true"></i> <b>{props.comment.User}<p class="date">{props.comment.Date}</p></b></p>
            <p style={{fontSize: "20px", paddingBottom: "10px"}}>{props.comment.Text}</p>
        </div>
    )
}

export default Comment;