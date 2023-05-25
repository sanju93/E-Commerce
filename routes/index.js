const express = require('express');
const router = express.Router();

const Home_controller = require('../controller/Home_Controller');
const Users_Controller = require('./users');

router.get('/',Home_controller.home);
router.get('/products',Home_controller.Products);
router.use('/users',Users_Controller)

module.exports = router;