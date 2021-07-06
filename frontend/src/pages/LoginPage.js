import React from 'react';

import PageTitle from '../components/PageTitle';
import Login from '../components/Login';
import Login from '../components/Register';

const LoginPage = () =>{    
    return(      
        <div>        
            <PageTitle />        
            <Login />
            <Register />      
        </div>
    );
};

export default LoginPage;