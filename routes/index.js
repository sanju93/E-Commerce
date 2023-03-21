const express = require('express');
const router = express.Router();

const Home_controller = require('../controller/Home_Controller');

router.get('/',Home_controller.home);

module.exports = router;