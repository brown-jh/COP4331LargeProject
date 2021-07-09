import React, { useState } from 'react';

import EventBox from '../components/EventBox';

const SearchPage = () =>{    

    var searchParams;
    const [searchResults, setSearchResults] = useState('');


    const searchEvents = async event =>
    {
        event.preventDefault();

        // Here, we would take searchParams and run a search based on it, but I'll make do with
        // some dummy results.

        const dummyEventList = [
            {
                title: "Sunday Practice for Orlando Tennis Club",
                group: "Women's Tennis Club of Orlando",
                time: "Sunday, April 23rd, 2:00 PM",
                place: "Big Win Gym, 4913 Greensteel Drive, Orlando, FL, 32828",
                tags: ["Sports", "Tennis", "Test Tag 1", "Test Tag 2", "Test Tag 3", "Very very long tag to check wrapping"]
            },
            {
                title: "Weekly D&D Night, Newcomers Welcome",
                group: "",
                time: "Friday, April 21st, 8:00 PM",
                place: "2123 Rose Lane, Orlando, FL, 32819",
                tags: ["Tabletop Games", "D&D", "Gaming"]
            },
            {
                title: "JavaScript Workshop",
                group: "Programming Club of UCF",
                time: "Wednesdy, April 26th, 3:00 PM",
                place: "Online",
                tags: ["Educational", "Programming", "JavaScript", "Online"]
            },
            {
                title: "Super Smash Bros Tournament - Cash Prizes",
                group: "NerdKnighteria of UCF",
                time: "Thursday, May 12th, 5:00 PM",
                place: "Online",
                tags: ["Super Smash Bros", "Gaming", "Competition", "Online"]
            },
            {
                title: "April Meeting of Jacaranda Book Club",
                group: "Jacaranda Book Club",
                time: "Saturday, April 6th, 1:00 PM",
                place: "4143 Woodmere Park Blvd, Venice, FL 34293",
                tags: ["Books", "Reading"]
            }
        ];

        //For each event in the results, make an EventBox for it, and put it all in searchResults.
        setSearchResults(dummyEventList.map((eventData) => (
            <EventBox title={eventData.title}
                group={eventData.group}
                time={eventData.time}
                place={eventData.place}
                tags={eventData.tags}/>)));
    }

    return(     
        <div>
            <input type="text" ref={(c) => searchParams = c} />
            <button type="button" class="buttons"
                onClick={searchEvents}> Search Card</button><br />
            <div id="searchResultDiv">{searchResults}</div>

        </div>
    );
};

export default SearchPage;