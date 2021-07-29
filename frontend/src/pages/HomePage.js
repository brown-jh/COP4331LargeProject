import React from 'react';

import PageTitle from '../components/PageTitle';
import Home from '../components/Home';

const HomePage = () =>{    
    return(      
        <div>        
            <PageTitle clickable={true} animated={false}/>          
        
            <Home />  
        </div>
    );
};

export default HomePage;