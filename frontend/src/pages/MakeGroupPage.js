import React from 'react';

import PageTitle from '../components/PageTitle';
import MakeGroupUI from '../components/MakeGroupUI';

const MakeGroupPage = () =>{    
    return(      
        <div>        
            <PageTitle clickable={true} animated={false}/>          
        
            <MakeGroupUI />  
        </div>
    );
};

export default MakeGroupPage;