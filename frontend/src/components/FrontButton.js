import React from 'react';

function FrontButton(props)
{
    return(
        <div class="buttons btn_home">
            <p style={{textAlign:"center", userSelect:"none"}} onClick={props.clickAct}>{props.txt}</p>
        </div>
    )
}

export default FrontButton;