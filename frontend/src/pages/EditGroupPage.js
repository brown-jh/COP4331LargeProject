import React from 'react';
import { useParams } from "react-router-dom";
import PageTitle from '../components/PageTitle';
import EditGroupUI from '../components/EditGroupUI';

const EditGroupPage = () =>{ 

    const {groupId} = useParams();  
    return(      
        <div>        
            <PageTitle clickable={true} />        
        
            <EditGroupUI groupId={groupId}/>  
        </div>
    );
};

export default EditGroupPage;