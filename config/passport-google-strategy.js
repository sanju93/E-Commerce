let crypto = require('crypto');
let passport = require('passport');
let User = require('../models/User');
let googleStrategy = require('passport-google-oauth').OAuth2Strategy;
require('dotenv').config();

passport.use(new googleStrategy({
    clientID : process.env.clientId,
    clientSecret : process.env.clientSecret,
    callbackURL : process.env.callBackUrl
},

async function(accessToken,refreshToken,profile,done){

    try{

        var user = await User.findOne({email : profile.emails[0].value});

        if (user) {

            return done(null,user);
    
        }else{

            try{
                var pass = crypto.randomBytes(20).toString('hex');

                var userCreated = await User.create({
                    name : profile.displayName,
                    email : profile.emails[0].value,
                    password : pass,
                    confirm_password : pass
                });

                return done(null,userCreated);

            }catch(err) {

                return done(null,false);

            }
    
        }


    }catch(err) {

        console.log(err);
        return done(null,false);

    }
   
}

))