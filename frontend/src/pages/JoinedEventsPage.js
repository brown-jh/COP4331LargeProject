import React from 'react';

import PageTitle from '../components/PageTitle';
import JoinedEvents from '../components/JoinedEvents';

const JoinedEventsPage = () =>{    
    return(      
        <div>        
            <PageTitle clickable={true} />        
        
            <JoinedEvents />  
        </div>
    );
};

export default JoinedEventsPage;