const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

var eventList = 
[
    'Pool Party',
    'Chess Practice',
    'FGC Tourney',
    'Mock UN Trial',
    'Anime Watch Together'
];

app.use((req, res, next) => 
{
    res.setHeader('Access-Control-Allow-Origin', '*');  
    res.setHeader
    (     
        'Access-Control-Allow-Headers',  
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );  
    res.setHeader
    (    
        'Access-Control-Allow-Methods',    
        'GET, POST, PATCH, DELETE, OPTIONS'  
    );  
    next();
});

app.listen(5000); // start Node + Express server on port 5000

app.post('/api/addevent', async (req, res, next) =>
{  
    // incoming: userId, color  
    // outgoing: error  var error = ''; 

    const { userId, event } = req.body;  

    // TEMP FOR LOCAL TESTING.  
    eventList.push( event );  

    var ret = { error: error };  
    res.status(200).json(ret);}
    
);

app.post('/api/login', async (req, res, next) => 
{  
    // incoming: login, password  
    // outgoing: id, firstName, lastName, error  
    
    var error = '';  
    
    const { login, password } = req.body;  
    
    var id = -1;  
    var fn = '';  
    var ln = '';  
    
    if( login.toLowerCase() == 'eventmanager' && password == 'COP4331' )  
    {    
        id = 1;    
        fn = 'Event';    
        ln = 'Manager';  
    }  
    else  
    {    
        error = 'Invalid user name/password';  
    }  

    var ret = { id:id, firstName:fn, lastName:ln, error:error};  
    res.status(200).json(ret);
});

app.post('/api/searchevents', async (req, res, next) => 
{  
    // incoming: userId, search  
    // outgoing: results[], error  
    
    var error = '';  
    
    const { userId, search } = req.body;  
    var _search = search.toLowerCase().trim();  
    var _ret = [];  
    
    for( var i = 0; i < eventList.length; i++ )  
    {    
        var lowerFromList = eventList[i].toLocaleLowerCase();    
        if( lowerFromList.indexOf( _search ) >= 0 )    
        {      
            _ret.push( eventList[i] );    
        }  
    }  
    
    var ret = {results:_ret, error:''};  
    res.status(200).json(ret);
});





