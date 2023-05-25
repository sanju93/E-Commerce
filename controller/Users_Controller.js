const User = require('../models/User');
const Admin = require('../models/Admin');
let nodemailer = require('../mailer/AccountCreated');
let nodemailerForgotPassword = require('../mailer/forgotPassword');
let nodemailerAdmin = require('../mailer/AdminAccount');
let jwt = require('jsonwebtoken');
let crypto = require('crypto');
require('dotenv').config();
var {Transform} = require('stream');
let Product = require('../models/Product');
const path = require('path');




module.exports.PublicSignUp = (req,res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }

    return res.render('public_signup',{
        title : "SignUp"
    });
}

module.exports.public_sign_in = (req,res) => {
    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('public_signin',{
        title : 'SignIn'
    });
}




module.exports.public_sign_up = async (req,res) => {

    var adminEmail = process.env.AdminEmail;
    

   if (req.body.password != req.body.confirm_password) {
    req.flash('error','fill the correct password in confirm_password');
     return res.redirect('/users/public_sign_up');
   }


   if (adminEmail !== req.body.email) {

   try{

   

    


    var user = await User.findOne({email:req.body.email});
    
   if (user) {

      req.flash('info','User Already exist');

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

     nodemailer.accountCreated({name : req.body.name,email : req.body.email});

        

        req.flash('success','Account created successfully');

        return res.redirect('/users/public_sign_in');

    }catch(err) {
        console.log(err);

        req.flash('error','Error in creating the Account');
        return res.redirect('/users/public_sign_up')
    }


}






 } catch(err) {

      console.log(err);

      req.flash('error','Error in creating the account');

      return res.redirect('/users/public_sign_up');

   }

}else{
    req.flash('info',"your account can't be create signup on the admin portal");
    return res.redirect('/users/admin_sign_in');
}





   



      
    
}

module.exports.public_sign_in_post = async (req,res) => {


    req.flash('success','Logged In Successfully');

  
    
    return res.redirect('/');
   
}


module.exports.profile = async (req,res) => {

    var user = await User.findById(req.params.id);
   
  
    return res.render('profile',{
        title : "profile",
        user : user
    })
}

module.exports.logout = (req,res) => {

    req.flash('success','Logged Out SuccessFully');
   
    req.logout((err) => {

        if(err) {
          return err;
        }
       
    });

  


   
   
    return res.redirect('/users/public_sign_in');
}


module.exports.forgotPassword = (req,res) => {
    return res.render('forgot',{
        title : "Forgot Password"
    })
}


module.exports.forgotPasswordLink = async (req,res) => {
   
      var email = req.body.email;
   // 1. we need to check that does it mail exist or not
   // 2. if mail is exist then create the token and make the url for send to the mail
   // 3. if not then send the user to signup page 

   

   var user = await User.findOne({email : email});
   console.log(user);
   if (user) {
  
    var token =  jwt.sign({user : user},process.env.tokenSecretKey,{
        expiresIn : '5m'
    });
    
    var url = `http://localhost:8000/users/accessToken?token=${token}`;
    nodemailerForgotPassword.forgotPassword({url,email: user.email});

    req.flash('info','forgot password Link has been sent to your email');


    return res.status(200).json({data : true});
   
   


   
  

    

   }else{

    req.flash('alert',"User doesn't Exist");
    
    return res.status(200).json({data : false});
  
 
   }


    
  


}


module.exports.accessToken = async (req,res) => {
  let token = req.query.token;
  try{
      
 

     
     
      return res.render('updatePassword',{
        title : 'Update Password'
      });
  }catch(err){
    console.log(err);
    return res.redirect('/users/forgotPassword');

  }
}

module.exports.updatePassword = async (req,res) => {
    var token = req.body.token;
    var password = req.body.password;
    var confirm_password = req.body.confirm_password;
  
     try{
      
           var decode = await jwt.verify(token,process.env.tokenSecretKey);

           var id = decode.user._id;

    
        

          
        await User.findByIdAndUpdate(id,{password : password,confirm_password : confirm_password});

        req.flash('success','your password has been updated');

        return res.status(200).json({data: true});



        }catch(err) {

            console.log(err);
            req.flash('error','Error Occuring in updating the password');
            return res.status(200).json({data : false});

        }

    
    
}



module.exports.AdminSignIn = (req,res) => {
    return res.render('Admin_sign_in',{
        title : "Admin Sign In"
    });
}


module.exports.AdminSignUp = (req,res) => {
    return res.render('Admin_sign_up',{
        title : "Admin Sign Up"
    })
}


module.exports.AdminSignPost = async (req,res) => {
   

   

    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    let confirm_password = req.body.confirm_password;

    var admin_mail = process.env.AdminEmail;

    if (password !== confirm_password){

        req.flash('error',"enter the correct confirm password");

        return res.redirect('back');

    }

    if (email === admin_mail){

        var admin = await Admin.findOne({email : email});
        if (admin) {

            req.flash('info','Admin already there');

            return res.redirect('/users/admin_sign_in');
        }else{

            var code = crypto.randomBytes(2).toString('hex');
           

            var admin = await Admin.create({
                name : name,
                email : email,
                password : password,
                code : code
            })

            req.flash('success','Code has been sent to your E-mail');
            nodemailerAdmin.adminAccount({email : admin.email,code : code});
            res.redirect(`/users/verifyAdmin/${admin.id}`);



        }



    }else{

        req.flash('info',"You're not Admin");

    

        return res.redirect("/users/public_sign_up");

    }

    


}


module.exports.AdminSignInPost = (req,res) => {
  
 
    req.flash('success','Admin Logged In');
    return res.redirect('/users/AdminProfile');

}

module.exports.AdminProfile = async (req,res) => {

   

   
  
    

    
    return res.render('AdminProfile',{
        title : 'Admin Profile',
       
    });
}


module.exports.AdminData = async (req,res) => {

    const TransformData = new Transform({objectMode : true});
    TransformData.isWritten = false;

    TransformData._transform = function(chunk,encoding,callback){

        if (!this.isWritten){
            this.isWritten = true;
            callback(null, '[' + JSON.stringify(chunk))
        }else{
            callback(null,','+JSON.stringify(chunk));
        }

        
    }

    TransformData._flush = function(callback){
        callback(null,']');
    }

  

    var users = User.find().cursor().pipe(TransformData);

    users.pipe(res);

   
  
    

    
    
}







module.exports.verifyAdmin = (req,res) => {
  
    return res.render('verifyAdmin',{
        title : 'verify Admin'
    })
}

module.exports.verifyAdminPost = async (req,res) => {
   let code = req.body.code;
   let id = req.body.id;

   try{

    var user = await Admin.findById(id);

    if (user) {
        let dbcode = user.code;
        if (dbcode === code){

            req.flash('success','Admin Account Created');
            return res.status(200).json({data : true});
        }else{

            await Admin.findByIdAndDelete(id);

            req.flash('error',"Admin Can't be created Error in Code");
            return res.status(400).json({data : false});

        }
    }

   }catch(err){

    req.flash('error','Something getting Wrong');
    console.log(err);
    return res.status(400).json({data: false});

   }



}


module.exports.AddProduct = async (req,res) => {

   let Product_name = req.body.name;
   let picture_name = req.files.product_img.name;
   picture_name = picture_name.substring(0,picture_name.indexOf('.'))+ Date.now() + picture_name.substring(picture_name.indexOf('.'),picture_name.length);
   let SportType = req.body.types;
   let Price = req.body.price;
   let Brand = req.body.Brand;
   let Colour = req.body.colour;
   let weight = req.body.weight;
   let size = req.body.size;
   let quantity = req.body.quantity;
  

req.files.product_img.mv(path.join(__dirname, `../assets/images/products_images/${SportType}/${picture_name}`),(err) => {
    if (err) {
        console.log("error in saving the file",err);
        return;
    }
})

try{

    await Product.create({
        name : Product_name,
        image : picture_name,
        sportType : SportType,
        price : Price,
        Brand : Brand,
        Colour : Colour,
        weight : weight,
        size : size,
        quantity : quantity
    })

    req.flash('success',"Product added successfully");

}catch(err){
    req.flash('error',"Error getting in Adding the Product");
    console.log("error in saving the Product",err);
    
}


return res.redirect('back');
 



  
   


}










