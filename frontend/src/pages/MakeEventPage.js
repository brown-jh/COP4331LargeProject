import React from 'react';

import PageTitle from '../components/PageTitle';
import EventMakeUI from '../components/EventMakeUI';

const MakeEventPage = () =>{    
    return(      
        <div>        
            <PageTitle clickable={true} animated={false}/>          
        
            <EventMakeUI />  
        </div>
    );
};

export default MakeEventPage;