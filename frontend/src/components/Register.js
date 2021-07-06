import React, { useState } from 'react';

function Register(){   

    var bp = require('./Path.js');
    var storage = require('../tokenStorage.js');
    
    var registerFirstName;
    var registerLastName;
    var registerUsername;
    var registerPassword;
    var registerPasswordCheck;
    const [message, setMessage] = useState('');

    const Register = async event =>     
    {    
        event.preventDefault();        
        var tok = storage.retrieveToken();       
        var obj = {firstName:registerFirstName.value, lastName:registerLastName.value, login:registerUsername.value, password:registerPassword.value,jwtToken:tok};      
        
        // Check if the inputs are valid.
        if (obj.firstName == "" || obj.lastName == "")
        {
            setMessage("Please include a first and last name.");
            return;
        }
        alert(registerPassword.value + " " + registerPasswordCheck.value);
        if (registerPassword.value != registerPasswordCheck.value)
        {
            setMessage("Passwords do not match.");
            return;
        }

        var passwdRegex = /^\w{8,}$/; // Matches a string of 8 or more alphanumerics.
        // Check if the password is valid.
        if (!passwdRegex.test(obj.password))
        {
            setMessage("Password must be 8 or more numbers, letters, or underscores.");
            return;
        }

        // Check if the username is long enough.
        var loginRegex = /^\w{5,}$/; // Matches a string of 5 or more alphanumerics.
        if (!loginRegex.test(obj.login))
        {
            setMessage("Username must be 5 or more numbers, letters, or underscores.");
            return;
        }

        // If everything is valid, we can continue to registering the new user.

        var js = JSON.stringify(obj);       
        try        
        {            
            const response = await fetch(bp.buildPath('api/adduser'),            
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
            var txt = await response.text();            
            var res = JSON.parse(txt);            
            if( res.error.length > 0 )            
            {                
                setMessage( "API Error:" + res.error );            
            }            
            else            
            {                
                setMessage('user has been added');            
                var retTok = res.jwtToken;
                storage.storeToken( retTok );
            }        
        }        
        catch(e)        
        {            
            setMessage(e.toString());        
        }
    };
    
    return(      
        <div id="loginDiv">               
            <span id="inner-title">REGISTER</span><br />        
            <input type="text" id="loginName" placeholder="First Name" 
                ref ={(c) => registerFirstName = c} /><br />
            <input type="text" id="loginName" placeholder="Last Name" 
                ref ={(c) => registerLastName = c} /><br />
            <input type="text" id="loginName" placeholder="Username" 
                ref ={(c) => registerUsername = c} /><br />        
            <input type="password" id="loginPassword" placeholder="Password" 
                ref ={(c) => registerPassword = c}/><br />
            <input type="password" id="loginPasswordCheck" placeholder="Confirm Password" 
                ref ={(c) => registerPasswordCheck = c}/><br />
            <input type="submit" id="registerButton" class="buttons" value = "Register"          
                onClick={Register} />
            <span id="registerResult">{message}</span>     
        </div>    
    );
};

export default Register;