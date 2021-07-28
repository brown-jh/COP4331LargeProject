import React from 'react';

import PageTitle from '../components/PageTitle';
import Register from '../components/Register';

const RegisterPage = () =>{    
    return(      
        <div>        
            <PageTitle clickable={false} />        
        
            <Register />      
        </div>
    );
};

export default RegisterPage;