import React, { useState, useEffect } from 'react';

function NewLink(props){ 
    
    const [message, setMessage] = useState('');
    var bp = require('./Path.js');

    useEffect(() => {
        
        var obj = {email:props.email};
        var js = JSON.stringify(obj);  
        var res;
        const fetchdata = async () => 
            {
            try        
                {            
                    const response = await fetch(bp.buildPath('api/refreshauth'),            
                        {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
                    var txt = await response.text();   
                    res = JSON.parse(txt);   
                    if( res.error.length > 0 )            
                    {                
                        setMessage( "Email Error:" + res.error );            
                    }       
                    else            
                    {                
                        setMessage('New email sent.');            
                        window.location.href = '/';
                    }     
                }        
                catch(e)        
                {            
                    alert(e.toString());      
                }
            }

            fetchdata();
        
        return;

    },[]);

    return(      
        <div id="mainDiv">               
            <span class="inner-title">{"Resend Email"}</span><br />
            <span class="smaller-inner-title">Attempting to send new email, please wait...</span><br />         

            <br /><span id="error-text">{message}</span>
        </div>    
    );
};

export default NewLink;