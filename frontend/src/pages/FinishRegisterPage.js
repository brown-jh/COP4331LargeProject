import React from 'react';
import FinishRegister from '../components/FinishRegister';

import PageTitle from '../components/PageTitle';

const FinishRegisterPage = () =>{    
    return(        
        <div>            
            <PageTitle clickable={false} animated={false}/>          
    
            <FinishRegister />         
        </div>    
    );
}

export default FinishRegisterPage;