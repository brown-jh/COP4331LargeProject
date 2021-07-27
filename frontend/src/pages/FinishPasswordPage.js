import React from 'react';
import { useParams } from "react-router-dom";
import FinishPassword from '../components/FinishPassword';

import PageTitle from '../components/PageTitle';

const FinishPasswordPage = () =>{ 
    const {passwordId} = useParams();    
    return(        
        <div>            
            <PageTitle />    
            <FinishPassword />         
        </div>    
    );
}

export default FinishPasswordPage;