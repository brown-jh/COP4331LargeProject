import React from 'react';

import PageTitle from '../components/PageTitle';
import Login from '../components/Login';

const LoginPage = () =>{    
    return(      
        <div>        
            <PageTitle clickable={false} animated={true}/>          
            <Login />  
        </div>
    );
};



export default LoginPage;