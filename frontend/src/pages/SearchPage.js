import React from 'react';

import PageTitle from '../components/PageTitle';
import Search from '../components/Search';

const SearchPage = () =>{    
    return(      
        <div>        
            <PageTitle clickable={true} animated={false}/>          
        
            <Search />  
        </div>
    );
};

export default SearchPage;