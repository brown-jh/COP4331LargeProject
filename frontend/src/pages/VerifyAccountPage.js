import React from 'react';
import { useParams } from "react-router-dom";
import VerifyAccount from '../components/VerifyAccount';

import PageTitle from '../components/PageTitle';

const VerifyAccountPage = () =>{    
    const {verifyId} = useParams(); 
    return(        
        <div>            
            <PageTitle />    
            <VerifyAccount verifyId={verifyId}/>         
        </div>    
    );
}

export default VerifyAccountPage;