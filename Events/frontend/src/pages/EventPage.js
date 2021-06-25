import React from 'react';

import PageTitle from '../components/PageTitle';
import LoggedInName from '../components/LoggedInName';
import EventUI from '../components/EventUI';

const EventPage = () =>
{    
    return(        
        <div>            
            <PageTitle />            
            <LoggedInName />            
        <EventUI />        
        </div>    
        );
    }
export default EventPage;