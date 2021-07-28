import React from 'react';

import PageTitle from '../components/PageTitle';
import JoinedGroups from '../components/JoinedGroups';

const JoinedGroupsPage = () =>{    
    return(      
        <div>        
            <PageTitle clickable={true} />        
        
            <JoinedGroups />  
        </div>
    );
};

export default JoinedGroupsPage;