import React from 'react';


function PageTitle(props){   
    return(     
        <h1 id="title" >
            {
                props.clickable
                ? <a style={{textDecoration: "none", color: "#f75555"}} href="/home">- Get2Gather -</a>
                : "- Get2Gather -"
            }
        </h1>   
    );
};

export default PageTitle;