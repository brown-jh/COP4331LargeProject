import React, { useState } from 'react';

function ForgotPassword(){ 
    
    var email;
    const [message, setMessage] = useState('');

    const doPasswordReset = async event =>     
    {    
        event.preventDefault();       

        var obj = {emailcheck:email.value};
        alert("TODO: Reset Password. Email to reset : " + obj.emailcheck) 
        try        
        {
            // Ensures user cannot enter in empty email.
            if (obj.emailcheck == "")
            {
                setMessage("Please include your email.");
                return;
            }      
            
            //     // TODO: Possibly check if email exists, if not send an error saying email not found.
            // if (res.error) 
            // {
            //     setMessage(res.error);
            // }
            else 
            {
                // Successfully sends verification code to email and redirects to page to enter it.
                window.location.href = '/resetpassword';
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