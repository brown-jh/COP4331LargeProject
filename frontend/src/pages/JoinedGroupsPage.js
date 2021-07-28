import React from 'react';

import PageTitle from '../components/PageTitle';
import JoinedGroups from '../components/JoinedGroups';

const JoinedGroupsPage = () =>{    
    return(      
        <div>        
            <PageTitle clickable={true} animated={false}/>          
        
            <JoinedGroups />  
        </div>
    );
};

export default JoinedGroupsPage;