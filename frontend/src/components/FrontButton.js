import React from 'react';

function FrontButton(props)
{
    return(
        <div>
            <button type="button" style={{width: "50%", height: "70px", marginBottom: "3%"}} class="buttons" onClick={props.clickAct}>{props.txt}</button>
        </div>
    )
}

export default FrontButton;