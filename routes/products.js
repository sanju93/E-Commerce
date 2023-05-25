var express = require('express');
const router = express.Router();

const Product_Controller = require('../controller/Products_Controller');


router.post('/AddtoCart',Product_Controller.AddtoCart);
router.get('/cart',Product_Controller.cart);





module.exports = router;