import React from 'react';
import { useParams } from "react-router-dom";
import PageTitle from '../components/PageTitle';
import EditEventUI from '../components/EditEventUI';

const EditEventPage = () =>{ 

    const {eventId} = useParams();  
    return(      
        <div>        
            <PageTitle clickable={true} />        
        
            <EditEventUI eventId={eventId}/>  
        </div>
    );
};

export default EditEventPage;