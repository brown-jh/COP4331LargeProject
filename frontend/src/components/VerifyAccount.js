import React, { useState, useEffect } from 'react';

function VerifyAccount(props){ 
    
    const [message, setMessage] = useState('');
    var bp = require('./Path.js');

    useEffect(() => {
        
        var obj = {verificationLink:props.verifyId};
        var js = JSON.stringify(obj);  
        var res;
        const fetchdata = async () => 
            {
            try        
                {            
                    const response = await fetch(bp.buildPath('api/verifyaccount'),            
                        {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
                    var txt = await response.text();   
                    res = JSON.parse(txt);   
                    if( res.error.length > 0 )            
                    {                
                        setMessage( "Registration Error: " + res.error );            
                    }       
                    else            
                    {                
                        setMessage('Verification Successful. Welcome!');            
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
            <span class="inner-title">{"Verify Account"}</span><br />
            <span class="smaller-inner-title">Attempting to verify your account, please wait...</span><br />         

            <br /><span id="error-text">{message}</span>
        </div>    
    );
};

export default VerifyAccount;