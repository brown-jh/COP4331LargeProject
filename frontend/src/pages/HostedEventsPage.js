import React from 'react';

import PageTitle from '../components/PageTitle';
import HostedEvents from '../components/HostedEvents';

const HostedEventsPage = () =>{    
    return(      
        <div>        
            <PageTitle clickable={true} animated={false}/>          
        
            <HostedEvents />  
        </div>
    );
};

export default HostedEventsPage;