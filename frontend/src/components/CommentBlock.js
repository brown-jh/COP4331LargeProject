import React, {useState} from 'react';
import Comment from '../components/Comment';

function CommentBlock(props)
{
    var newComment = '';

    return(
        <div>
            {props.comments.map(commentElement => <Comment comment={commentElement} />)}
            <textarea rows="7" cols= "40" maxLength="290" ref={(c) => newComment = c} />
            <button type="button" style={{width: "50%"}} 
            class="buttons" onClick={() => props.submitCommand(newComment.value)}>Comment</button>
        </div>
    )
}

export default CommentBlock;