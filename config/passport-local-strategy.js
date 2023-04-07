const passport = require('passport');
const passportLocal = require('passport-local').Strategy;
const User = require('../models/User');


passport.use(new passportLocal({usernameField : 'email'},async (email,password,done) => {
    try{

        var user = await User.findOne({email : email});
        if (user) {

            if (user.password != password){
                return done(null,false);
            }else{
                return done(null,user);
            }

        }else{
            return done(null,false);
        }

    }catch(err){

        console.log(err);
        return done(null,false);

    }
}));


passport.serializeUser((user,done) => {
    return done(null,user.id);
})

passport.deserializeUser(async (id , done) => {


    var user = await User.findById(id);

    if (user) 
    {
        return done(null,user);
    }else{
        return done(null,false);
    }
})

passport.setAuthenticated = (req,res,next) => {
    if (req.isAuthenticated()) {
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;