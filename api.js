exports.setApp = function (app, client)
{
    var token = require('./createJWT.js');
    const nodemailer = require('nodemailer');


    // This is for NODEMAILER, I put it at the top because it probably
    // won't work
    // (If it does, remove this)
    app.post('/api/sendemail', async (req, res, next) =>{

        var error = '';
        const { email } = req.body;
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user:'cop4331get2gather@gmail.com',
                pass: 'COP4331Group25!'
            }
        });
        
        var message = {
            from: "cop4331get2gather@gmail.com",
            to:email,
            
            subject:'Account Verification for Get2Gather',
            text:'Yes let us verify you with this: jkbfkhbad'
            
        };

        transporter.sendMail(message, function(error, response){
            if (error) {
                console.log(error);
            }
            else
            {
                console.log("Email sent: " + response.response);
                res.status(200).json({error: error});
            }
            //error ? console.log(error) : console.log(response);
            transporter.close();
        });

        

    });

    app.post('/api/adduser', async (req, res, next) =>{  
        // incoming: FirstName, LastName, Login, Password 
        // outgoing: error  
        var error = '';  

        const { firstName, lastName, login, password } = req.body;      
        
        const newUser = {FirstName:firstName, LastName:lastName, Login:login, Password:password};  
        var error = '';  
        
        const db = client.db();  
        // This should ensure that only one of any username exists.
        const results = await db.collection('Users').find({ Login:login }).toArray();
        if (results.length > 0)
        {
            error = "Username already exists";
            var ret = { error: error };
            res.status(409).json(ret);
        }
        else 
        {
            try  
            {       
                const result = db.collection('Users').insertOne(newUser);  
            }  
            catch(e)  
            {    
                error = e.toString();  
            }
         
            var ret = { error: error };      
            res.status(200).json(ret);

        }
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

        
        const newEvent = {EventName:eventName, EventDescription:eventDescription, 
            EventDate:eventDate, EventTime:eventTime, EventLocation:eventLocation};  
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

    app.post('/api/deleteevent', async (req, res, next) =>{
        // Taking in userId and eventId, deletes the corresponding event (if they're the creator)
        // We aren't actually storing the event creator right now, so this will just delete
        // Ideally this will change
        
        var error = '';
        const {eventId, jwtToken } = req.body;
        

        try
        {
            if ( token.isExpired(jwtToken))
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

        try
        {
            const db = client.db();
            const result = await db.collection('Events').deleteOne( {_id:eventId});
        }
        catch(e)
        {
            console.log(e.toString());
        }

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

    app.post('/api/updateevent', async (req, res, next) =>{  
        // Takes in the eventId, and all of the attributes of the event
        // (Currently just the event's name, description, date, time, and location)
        // returns an error and a refreshed token
        var error = '';  

        const {eventId, eventName, eventDescription, eventDate, eventTime, eventLocation, jwtToken } = req.body;      
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
  
        var error = '';  
        
        try  
        {    
            const db = client.db();    
            const result = db.collection('Events').updateOne(
                {_id:eventId},
                {
                    $set: {EventName: eventName, EventDescription: eventDescription, 
                        EventDate: eventDate, EventTime: eventTime, EventLocation: eventLocation}

                }
            )  
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
        const results = await db.collection('Events').find({$or: [ { "EventName": {$regex:_search+'.*i', $options:'ir'} }, {"EventDescription": {$regex:_search+'.*i', $options:'ir'} } ] }).toArray();

        var _ret = [];  
        for( var i=0; i<results.length; i++ )  
        {    
            _ret.push( results[i]);  
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
            ret = {error:"Login/Password incorrect."};      
        }
        res.status(200).json(ret);
    });
}

app.post('/api/deletegroup', async (req, res, next) =>{
    
    var error = '';
    const {groupId, jwtToken } = req.body;
    

    try
    {
        if ( token.isExpired(jwtToken))
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

    try
    {
        const db = client.db();
        const result = await db.collection('Events').deleteOne( {_id:groupId});
    }
    catch(e)
    {
        console.log(e.toString());
    }

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