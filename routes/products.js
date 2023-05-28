var express = require('express');
const router = express.Router();

const Product_Controller = require('../controller/Products_Controller');

const auth = require('../config/auth');


router.post('/AddtoCart',auth.login,Product_Controller.AddtoCart);
router.get('/cart',Product_Controller.cart);
router.get('/delete_cart_product/:id',Product_Controller.deleteCartProducts);
router.post('/create/orderId',auth.login,Product_Controller.order);

router.get('/Info',Product_Controller.Info);

router.get('/productsInfo',Product_Controller.productInfo);





module.exports = router;