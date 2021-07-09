import React from 'react';

function FrontButton(props)
{
    return(
        <div style={{width: "40%", height: "20%", margin:"5%", float: "left", backgroundColor: "#89CFF0", 
            border: "2px solid orange", borderRadius: "25px"}}>

            <p style={{textAlign:"center"}} onClick={props.clickAct}>{props.txt}</p>
        </div>
    )
}

export default FrontButton;