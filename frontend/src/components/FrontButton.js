import React from 'react';

function FrontButton(props)
{
    return(
        <div style={{width: "40%", margin:"4%", float: "left", backgroundColor: "#89CFF0", 
            border: "2px solid orange", borderRadius: "10px"}}>

            <p style={{textAlign:"center"}} onClick={props.clickAct}>{props.txt}</p>
        </div>
    )
}

export default FrontButton;