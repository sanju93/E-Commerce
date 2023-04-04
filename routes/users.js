const express = require('express');
const router = express.Router();
const Users_Controller = require('../controller/Users_Controller');

router.get('/public_sign_up',Users_Controller.PublicSignUp);
router.get('/public_sign_in',Users_Controller.public_sign_in);


module.exports = router;