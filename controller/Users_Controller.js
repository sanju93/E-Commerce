const User = require('../models/User');
module.exports.PublicSignUp = (req,res) => {
    return res.render('public_signup',{
        title : "SignUp"
    });
}

module.exports.public_sign_in = (req,res) => {
    return res.render('public_signin',{
        title : 'SignIn'
    });
}

module.exports.public_sign_up = async (req,res) => {

   if (req.body.password != req.body.confirm_password) {
     return res.redirect('/users/public_sign_up');
   }

   try{

    var user = await User.findOne({email:req.body.email});
    
   if (user) {

      return res.redirect('/users/public_sign_in');

   }else{

    //creating user 
    try{

        await User.create({
            name : req.body.name,
            email : req.body.email,
            password : req.body.password,
            confirm_password : req.body.confirm_password
        });
        return res.redirect('/users/public_sign_in');

    }catch(err) {
        console.log(err);
        return res.redirect('users/public_sign_up')
    }

}
 } catch(err) {

      console.log(err);

      return res.redirect('/users/public_sign_up');

   }

   



      
    
}