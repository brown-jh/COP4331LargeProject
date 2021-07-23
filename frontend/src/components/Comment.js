import React from 'react';

function Comment(props)
{
    return(
        <div style={{borderRadius: "5px", backgroundColor: "#cccccc"}}>
            <p>{props.comment.user}</p>
            <br />
            <p>{props.comment.text}</p>
        </div>
    )
}

export default Comment;