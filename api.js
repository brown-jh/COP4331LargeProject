exports.setApp = function (app, client)
{
    var token = require('./createJWT.js');

    app.post('/api/addcard', async (req, res, next) =>{  
        // incoming: userId, color  
        // outgoing: error  
        var error = '';  

        const { userId, card, jwtToken } = req.body;      
        try      
        {        
            if( token.isExpired(jwtToken))        
            {          
                var r = {error:'The JWT is no longer valid', jwtToken: ''};          
                res.status(200).json(r);          
                return;        
            }      
        }      
        catch(e)      
        {        
            console.log(e.message);      
        }

        
        const newCard = {Card:card,UserId:userId};  
        var error = '';  
        
        try  
        {    
            const db = client.db();    
            const result = db.collection('Cards').insertOne(newCard);  
        }  
        catch(e)  
        {    
            error = e.toString();  
        }

        var refreshedToken = null;      
        try      
        {        
            refreshedToken = token.refresh(jwtToken);      
        }      
        catch(e)      
        {        
            console.log(e.message);      
        }      
        var ret = { error: error, jwtToken: refreshedToken };      
        res.status(200).json(ret);
    });

    app.post('/api/adduser', async (req, res, next) =>{  
        // incoming: FirstName, LastName, Login, Password 
        // outgoing: error  
        var error = '';  

        const { firstName, lastName, login, password, jwtToken } = req.body;      
        try      
        {        
            if( token.isExpired(jwtToken))        
            {          
                var r = {error:'The JWT is no longer valid', jwtToken: ''};          
                res.status(200).json(r);          
                return;        
            }      
        }      
        catch(e)      
        {        
            console.log(e.message);      
        }

        
        const newUser = {FirstName:firstName, LastName:lastName, Login:login, Password:password};  
        var error = '';  
        
        try  
        {    
            const db = client.db();    
            const result = db.collection('Users').insertOne(newUser);  
        }  
        catch(e)  
        {    
            error = e.toString();  
        }

        var refreshedToken = null;      
        try      
        {        
            refreshedToken = token.refresh(jwtToken);      
        }      
        catch(e)      
        {        
            console.log(e.message);      
        }      
        var ret = { error: error, jwtToken: refreshedToken };      
        res.status(200).json(ret);
    });

    app.post('/api/addevent', async (req, res, next) =>{  
        // incoming: EventName, EventDescription, EventDate, EventTime, EventLocation
        // outgoing: error  
        var error = '';  

        const { eventName, eventDescription, eventDate, eventTime, eventLocation, jwtToken } = req.body;      
        try      
        {        
            if( token.isExpired(jwtToken))        
            {          
                var r = {error:'The JWT is no longer valid', jwtToken: ''};          
                res.status(200).json(r);          
                return;        
            }      
        }      
        catch(e)      
        {        
            console.log(e.message);      
        }

        
        const newEvent = {EventName:eventName, EventDescription:eventDescription, EventDate:eventDate, EventTime:eventTime, EventLocation:eventLocation};  
        var error = '';  
        
        try  
        {    
            const db = client.db();    
            const result = db.collection('Events').insertOne(newEvent);  
        }  
        catch(e)  
        {    
            error = e.toString();  
        }

        var refreshedToken = null;      
        try      
        {        
            refreshedToken = token.refresh(jwtToken);      
        }      
        catch(e)      
        {        
            console.log(e.message);      
        }      
        var ret = { error: error, jwtToken: refreshedToken };      
        res.status(200).json(ret);
    });

    app.post('/api/searchevents', async (req, res, next) => {  
        // incoming: userId(will be implemented later), search  
        // outgoing: results[], error  
        var error = '';  
        const { userId, search, jwtToken } = req.body;    
        try      
        {        
            if( token.isExpired(jwtToken))        
            {          
                var r = {error:'The JWT is no longer valid', jwtToken: ''};          
                res.status(200).json(r);          
                return;        
            }      
        }      
        catch(e)      
        {        
            console.log(e.message);      
        }

        var _search = search.trim();  

        const db = client.db();  
        const results = await db.collection('Events').find({"Event":{$regex:_search+'.*', $options:'r'}}).toArray();

        var _ret = [];  
        for( var i=0; i<results.length; i++ )  
        {    
            _ret.push( results[i].Event );  
        }

        var refreshedToken = null;      
        try      
        {        
            refreshedToken = token.refresh(jwtToken);      
        }      
        catch(e)      
        {        
            console.log(e.message);      
        }      
        var ret = { results:_ret, error: error, jwtToken: refreshedToken };      
        res.status(200).json(ret);

    });

    app.post('/api/removeuser', async (req, res, next) =>{  
        // incoming: _id 
        // outgoing: error  
        var error = '';  

        const { id, jwtToken } = req.body;      
        try      
        {        
            if( token.isExpired(jwtToken))        
            {          
                var r = {error:'The JWT is no longer valid', jwtToken: ''};          
                res.status(200).json(r);          
                return;        
            }      
        }      
        catch(e)      
        {        
            console.log(e.message);      
        }

        
        const user_id = {_id:id};  
        var error = '';  
        
        try  
        {    
            const db = client.db();    
            const result = db.collection('Users').removeOne(user_id);  
        }  
        catch(e)  
        {    
            error = e.toString();  
        }

        var refreshedToken = null;      
        try      
        {        
            refreshedToken = token.refresh(jwtToken);      
        }      
        catch(e)      
        {        
            console.log(e.message);      
        }      
        var ret = { error: error, jwtToken: refreshedToken };      
        res.status(200).json(ret);
    });
    
    app.post('/api/login', async (req, res, next) => 
    {  
        // incoming: login, password  
        // outgoing: id, firstName, lastName, error  
        var error = '';  
        const { login, password } = req.body;  

        const db = client.db();  
        const results = await db.collection('Users').find({Login:login,Password:password}).toArray();

        var id = -1;  
        var fn = '';  
        var ln = '';  
        if( results.length > 0 )  
        {    
            id = results[0].UserId;    
            fn = results[0].FirstName;    
            ln = results[0].LastName;  
            try        
            {          
                const token = require("./createJWT.js");          
                ret = token.createToken( fn, ln, id );        
            }        
            catch(e)        
            {          
                ret = {error:e.message};        
            }      
        }      
        else      
        {          
            ret = {error:"Login/Password incorrect"};      
        }
        res.status(200).json(ret);
    });
    
    app.post('/api/searchcards', async (req, res, next) => {  
        // incoming: userId, search  
        // outgoing: results[], error  
        var error = '';  
        const { userId, search, jwtToken } = req.body;    
        try      
        {        
            if( token.isExpired(jwtToken))        
            {          
                var r = {error:'The JWT is no longer valid', jwtToken: ''};          
                res.status(200).json(r);          
                return;        
            }      
        }      
        catch(e)      
        {        
            console.log(e.message);      
        }

        var _search = search.trim();  

        const db = client.db();  
        const results = await db.collection('Cards').find({"Card":{$regex:_search+'.*', $options:'r'}}).toArray();

        var _ret = [];  
        for( var i=0; i<results.length; i++ )  
        {    
            _ret.push( results[i].Card );  
        }

        var refreshedToken = null;      
        try      
        {        
            refreshedToken = token.refresh(jwtToken);      
        }      
        catch(e)      
        {        
            console.log(e.message);      
        }      
        var ret = { results:_ret, error: error, jwtToken: refreshedToken };      
        res.status(200).json(ret);

    });
}
