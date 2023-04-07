const express = require('express');
const router = express.Router();
const Users_Controller = require('../controller/Users_Controller');
const auth = require('../config/auth');
const passport = require('passport');

router.get('/public_sign_up',Users_Controller.PublicSignUp);
router.get('/public_sign_in',Users_Controller.public_sign_in);
router.post('/public_sign_up',Users_Controller.public_sign_up);
router.post('/public_sign_in_post',passport.authenticate('local',{failureRedirect : '/users/public_sign_in'}),Users_Controller.public_sign_in_post);
router.get('/profile',auth.login,Users_Controller.profile);
router.get('/logout',Users_Controller.logout);



module.exports = router;