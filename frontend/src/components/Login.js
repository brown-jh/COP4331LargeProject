import React, { useState } from 'react';

function Login(){   

    var bp = require('./Path.js');
    var storage = require('../tokenStorage.js');
    
    var loginName;
    var loginPassword;
    const [message, setMessage] = useState('');

    const gotoRegister = async event =>
    {
        window.location.href = '/register';
    }

    const doLogin = async event =>     
    {        
        event.preventDefault();       
        
        var obj = {login:loginName.value,password:loginPassword.value};        
        var js = JSON.stringify(obj);        
        try        
        {
            const response = await fetch(bp.buildPath('api/login'),
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            var storage = require('../tokenStorage.js');
		    var txt = await response.text();
            var res = JSON.parse(txt);              
            if (res.error) 
            {
                setMessage(res.error);//'User/Password combination incorrect');
            }
            else 
            {
                storage.storeToken(res);
                var jwt = require('jsonwebtoken');

                var ud = jwt.decode(storage.retrieveToken(),{complete:true});
                var userId = ud.payload.userId;
                var firstName = ud.payload.firstName;
                var lastName = ud.payload.lastName;
              
                var user = {firstName:firstName,lastName:lastName,id:userId}
                localStorage.setItem('user_data', JSON.stringify(user));
                window.location.href = '/cards';
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
            <span id="inner-title">Log in</span><br />        
            <input type="text" id="loginName" placeholder="Username" 
                ref ={(c) => loginName = c} /><br />        
            <input type="password" id="loginPassword" placeholder="Password" 
                ref ={(c) => loginPassword = c}/><br />
            <input type="submit" id="loginButton" class="buttons" value = "Log in"          
                onClick={doLogin} />
            <span id="error-text">{message}</span> <br /> 
            <span id="smaller-inner-title">Not registered with us yet?<a href={'/register'}> Sign up.</a></span><br />
            <span id="smaller-inner-title"><a href={'/register'}>Forgot your password?</a></span><br />
            
        </div>    
    );
};

export default Login;