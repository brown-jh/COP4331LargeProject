import React from 'react';
import { useParams } from "react-router-dom";
import PageTitle from '../components/PageTitle';
import GroupDisplay from '../components/GroupDisplay';

const GroupPage = () =>{    
    
    const {groupId} = useParams();  
    return(      
        <div>        
            <PageTitle />        
            <GroupDisplay groupId={groupId}/>  
        </div>
    );
};

export default GroupPage;