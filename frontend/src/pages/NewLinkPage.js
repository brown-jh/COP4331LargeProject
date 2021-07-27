import React from 'react';
import { useParams } from "react-router-dom";
import NewLink from '../components/NewLink';

import PageTitle from '../components/PageTitle';

const NewLinkPage = () =>{    
    const {email} = useParams(); 
    return(        
        <div>            
            <PageTitle />    
            <NewLink email={email}/>         
        </div>    
    );
}

export default NewLinkPage;