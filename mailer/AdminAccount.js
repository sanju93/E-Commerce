var nodemailer = require('../config/nodemailer');

 module.exports.adminAccount = function(user) {

    var htmlTemplate = nodemailer.template(user.code,__dirname + '/../views/mailers/verifyAccount.ejs');
    
    nodemailer.transporter.sendMail({
        from : 'sanjay139474@gmail.com',
        to : user.email,
        html : htmlTemplate,
        subject : 'Verify Account'
    },function(err,data){
        if(err) {
            console.log(err);
            return;
        }

        console.log("code sent Successfully");
    })

}

