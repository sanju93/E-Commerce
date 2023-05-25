const express = require('express');
const router = express.Router();
const Users_Controller = require('../controller/Users_Controller');
const auth = require('../config/auth');
const passport = require('passport');




//public users Routes


router.get('/public_sign_up',Users_Controller.PublicSignUp);
router.get('/public_sign_in',Users_Controller.public_sign_in);
router.post('/public_sign_up_post',Users_Controller.public_sign_up);
router.post('/public_sign_in_post',passport.authenticate('local',{failureRedirect : '/users/public_sign_in',failureFlash : 'Please give the correct credentials'}),Users_Controller.public_sign_in_post);
router.get('/profile/:id',auth.login,Users_Controller.profile);
router.get('/logout',Users_Controller.logout);
router.get('/forgotPassword',Users_Controller.forgotPassword);
router.post('/forgotPasswordLink',Users_Controller.forgotPasswordLink);
router.get('/accessToken',Users_Controller.accessToken);
router.post('/updatePassword',Users_Controller.updatePassword);
router.get('/auth/google',passport.authenticate('google',{scope:['profile' ,'email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect : '/users/public_sign_in'}),Users_Controller.public_sign_in_post);





//Admin Routes
router.get('/admin_sign_in',Users_Controller.AdminSignIn);

router.get('/admin_sign_up',Users_Controller.AdminSignUp);

router.post('/admin_sign_in_post',passport.authenticate('local',{failureRedirect : '/users/admin_sign_in',failureFlash : "Please Give the correct Credentials"}),Users_Controller.AdminSignInPost);

router.post('/admin_sign_up_post',Users_Controller.AdminSignPost);

router.get('/verifyAdmin/:id',Users_Controller.verifyAdmin);

router.post('/verifyAdmin',Users_Controller.verifyAdminPost);

router.get('/AdminProfile',auth.login,Users_Controller.AdminProfile);


router.get('/getAdminData',Users_Controller.AdminData);

router.post('/AddProductPost',Users_Controller.AddProduct);


router.use('/products',require('./products'));





module.exports = router;