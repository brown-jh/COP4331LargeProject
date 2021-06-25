// import React from 'react';
import React, { useState } from 'react';

function EventUI()
{    
    var eventVariable = '';    
    var search = '';    
    
    const [message,setMessage] = useState('');    
    const [searchResults,setResults] = useState('');    
    const [eventList,setEventList] = useState('');

    const addEvent = async event =>     
    {    
        event.preventDefault();    
        alert('addEvent() ' + eventVariable.value);    
    };
   
    const searchEvent = async event =>     
    {        
        event.preventDefault();   
        alert('searchEvent() ' + search.value);    
    };    
    
    return (      
        <div id="eventUIDiv">         
            <br />       
            <input type="text" id="searchText" placeholder="Event To Search For" 
                ref={(c) => search = c} />       
            <button type="button" id="searchEventButton" class="buttons"            
                onClick={searchEvent}> Search Event </button><br />       
            <span id="eventSearchResult">{searchResults}</span>      
            <p id="eventList">{eventList}</p><br /><br />       
            <input type="text" id="eventText" placeholder="Event To Add" 
                ref={(c) => eventVariable = c} />       
            <button type="button" id="addEventButton" class="buttons"           
                onClick={addEvent}> Add Event </button><br />       
            <span id="eventAddResult">{message}</span>     
        </div>    
    );
}

export default EventUI;