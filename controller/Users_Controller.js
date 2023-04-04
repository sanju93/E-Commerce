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