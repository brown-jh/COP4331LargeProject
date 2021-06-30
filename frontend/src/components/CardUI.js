import React, { useState } from 'react';

function CardUI(){

    var bp = require('./Path.js');

    var card = '';
    var search = '';

    const [message, setMessage] = useState('');
    const [searchResults, setResults] = useState('');
    const [cardList, setCardList] = useState('');

    var _ud = localStorage.getItem('user_data');
    var ud = JSON.parse(_ud);
    var userId = ud.id;
    var firstName = ud.firstName;
    var lastName = ud.lastName;



    const addCard = async event =>
    {
        event.preventDefault();
        var obj = {userId:userId,card:card.value};
        var js = JSON.stringify(obj);
        try
        {   alert("Alert before line 29");
            const response = await fetch(bp.buildPath('api/addcard'),
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}}); alert("Alert after line 29 and before line 31");
            var txt = await response.text();  alert("Breaking JSON is " + txt);
            var res = JSON.parse(txt);  alert("Alert after line 32");
            if( res.error.length > 0 )
            {
                alert("Alert! API Error");
                setMessage( "API Error:" + res.error );
            }
            else
            {
                setCardList(cardList + ", " + card.value);
                alert("Alert! Card has been added");
                setMessage('Card has been added');            
            }
        }
        catch(e)
        {
            alert("Alert! We're having an issue in the catch block");
            setMessage(e.toString());
        }
    };

    const searchCard = async event =>
    {
        event.preventDefault();
        var obj = {userId:userId,search:search.value};
        var js = JSON.stringify(obj);
        try
        {
            const response = await fetch(bp.buildPath('api/searchcards'),
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
            var txt = await response.text();
            var res = JSON.parse(txt);
            var _results = res.results;
            var resultText = '';
            for( var i=0; i<_results.length; i++ )
            {
                resultText += _results[i];
                if( i < _results.length - 1 )
                {
                    resultText += ', ';
                }
            }
            setResults('Card(s) have been retrieved');
            setCardList(resultText);
        }
        catch(e)
        {
            alert(e.toString());
            setResults(e.toString());
        }
    };

    return(
        <div id="cardUIDiv">  <br />
            <input type="text" id="searchText" placeholder="Card To Search For"
                ref={(c) => search = c} />
            <button type="button" id="searchCardButton" class="buttons"
                onClick={searchCard}> Search Card</button><br />
            <span id="cardSearchResult">{searchResults}</span>
            <p id="cardList">{cardList}</p><br /><br />
            <input type="text" id="cardText" placeholder="Card To Add"
                ref={(c) => card = c} />
            <button type="button" id="addCardButton" class="buttons"
                onClick={addCard}> Add Card </button><br />
            <span id="cardAddResult">{message}</span>
        </div>
    );
}

export default CardUI;
