import React, { useState } from 'react';

function FinishRegister(){ 
    
    var verificationCode;
    const [message, setMessage] = useState('');

    const completeRegister = async event =>     
    {    
        event.preventDefault();       

        var obj = {verification:verificationCode.value};
        alert("TODO: Send verification to API. Verification Code: " + obj.verification) 
        try        
        {

            // Ensures user doesn't enter an empty verification code.
            if (verificationCode.value == "")
            {
                setMessage("Please enter a valid verification code.");
                return;
            }
            
            //     // TODO: Check if verification code is incorrect.
            // if (res.error) 
            // {
            //     setMessage(res.error);
            // }
            else 
            {
                window.location.href = '/';
            }        
        }        
        catch(e)        
        {            
            setMessage(e.toString());         
            return;        
        }        
    };  

    return(      
        <div id="mainDiv">               
            <span class="inner-title">Complete Registration</span><br />    
            <span class="smaller-inner-title">An email has been sent. Please enter the six-digit verification code sent to your email below to complete account registration.</span><br />         
            <br /><input type="text" id="verificationCode" placeholder="Verification Code" 
                ref ={(c) => verificationCode = c} /><br />  
            
                <input type="submit" id="verify" class="buttons" value = "Verify"          
                    onClick={completeRegister} />

            <span id="error-text">{message}</span>
        </div>    
    );
};

export default FinishRegister;