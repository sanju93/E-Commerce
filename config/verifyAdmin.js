require('dotenv').config();
module.exports.verify = (req,res,next) => {
    if (req.body.email === process.env.AdminEmail){
        next();
    }else{
        return res.redirect('/users/public_sign_in');
    }
}

module.exports.verifyPublicUser = (req,res,next) => {
    if (req.body.email === process.env.AdminEmail){
        return res.redirect('/users/admin_sign_in');
    }else{
        next();
    }
}