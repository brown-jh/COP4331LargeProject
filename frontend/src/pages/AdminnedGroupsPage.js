import React from 'react';

import PageTitle from '../components/PageTitle';
import AdminnedGroups from '../components/AdminnedGroups';

const AdminnedGroupsPage = () =>{    
    return(      
        <div>        
            <PageTitle clickable={true} animated={false}/>          
        
            <AdminnedGroups />  
        </div>
    );
};

export default AdminnedGroupsPage;