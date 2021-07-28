import React from 'react';
import ForgotPassword from '../components/ForgotPassword';

import PageTitle from '../components/PageTitle';

const ForgotPasswordPage = () =>{    
    return(        
        <div>            
            <PageTitle clickable={false} />        
    
            <ForgotPassword />         
        </div>    
    );
}

export default ForgotPasswordPage;