
module.exports.login =(req,res,next) => {

  if (req.isAuthenticated()){
    return next();
  }else{
    return res.redirect('/users/public_sign_in');
  }
  
}