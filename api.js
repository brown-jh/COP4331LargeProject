exports.setApp = function (app, client)
{
    // Potentially a bad idea
    var bp = require('./frontend/src/components/Path.js');

    var sendEmail = require('./sendEmail.js');
    var authcode = require('./createAuth.js');
    const jwt = require("jsonwebtoken");

    var token = require('./createJWT.js');
    const nodemailer = require('nodemailer');
    var mongo = require('mongodb');


    // This is for NODEMAILER, I put it at the top because it probably
    // won't work
    // (If it does, remove this)
    
    // OK I am moving this function elsewhere, it sorta kinda works.
    /*
    app.post('/api/sendemail', async (req, res, next) =>{

        var error = '';
        const { email, authentication } = req.body;
        var text = "Your verification code is: ";
        text += authentication;
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
            text:text
            
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

    */

    app.post('/api/searcheventid', async (req, res, next) => {  
        // incoming: userId(will be implemented later), search  
        // outgoing: results[], error  
        var error = '';  
        const {search, jwtToken } = req.body;    
        try      
        {        
            if( token.isExpired(jwtToken))        
            {          
                var r = {error:'The JWT is no longer valid.', jwtToken: ''};          
                res.status(200).json(r);          
                return;        
            }      
        }      
        catch(e)      
        {        
            console.log(e.message);      
        }

        var _search =search.trim();  

        var o_id = new mongo.ObjectID(search);

        const db = client.db(); 
        const results = await db.collection('Events').find({_id:o_id}).toArray();

        var _ret = [results[0]];  
        //for( var i=0; i<results.length; i++ )  
        //{    
        //    _ret.push( results[i]);  
        //}

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

    app.post('/api/searchgroupid', async (req, res, next) => {  
 
        var error = '';  
        const {search, jwtToken } = req.body;    
        try      
        {        
            if( token.isExpired(jwtToken))        
            {          
                var r = {error:'The JWT is no longer valid.', jwtToken: ''};          
                res.status(200).json(r);          
                return;        
            }      
        }      
        catch(e)      
        {        
            console.log(e.message);      
        }

        var _search =search.trim();  

        var o_id = new mongo.ObjectID(search);

        const db = client.db(); 
        const results = await db.collection('Groups').find({_id:o_id}).toArray();

        var _ret = [results[0]];  
        //for( var i=0; i<results.length; i++ )  
        //{    
        //    _ret.push( results[i]);  
        //}

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

    app.post('/api/addgroup', async (req, res, next) =>{  
        // incoming: GroupName, GroupDescription
        // outgoing: error  
        var error = '';  
        var name = '';
        var grouphost = '';
    
        const { groupname, groupDescription, groupAdmins, groupSubscribers, imageURL, jwtToken } = req.body;      
        jwt.verify(jwtToken, process.env.ACCESS_TOKEN_SECRET, function(err, decodeData)
        {
            if (err)
            {
                var r = {error: 'The JWT is no longer valid.', jwtToken: ''};
                return res.status(401).json(r);
            }
            name += decodeData.firstName;
            name += ' "';
            name += decodeData.username;
            name += '" ';
            name += decodeData.lastName;
            grouphost = decodeData.userId;
            //console.log(eventhost);
        })
        
        groupAdmins.push({Name:name, Id:grouphost});
        
        const newGroup = {GroupName:groupname, GroupDescription:groupDescription, GroupAdmins:groupAdmins,
            GroupSubscribers:groupSubscribers, ImageURL:imageURL};  
        var error = '';  
        
        try  
        {    
            const db = client.db();    
            const result = db.collection('Groups').insertOne(newGroup);  
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

        const { firstName, lastName, login, password, email } = req.body; 
        
        
        
        const newUser = {FirstName:firstName, LastName:lastName, Login:login, Password:password, 
        Email:email, AuthStatus:0};  
        var error = ''; 

        // Changed, no longer required
        //var obj = {email:email, authentication:verificationCode};
        //var js = JSON.stringify(obj);

        const db = client.db();  
        // This should ensure that only one of any username exists.
        var results = await db.collection('Users').find({ Email:email }).toArray();
        if (results.length > 0)
        {
            error = "Email is already in use.";
            var ret = { error: error};
            res.status(409).json(ret);
        }
        else
        {
            results = await db.collection('Users').find({ Login:login }).toArray();
            if (results.length > 0)
            {
                error = "Username already exists.";
                var ret = { error: error };
                res.status(409).json(ret);
            }
            else 
            {
                try  
                {       
                    db.collection('Users').insertOne(newUser, (err, response) =>
                    {
                        const verificationCode = jwt.sign({_id: response.ops[0]._id}, process.env.VERIFICATION_KEY, {expiresIn: '20m'});
                        db.collection('Users').updateOne(
                            {_id:response.ops[0]._id},
                            {
                                $set: {Authentication: verificationCode}
                            }
                        );
                        var message = "Hey, welcome to Get2Gather! Verify your account here: https://cop4331-eventmanager.herokuapp.com/verifyaccount/";
                        message += verificationCode;
                        message += "\n\n Link expired? Go here to obtain a new link: https://cop4331-eventmanager.herokuapp.com/newlink/";
                        message += email;
                        const checking = sendEmail.sendEmail(email, "Welcome to Get2Gather!", message);
                    });
                    //const weirdres = await db.collection('Users').findOne({Login:login});
                    //const verificationCode = jwt.sign({_id: weirdres._id}, process.env.VERIFICATION_KEY, {expiresIn: '20m'});
                    //const test = await db.collection('Users').updateOne(
                    //    {_id:weirdres._id},
                    //    {
                    //        $set: {Authentication: verificationCode}
                    //    }
                    //);
                    //var message = "Verify your account here: https://cop4331-eventmanager.herokuapp.com/verifyaccount/";
                    //message += verificationCode;
                    //message += "\n\n Link expired? Go here to obtain a new link: https://cop4331-eventmanager.herokuapp.com/newlink/";
                    //message += email;
                    //const checking = sendEmail.sendEmail(email, "Welcome to Get2Gather!", message);  
                }  
                catch(e)  
                {    
                    error = e.toString();  
                }
                // THIS HERE SEEMS TERRIBLE
                // BE WARY, THIS IS PROBABLY A BAD IDEA
                // TURNS OUT THIS WAS A BAD IDEA, so I'll fix it
                /*const response = await fetch(bp.buildPath('api/sendemail'),            
                    {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
    
                */

                var ret = { error: error };      
                res.status(200).json(ret);
    
            } 
        }


    });

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
            var o_id = new mongo.ObjectID(groupId);

            const db = client.db();
            const result = await db.collection('Groups').deleteOne( {_id:o_id});
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

    app.post('/api/addevent', async (req, res, next) =>{  
        // incoming: EventName, EventDescription, EventDate, EventTime, EventLocation
        // outgoing: error  
        var error = '';  
        var name = '';
        var eventhost = '';

        const { eventname, eventDescription, eventtime, eventLocation, groupID, imageURL, jwtToken } = req.body;

        jwt.verify(jwtToken, process.env.ACCESS_TOKEN_SECRET, function(err, decodeData)
        {
            if (err)
            {
                var r = {error: 'The JWT is no longer valid.', jwtToken: ''};
                return res.status(401).json(r);
            }
            name += decodeData.firstName;
            name += ' "';
            name += decodeData.username;
            name += '" ';
            name += decodeData.lastName;
            eventhost = decodeData.userId;
            //console.log(eventhost);
        })

        const comm = [];
        const newEvent = {EventName:eventname, EventDescription:eventDescription, 
                            EventTime: new Date(eventtime), EventLocation:eventLocation,GroupID:groupID,EventHosts:[{Name:name, Id:eventhost}],EventAttendees:[{Name:name, Id:eventhost}],ImageURL:imageURL,Comments:comm};  
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
            var o_id = new mongo.ObjectID(eventId);

            const db = client.db();
            const result = await db.collection('Events').deleteOne( {_id:o_id});
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

        const {eventId, eventName, eventDescription, eventTime, eventLocation, imageURL, jwtToken } = req.body;      
        try      
        {        
            if( token.isExpired(jwtToken))        
            {          
                var r = {error:'The JWT is no longer valid.', jwtToken: ''};          
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
                        EventTime: eventTime, EventLocation: eventLocation, ImageURL:imageURL}

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

    app.post('/api/searchgroups', async (req, res, next) => {  
 
        var error = '';  
        const { userId, search, jwtToken } = req.body;    
        try      
        {        
            if( token.isExpired(jwtToken))        
            {          
                var r = {error:'The JWT is no longer valid.', jwtToken: ''};          
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
        const results = await db.collection('Groups').find({$or: [ { "GroupName": {$regex:_search+'.*',$options:'i'} }, {"GroupDescription": {$regex:_search+'.*',$options:'i'} } ] }).toArray();

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

    app.post('/api/searchgroupadmins', async (req, res, next) => {  
 
        var error = '';  
        const { search, jwtToken } = req.body;    
        try      
        {        
            if( token.isExpired(jwtToken))        
            {          
                var r = {error:'The JWT is no longer valid.', jwtToken: ''};          
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
        const results = await db.collection('Groups').find({ "GroupAdmins.Id": _search }).toArray();

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

    app.post('/api/searcheventhost', async (req, res, next) => {  
 
        var error = '';  
        const { search, jwtToken } = req.body;    
        try      
        {        
            if( token.isExpired(jwtToken))        
            {          
                var r = {error:'The JWT is no longer valid.', jwtToken: ''};          
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
        const results = await db.collection('Events').find({ "EventHosts.Id": _search }).toArray();

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

    app.post('/api/subtoevent', async (req, res, next) =>
    {
        var error = '';
        var userId;
        var name = "";
        const {eventId, jwtToken} = req.body;
        jwt.verify(jwtToken, process.env.ACCESS_TOKEN_SECRET, function(err, decodedData)
        {
            if(err)
            {
                error = "Invalid token.";
                return res.status(401).json({error:error});
            }
            
            name += decodedData.firstName;
            name += ' "';
            name += decodedData.username;
            name += '" ';
            name += decodedData.lastName;
            userId = decodedData.userId;
        })

        const db = client.db();
        var o_id = new mongo.ObjectID(eventId);
        const results = await db.collection('Events').find(
            {_id:o_id, EventAttendees:{Name:name, Id:userId}}
        ).count();
        if (results > 0)
        {
            error = "User already in event";
            return res.status(401).json({error:error});
        }

        const result =  await db.collection('Events').updateOne(
            {_id:o_id},
            {$push:{EventAttendees:{Name:name, Id:userId}}}
        );
        return res.status(200).json({error:error, FullName:name});



    });
    app.post('/api/unsubevent', async (req, res, next) =>
    {
        var error = '';
        var userId;
        var name = "";
        const {eventId, jwtToken} = req.body;
        jwt.verify(jwtToken, process.env.ACCESS_TOKEN_SECRET, function(err, decodedData)
        {
            if(err)
            {
                error = "Invalid token.";
                return res.status(401).json({error:error});
            }
            
            name += decodedData.firstName;
            name += ' "';
            name += decodedData.username;
            name += '" ';
            name += decodedData.lastName;
            userId = decodedData.userId;
        })

        const db = client.db();
        var o_id = new mongo.ObjectID(eventId);
        const result =  await db.collection('Events').updateOne(
            {_id:o_id},
            {$pull:{EventAttendees:{Name:name, Id:userId}}}
        );
        return res.status(200).json({error:error});



    });
    app.post('/api/subtogroup', async (req, res, next) =>
    {
        var error = '';
        var name = '';

        var userId;
        const {groupId, jwtToken} = req.body;
        jwt.verify(jwtToken, process.env.ACCESS_TOKEN_SECRET, function(err, decodedData)
        {
            if(err)
            {
                error = "Invalid token.";
                return res.status(401).json({error:error});
            }
            
            name += decodedData.firstName;
            name += ' "';
            name += decodedData.username;
            name += '" ';
            name += decodedData.lastName;
            userId = decodedData.userId;
        })
        const db = client.db();
        
        const results = await db.collection('Groups').find(
            {_id:o_id, GroupSubscribers:{Name:name, Id:userId}}
        ).count();

        if (results > 0)
        {
            error = "User already in group";
            return res.status(401).json({error:error});
        }

        
        var o_id = new mongo.ObjectID(groupId);
        const result =  await db.collection('Groups').updateOne(
            {_id:o_id},
            {$push:{GroupSubscribers:{Name:name, Id:userId}}}
        );
        return res.status(200).json({error:error, FullName:name});



    });
    app.post('/api/unsubgroup', async (req, res, next) =>
    {
        var error = '';
        var name = '';

        var userId;
        const {groupId, jwtToken} = req.body;
        jwt.verify(jwtToken, process.env.ACCESS_TOKEN_SECRET, function(err, decodedData)
        {
            if(err)
            {
                error = "Invalid token.";
                return res.status(401).json({error:error});
            }
            
            name += decodedData.firstName;
            name += ' "';
            name += decodedData.username;
            name += '" ';
            name += decodedData.lastName;
            userId = decodedData.userId;
        })

        const db = client.db();
        var o_id = new mongo.ObjectID(groupId);
        const result =  await db.collection('Groups').updateOne(
            {_id:o_id},
            {$pull:{GroupSubscribers:{Name:name, Id:userId}}}
        );
        return res.status(200).json({error:error});



    });
    app.post('/api/updategroup', async (req, res, next) =>
    {

        var error = "";
        var userId;
        var g_id;
        var name = '';
        const {groupId, groupName, groupDescription, groupAdmins, groupSubscribers, imageURL, jwtToken} = req.body;

        jwt.verify(jwtToken, process.env.ACCESS_TOKEN_SECRET, function(err, decodedData)
        {
            if (err)
            {
                error = "Invalid token."
                return res.status(401).json({error:error});
            }
            name += decodedData.firstName;
            name += ' "';
            name += decodedData.username;
            name += '" ';
            name += decodedData.lastName;
            userId = decodedData.userId;
        })
        //var u_id = new mongo.ObjectID(userId);
        try{
            g_id = new mongo.ObjectID(groupId); 
        }
        catch(e)
        {
            console.log(e.message);
        }
        //var g_id = new mongo.ObjectID(groupId);
        const db = client.db();
        const resulting = await db.collection('Groups').find({_id:g_id,"GroupAdmins.Id":userId}).count();

        if(resulting > 0)
        {
            if(groupAdmins.filter(user => user.Id === userId).length == 0)
            {
                groupAdmins.push({Name:name, Id:userId});
            }
            const result = db.collection('Groups').updateOne(
                {_id:g_id},
                {
                    $set: {GroupName: groupName, GroupDescription: groupDescription, GroupAdmins:groupAdmins,
                    GroupSubscribers: groupSubscribers, ImageURL: imageURL}
                }
            )         
            return res.status(200).json({error:error});
        }
        error = "You are not an admin of this group";
        console.log(error);
        return res.status(402).json({error:error});



    });
    
    app.post('/api/searcheventsubbed', async (req, res, next) => {  
 
        var error = '';  
        const { search, jwtToken } = req.body;    
        try      
        {        
            if( token.isExpired(jwtToken))        
            {          
                var r = {error:'The JWT is no longer valid.', jwtToken: ''};          
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
        const results = await db.collection('Events').find({"EventAttendees.Id": _search }).toArray();

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

    app.post('/api/searchgroupsubbed', async (req, res, next) => {  
 
        var error = '';  
        const { search, jwtToken } = req.body;    
        try      
        {        
            if( token.isExpired(jwtToken))        
            {          
                var r = {error:'The JWT is no longer valid.', jwtToken: ''};          
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
        const results = await db.collection('Groups').find({ "GroupSubscribers.Id": _search }).toArray();

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

    app.post('/api/searchevents', async (req, res, next) => {  
        // incoming: userId(will be implemented later), search  
        // outgoing: results[], error  
        var error = '';  
        const { userId, search, jwtToken } = req.body;    
        try      
        {        
            if( token.isExpired(jwtToken))        
            {          
                var r = {error:'The JWT is no longer valid.', jwtToken: ''};          
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
        const results = await db.collection('Events').find({$or: [ { "EventName": {$regex:_search+'.*',$options:'i'} }, {"EventDescription": {$regex:_search+'.*',$options:'i'} } ] }).toArray();

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
                var r = {error:'The JWT is no longer valid.', jwtToken: ''};          
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
        const results = await db.collection('Users').findOne({
            $and: [{Password:password},
            {$or: [{ Email: login}, {Login: login}]}]}
        )
        var id = -1;  
        var fn = '';  
        var ln = '';
        var un = '';  
        var verStatus = 0;
        if( results )  
        {    
            id = results._id;    
            fn = results.FirstName;    
            ln = results.LastName;
            un = results.Login;
            verStatus = results.AuthStatus;
            if (verStatus == 0)
            {
                ret = {error:"Account not verified."};
            }
            else
            {
                try        
                {          
                    const token = require("./createJWT.js");          
                    ret = token.createToken( fn, ln, un, id );        
                }        
                catch(e)        
                {          
                    ret = {error:e.message};        
                }  
            }  
    
        }      
        else      
        {          
            ret = {error:"Login/Password incorrect."};      
        }
        res.status(200).json(ret);
    });

    app.post('/api/verifyaccount', async( req, res, next) =>
    {
        /*const { login, password, verificationCode} = req.body;

        const db = client.db();
        const results = await db.collection('Users').find({Login:login,Password:password}).toArray();
        if (results.length > 0)
        {
            var auth = results[0].Authentication;
            var stat = results[0].AuthStatus;
            var userID = results[0]._id;
            if (stat > 0)
            {
                ret = {error:"Your account is already verified!"};
                res.status(418).json(ret);
            }
            else
            {
                if (verificationCode != auth)
                {
                    ret = {error:"Verification code is incorrect"};
                    res.status(403).json(ret);
                }
                else
                {
                    const result = db.collection('Users').updateOne(
                        {_id:userID},
                        {
                            $set: {Authentication: '0', AuthStatus: 1}  
                        }
                    )
                    ret = {error:""};
                    res.status(200).json(ret); 
    
                }
            }
        }
        else
        {
            ret = {error:"Username/Password incorrect!"};
            res.status(401).json(ret);
        }

        */
        const {verificationLink} = req.body;
        const db = client.db();
        if(verificationLink)
        {
            jwt.verify(verificationLink, process.env.VERIFICATION_KEY, function(err, decodedData)
            {
                if(err)
                {
                    return res.status(401).json({error:"Invalid token (either incorrect or expired)."});
                }
                db.collection('Users').findOne({Authentication: verificationLink}, (err, user) =>
                {
                    if(err || !user)
                    {
                        return res.status(400).json({error: "Invalid token."});
                    }
                    else
                    {
                        db.collection('Users').updateOne(
                            {_id:user._id},
                            {
                                $set: {Authentication: '0', AuthStatus: 1}

                            }
                        )
                        return res.status(200).json({error: ""});
                    }

                })

            })
        }
        else
        {
            return res.status(401).json({error: "Authentication error."});
        }

    });
    app.post('/api/refreshauth', async( req, res, next) =>
    {
        const {email} = req.body;
        const db = client.db();
        db.collection('Users').findOne({Email: email}, (err, user) =>
        {
            if(err || !user)
            {
                return res.status(400).json({error:"Account with email does not exist."});
            }

            const jwtoken = jwt.sign({_id: user._id}, process.env.VERIFICATION_KEY, {expiresIn: '20m'});
            // todo: do this as html
            var message = "Hey, welcome to Get2Gather! Verify your account here: https://cop4331-eventmanager.herokuapp.com/verifyaccount/";
            message += jwtoken;
            message += "\n\n Link expired? Go here to obtain a new link: https://cop4331-eventmanager.herokuapp.com/newlink/";
            message += email;
            const checking = sendEmail.sendEmail(email, "Welcome to Get2Gather!", message);

            db.collection('Users').updateOne(
                {_id:user._id},
                {
                    $set: {Authentication: jwtoken}  
                }
            );
     
            return res.status(200).json({error: ""});

        })

    });
    app.post('/api/forgotpassword', async( req, res, next) =>
    {
        const {email} = req.body;
        const db = client.db();
        db.collection('Users').findOne({Email: email}, (err, user) =>
        {
            if(err || !user)
            {
                return res.status(400).json({error:"Account with email does not exist."});
            }

            const jwtoken = jwt.sign({_id: user._id}, process.env.RESET_PASSWORD_KEY, {expiresIn: '20m'});
            // todo: do this as html
            var message = "Hello, this is a password reset request for your Get2Gather account! If you did not request this, please ignore. Reset your password here: https://cop4331-eventmanager.herokuapp.com/resetpassword/";
            message += jwtoken;
            const checking = sendEmail.sendEmail(email, "Get2Gather: Password Reset Request", message);

            db.collection('Users').updateOne(
                {_id:user._id},
                {
                    $set: {resetPassword: jwtoken}  
                }
            );
            
            return res.status(200).json({error: ""});

        })

    });
    app.post('/api/resetpassword', async( req, res, next) =>
    {
        const {resetLink, newPassword} = req.body;
        const db = client.db();
        if(resetLink)
        {
            jwt.verify(resetLink, process.env.RESET_PASSWORD_KEY, function(err, decodedData)
            {
                if(err)
                {
                    return res.status(401).json({error:"Invalid token (either incorrect or expired)."});
                }
                db.collection('Users').findOne({resetPassword: resetLink}, (err, user) =>
                {
                    if(err || !user)
                    {
                        return res.status(400).json({error: "Invalid token."});
                    }
                    else
                    {
                        db.collection('Users').updateOne(
                            {_id:user._id},
                            {
                                $set: {Password: newPassword}

                            }
                        )
                        return res.status(200).json({error: ""});
                    }

                })

            })
        }
        else
        {
            return res.status(401).json({error: "Authentication error."});
        }

    });
    app.post('/api/getid', async( req, res, next) =>
    {
        const {jwtToken} = req.body;
        jwt.verify(jwtToken, process.env.ACCESS_TOKEN_SECRET, function(err, decodedData)
        {
            if(err)
            {
                return res.status(401).json({error:"Invalid token."});
            }
            return res.status(200).json({userId:decodedData.userId});
        })
        
    });
    app.post('/api/getuserid', async( req, res, next) =>
    {
        const {login,jwtToken} = req.body;
        const db = client.db();

        try      
        {        
            if( token.isExpired(jwtToken))        
            {          
                var r = {error:'The JWT is no longer valid.', jwtToken: ''};          
                res.status(401).json(r);          
                return;        
            }      
        }      
        catch(e)      
        {        
            console.log(e.message);      
        }

        const results = await db.collection('Users').findOne(
            
            {
            $or: [{ Email: login}, {Login: login}]
            }
        )
        var id = -1;  
        if( results )  
        {    
            id = results._id;    
            firstname = results.FirstName;
            username = results.Login;
            lastname = results.LastName;
            ret = {userId:id,firstName:firstname,userName:username,lastName:lastname};
            return res.status(200).json(ret);
    
        }      
        else      
        {          
            ret = {error:"Username/Email not found."};   
            return res.status(401).json(ret);   
        }


    })
    app.post('/api/addcomment', async( req, res, next) =>
    {
        const {jwtToken, text, date, eventId} = req.body;
        var name = '';
        var userId = '';
        const db = client.db();

        jwt.verify(jwtToken, process.env.ACCESS_TOKEN_SECRET, function(err, decodeData)
        {
            if (token.isExpired(jwtToken))
            {
                var r = {error: 'The JWT is no longer valid.', jwtToken: ''};
                return res.status(401).json(r);
            }
            name += decodeData.firstName;
            name += ' "';
            name += decodeData.username;
            name += '" ';
            name += decodeData.lastName;
            userId = decodeData.userId;
        })

        var o_id = new mongo.ObjectID(eventId);
        const result = await db.collection('Events').updateOne(
            {_id:o_id},
            {$push:{Comments:{User:name, Text:text, Date:date}}}
        )
        return res.status(200).json({error:"", FullName:name});
    });
}