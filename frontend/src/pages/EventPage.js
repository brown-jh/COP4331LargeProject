import React from 'react';
import { useParams } from "react-router-dom";
import PageTitle from '../components/PageTitle';
import EventDisplay from '../components/EventDisplay';

const EventPage = () =>{ 

    const {eventId} = useParams();  
    return(      
        <div>        
            <PageTitle clickable={true} animated={false}/>          
        
            <EventDisplay eventId={eventId}/>  
        </div>
    );
};

export default EventPage;