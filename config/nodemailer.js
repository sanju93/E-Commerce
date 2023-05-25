const nodemailer = require('nodemailer');
var ejs = require('ejs')
require('dotenv').config();

var transport = nodemailer.createTransport({
 
    service : 'gmail',
    host : 'smtp.gmail.com',
    port : 587,
    secure : false,
    auth : {
        user : 'sanjay139474@gmail.com',
        pass :  process.env.mailPassword
    }
});


let renderTemplate = function(data,relativePath) {
    var templateReturn;
    
    ejs.renderFile(relativePath,{data : data},function(err,template){
        if (err){
            console.log(err);
            return;
        }
      
        templateReturn = template;
    })
     
    return templateReturn;

}

module.exports = {
    transporter : transport,
    template : renderTemplate
}