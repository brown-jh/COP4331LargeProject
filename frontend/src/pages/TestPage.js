import React from 'react';

import EventBox from '../components/EventBox';

const TestPage = () =>{    
    return(     
        <div>
            <div>        
                <EventBox title={"Sunday Practice for Orlando Tennis Club"} 
                    group={"Women's Tennis Club of Orlando"}
                    time={"Sunday, April 23rd, 2:00 PM"}
                    place={"Big Win Gym, 4913 Greensteel Drive, Orlando, FL, 32828"}
                    tags={["Sports", "Tennis", "Test Tag 1", "Test Tag 2", "Test Tag 3", "Very very long tag to check wrapping"]} />
            </div>
            <div>        
                <EventBox title={"Sunday Practice for Orlando Tennis Club"} 
                    group={"Women's Tennis Club of Orlando"}
                    time={"Sunday, April 23rd, 2:00 PM"}
                    place={"Big Win Gym, 4913 Greensteel Drive, Orlando, FL, 32828"}
                    tags={["Sports", "Tennis", "Test Tag 1", "Test Tag 2", "Test Tag 3", "Very very long tag to check wrapping"]} />
            </div>
            <div>        
                <EventBox title={"Sunday Practice for Orlando Tennis Club"} 
                    group={"Women's Tennis Club of Orlando"}
                    time={"Sunday, April 23rd, 2:00 PM"}
                    place={"Big Win Gym, 4913 Greensteel Drive, Orlando, FL, 32828"}
                    tags={["Sports", "Tennis", "Test Tag 1", "Test Tag 2", "Test Tag 3", "Very very long tag to check wrapping"]} />
            </div>
            <div>        
                <EventBox title={"Sunday Practice for Orlando Tennis Club"} 
                    group={"Women's Tennis Club of Orlando"}
                    time={"Sunday, April 23rd, 2:00 PM"}
                    place={"Big Win Gym, 4913 Greensteel Drive, Orlando, FL, 32828"}
                    tags={["Sports", "Tennis", "Test Tag 1", "Test Tag 2", "Test Tag 3", "Very very long tag to check wrapping"]} />
            </div>
        </div>
    );
};

export default TestPage;