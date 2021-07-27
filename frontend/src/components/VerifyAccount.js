import React, { useState, useEffect } from 'react';

function VerifyAccount(props){ 
    
    const [message, setMessage] = useState('');
    var bp = require('./Path.js');
    var storage = require('../tokenStorage.js');

    useEffect(() => {
        
        // Maybe change .value
        var obj = props.verifyId;
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
                        setMessage( "API Error:" + res.error );            
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

    // const completeRegister = async event =>     
    // {    
    //     event.preventDefault();    
        
    //     // Maybe change .value
    //     var tok = storage.retrieveToken();      
    //     var obj = {verfication:props.verifyId.value};        
    //     var js = JSON.stringify(obj);        

    //     // try        
    //     // {            
    //     //     const response = await fetch(bp.buildPath('api/adduser'),            
    //     //         {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
    //     //     var txt = await response.text();            
    //     //     var res = JSON.parse(txt);            
    //     //     if( res.error.length > 0 )            
    //     //     {                
    //     //         setMessage( "API Error:" + res.error );            
    //     //     }            
    //     //     else            
    //     //     {                
    //     //         setMessage('Registration successful. Welcome!');            
    //     //         var retTok = res.jwtToken;
    //     //         storage.storeToken( retTok );
    //     //         window.location.href = '/completeregister';
    //     //     }        
    //     // }        
    //     // catch(e)        
    //     // {            
    //     //     setMessage(e.toString());        
    //     // }
    // };  

    return(      
        <div id="mainDiv">               
            <span class="inner-title">{props.verifyId}</span><br />    
            <span id="error-text">{message}</span>
        </div>    
    );
};

export default VerifyAccount;