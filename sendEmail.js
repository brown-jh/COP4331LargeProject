const nodemailer = require('nodemailer');

exports.sendEmail =
function sendEmail(address, sentSubject, sentMessage)
{
    var error = '';
    //const { email, authentication } = req.body;
    //var text = "Your verification code is: ";
    //text += authentication;
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user:'cop4331get2gather@gmail.com',
            pass: 'COP4331Group25!'
        }
    });
    
    var message = {
        from: "cop4331get2gather@gmail.com",
        to:address,
        
        subject:sentSubject,
        text:sentMessage
        
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
}