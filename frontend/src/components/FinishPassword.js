import React, { useState } from 'react';

function FinishPassword(){ 
    
    var verificationCode;
    var newPassword;
    var newPasswordCheck;
    const [message, setMessage] = useState('');

    const completePasswordReset = async event =>     
    {    
        event.preventDefault();       

        var obj = {verification:verificationCode.value, newPass:newPassword.value, newPassCheck:newPasswordCheck.value};
        alert("TODO: Send verification to API. Verification Code: " + obj.verification + " New Password: " + obj.newPass) 
        try        
        {
            // Ensures user enter two identical passwords.
            if (newPassword.value != newPasswordCheck.value)
            {
                setMessage("Passwords do not match.");
                return;
            }      

            var passwdRegex = /^\w{8,}$/; // Matches a string of 8 or more alphanumerics.
            // Check if the password is valid.
            if (!passwdRegex.test(obj.newPass))
            {
                setMessage("Password must be 8 or more numbers, letters, or underscores.");
                return;
            }

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
                window.location.href = '/login';
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
            <span class="inner-title">Continue Password Reset</span><br />    
            <span class="smaller-inner-title">An email has been sent. Please enter the six-digit verification code sent to your email below, along with your new password to complete password reset.</span><br />         
            <br /><input type="text" id="verificationCode" placeholder="Verification Code" 
                ref ={(c) => verificationCode = c} /><br />  
                
                <input type="password" id="newPassword" placeholder="New Password" 
                    ref ={(c) => newPassword = c} /><br />
                
                <input type="password" id="newPasswordCheck" placeholder="Confirm New Password" 
                    ref ={(c) => newPasswordCheck = c} /><br />
                 
                <input type="submit" id="resetPassword" class="buttons" value = "Reset Password"          
                    onClick={completePasswordReset} />

            <span id="error-text">{message}</span>
        </div>    
    );
};

export default FinishPassword;