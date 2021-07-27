import React, { useState } from 'react';

function FinishPassword(props){ 
    
    var newPassword;
    var newPasswordCheck;
    const [message, setMessage] = useState('');

    const completePasswordReset = async event =>     
    {    
        event.preventDefault();       

        var obj = {newPass:newPassword.value, newPassCheck:newPasswordCheck.value};
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
            else 
            {
                var bp = require('./Path.js');
                var object = {resetLink:props.passwordId, newPassword:newPassword.value}
                var js = JSON.stringify(object);  
                var res;      
                try        
                    {            
                        const response = await fetch(bp.buildPath('api/resetpassword'),            
                            {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
                        var txt = await response.text();   
                        res = JSON.parse(txt);   
                        if( res.error.length > 0 )            
                        {                
                            setMessage( "Password Error: " + res.error );            
                        }       
                        else            
                        {                
                            setMessage('Password successfully reset.');            
                            window.location.href = '/login';
                        }     
                    }        
                    catch(e)        
                    {            
                        alert(e.toString());      
                    }
                }
            return;
                   
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
            <span class="smaller-inner-title">Please enter your new password to complete your password reset.</span><br />         
            <br />
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