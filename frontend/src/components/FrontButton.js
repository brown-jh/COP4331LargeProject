import React from 'react';

function FrontButton(props)
{
    return(
        <div class="buttons btn-home">
            <p style={{userSelect:"none"}} onClick={props.clickAct}>{props.txt}</p>
        </div>
    )
}

export default FrontButton;