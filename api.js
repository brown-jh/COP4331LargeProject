exports.setApp = function (app, client)
{
    // Potentially a bad idea
    var bp = require('./frontend/src/components/Path.js');

    var sendEmail = require('./sendEmail.js');
    var authcode = require('./createAuth.js');
    const jwt = require("jsonwebtoken");

    var token = require('./createJWT.js');
    const nodemailer = require('nodemailer');


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
    app.post('/api/addgroup', async (req, res, next) =>{  
        // incoming: GroupName, GroupDescription
        // outgoing: error  
        var error = '';  
    
        const { groupName, groupDescription, jwtToken } = req.body;      
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
    
        
        const newGroup = {GroupName:groupName, GroupDescription:groupDescription};  
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
        
        const verificationCode = authcode.createAuthentication();
        
        const newUser = {FirstName:firstName, LastName:lastName, Login:login, Password:password, 
        Email:email, Authentication:verificationCode, AuthStatus:0};  
        var error = ''; 

        // Changed, no longer required
        //var obj = {email:email, authentication:verificationCode};
        //var js = JSON.stringify(obj);

        const db = client.db();  
        // This should ensure that only one of any username exists.
        var results = await db.collection('Users').find({ Email:email }).toArray();
        if (results.length > 0)
        {
            error = "Email is already in use!";
            var ret = { error: error};
            res.status(409).json(ret);
        }
        else
        {
            results = await db.collection('Users').find({ Login:login }).toArray();
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
                // THIS HERE SEEMS TERRIBLE
                // BE WARY, THIS IS PROBABLY A BAD IDEA
                // TURNS OUT THIS WAS A BAD IDEA, so I'll fix it
                /*const response = await fetch(bp.buildPath('api/sendemail'),            
                    {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
    
                */
                var message = "Welcome to GetTogather! Your verification code is: ";
                message += verificationCode;
                const checking = sendEmail.sendEmail(email, "Welcome to GetTogather!", message);
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

    app.post('/api/addevent', async (req, res, next) =>{  
        // incoming: EventName, EventDescription, EventDate, EventTime, EventLocation
        // outgoing: error  
        var error = '';  

        const { eventname, eventDescription, eventtime, eventLocation, groupID, imageURL, eventhost, jwtToken } = req.body;      
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

        
        const newEvent = {EventName:eventname, EventDescription:eventDescription, 
                            EventTime: new Date(eventtime), EventLocation:eventLocation,GroupID:groupID,EventHosts:[eventhost],ImageURL:imageURL,};  
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

    app.post('/api/searchgroups', async (req, res, next) => {  
 
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
        const results = await db.collection('Groups').find({$or: [ { "GroupName": {$regex:_search+'.*i', $options:'ir'} }, {"GroupDescription": {$regex:_search+'.*i', $options:'ir'} } ] }).toArray();

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
        const results = await db.collection('Groups').find({ "GroupAdmins": [_search] }).toArray();

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
        const results = await db.collection('Events').find({$or: [ { "EventName": {$regex:_search+'.*i', $options:'i'} }, {"EventDescription": {$regex:_search+'.*i', $options:'i'} } ] }).toArray();

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
        var verStatus = 0;
        if( results.length > 0 )  
        {    
            id = results[0]._id;    
            fn = results[0].FirstName;    
            ln = results[0].LastName;
            verStatus = results[0].AuthStatus;
            if (verStatus == 0)
            {
                ret = {error:"Account not verified"};
            }
            else
            {
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
    
        }      
        else      
        {          
            ret = {error:"Login/Password incorrect."};      
        }
        res.status(200).json(ret);
    });

    app.post('/api/verifyaccount', async( req, res, next) =>
    {
        const { login, password, verificationCode} = req.body;

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
            var message = "Reset your password here: https://cop4331-eventmanager.herokuapp.com/resetpassword/";
            message += jwtoken;
            const checking = sendEmail.sendEmail(email, "Password reset request", message);

            db.collection('Users').updateOne(
                {_id:user._id},
                {
                    $set: {resetPassword: jwtoken}  
                }
            );




            var ret = { error: err };      
            res.status(200).json(ret);

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
            return res.status(401).json({error: "Authentication error"});
        }

    });
}