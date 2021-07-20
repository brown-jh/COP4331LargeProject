import React from 'react';

import PageTitle from '../components/PageTitle';
import EventDisplay from '../components/EventDisplay';

const EventPage = () =>{    
    return(      
        <div>        
            <PageTitle />        
            <EventDisplay eventId={this.props.params.id}/>  
        </div>
    );
};

export default EventPage;