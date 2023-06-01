require('dotenv').config();
module.exports.login =(req,res,next) => {

  if (req.isAuthenticated()){
    return next();
  }else{
    return res.redirect('/users/public_sign_in');
  }
  
}


module.exports.verify = (req,res,next) => {
  if (req.user.email === process.env.AdminEmail){
    return res.redirect('/');
  }else{
    next();
  }
}