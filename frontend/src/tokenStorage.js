exports.storeToken = function ( tok )
{    
    try    
    {      
        localStorage.setItem('token_data', tok.accessToken);    
    }    
    catch(e)
    {      
        console.log(e.message);    
    }
}

exports.retrieveToken = function ()
{    
    var ud;    
    try    
    {      
        ud = localStorage.getItem('token_data');    
    }    
    catch(e)    
    {      
        console.log(e.message);    
    }    
    return ud;
<<<<<<< HEAD
}
=======
}
>>>>>>> 3d6842a220dec775d8586506c41f5a6f1a00b291
