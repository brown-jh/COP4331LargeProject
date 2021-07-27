import React, { useState } from 'react';

function FinishRegister(){ 
    
    var verificationCode;
    const [message, setMessage] = useState('');

    return(      
        <div id="mainDiv">               
            <span class="inner-title">Complete Registration</span><br />    
            <span class="smaller-inner-title">An email has been sent. Please allow up to 24 hours for your registration email to be received. We look forward to having you!</span><br />         
            <br /><span class="smaller-inner-title"><a href={'/login'}>Return to Log in.</a></span><br />    

        </div>    
    );
};

export default FinishRegister;