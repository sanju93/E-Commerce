const passport = require('passport');
const passportLocal = require('passport-local').Strategy;
const User = require('../models/User');
const Admin = require('../models/Admin');
require('dotenv').config();
passport.use(new passportLocal({usernameField : 'email'},async (email,password,done) => {
   try{
        if (email === process.env.AdminEmail){

             var admin = await Admin.findOne({email : email});

            if (admin) {
                if (admin.password !== password) {
                    return done(null,false);
                }else{
                   
                    return done(null,admin);

                }
                
            }else{
              return done(null,false);    
            }


        }else{
             
          var user = await User.findOne({email : email});
           if (user) {

            if (user.password !== password){
                return done(null,false);
            }else{
                return done(null,user);
            }

        }else{
            return done(null,false);
        }

        }

        

    }catch(err){

        console.log(err);
        return done(null,false);

    }
}));


passport.serializeUser((user,done) => {
    return done(null,user.email);
})

passport.deserializeUser(async (email , done) => {
    if (email == process.env.AdminEmail) {

        var admin = await Admin.findOne({email : email});
        if (admin) {
            return done(null,admin);
        }else{
            return done(null,false);
        }

    }else{
        var user = await User.findOne({email : email});
        if (user) 
        {
            return done(null,user);
        }else{
            return done(null,false);
        }
        
    }
   

  
})

passport.setAuthenticated = (req,res,next) => {
    if (req.isAuthenticated()) {
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;