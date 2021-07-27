import React, { useState } from 'react';

function ForgotPassword(){ 
    
    var emailcheck;
    const [message, setMessage] = useState('');

    const doPasswordReset = async event =>     
    {    
        event.preventDefault();       

        var obj = {email:emailcheck.value};
        try        
        {
            // Ensures user cannot enter in empty email.
            if (obj.emailcheck == "")
            {
                setMessage("Please include your email.");
                return;
            }      

            // Found some random email regex.
            var emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            if(!emailRegex.test(obj.emailcheck))
            {
                setMessage("Please enter a valid email.");
                return;
            }
            else 
            {
                var bp = require('./Path.js');
                var js = JSON.stringify(obj);  
                var res;      
                try        
                    {            
                        const response = await fetch(bp.buildPath('api/forgotpassword'),            
                            {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
                        var txt = await response.text();   
                        res = JSON.parse(txt);   
                        if( res.error.length > 0 )            
                        {                
                            setMessage( "Email Error: " + res.error );            
                        }       
                        else            
                        {                
                            setMessage('Password reset email sent.');            
                            window.location.href = '/';
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
            <span class="inner-title">Password Reset</span><br />    
            <span class="smaller-inner-title">Please enter your email to send a verification code to reset your password.</span><br />         
            <br /><input type="text" id="email" placeholder="Email" 
                ref ={(c) => email = c} /><br />   
             <input type="submit" id="passwordReset" class="buttons" value = "Send Verification Email"          
                onClick={doPasswordReset} />

            <span id="error-text">{message}</span>
            <span class="smaller-inner-title">Already have an account?<a href={'/login'}> Log in.</a></span><br />    
        </div>    
    );
};

export default ForgotPassword;