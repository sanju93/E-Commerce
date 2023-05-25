var nodemailerObj = require('../config/nodemailer');

module.exports.accountCreated = function (user){

  
 
    var htmlTemplate = nodemailerObj.template(user.name, __dirname + '/../views/mailers/account_created.ejs');

    nodemailerObj.transporter.sendMail({
        from : 'sanjay139474@gmail.com',
        to : user.email,
        subject : 'New Account Created',
        html : htmlTemplate
    },function(err,data){
        if (err) {
            console.log(err);
            return;
        }else{
            console.log('Mail sent Successfully');
        }
    })
   
}

