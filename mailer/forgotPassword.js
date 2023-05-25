const nodemailerObj = require('../config/nodemailer');

module.exports.forgotPassword = function (user) {
    var htmlTemplate = nodemailerObj.template(user.url,__dirname + '/../views/mailers/forgotPassword.ejs');

    nodemailerObj.transporter.sendMail({
        from : 'sanjay139474@gmail.com',
        to : user.email,
        subject : 'Forgot Password',
        html : htmlTemplate
    },function(err,data){
        if (err) {
            console.log(err);
            return;
        }
    
        console.log('for forgot password mail sent successfully');
        
    })
}