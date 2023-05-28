var User = require('../models/User');
var Product = require('../models/Product');
let Razorpay = require('razorpay');
module.exports.AddtoCart = async function(req,res) {

    try{

        var user = await User.findById(req.user.id);

       if (user.cart.includes(req.body.id)){
        req.flash('info','Already added the product in your cart');
        return res.status(200).json({success : true});
       }


        await user.cart.push(req.body.id);
        await user.save();
        req.flash('success','Added to Cart');
        return res.status(200).json({success : true});

    }catch(err){

        console.log(err);
        req.flash('error','Error Occuring to add in cart');
        return res.status(401).json({success : false});

    }
    

}


module.exports.cart = async (req,res) => {
   if (req.user){

    var user = await User.findById(req.user);

    var products = [];

    for (var i = 0; i < user.cart.length;i++){

   

        var product = await Product.findById(user.cart[i]);

         products.push(product);
        
    }

   }

    




    return res.render('cart',{
        title : 'cart',
        cart : products
    })
}


module.exports.deleteCartProducts = async (req,res) => {

    try{

    var user = await User.findById(req.user.id);

    var index = user.cart.indexOf(req.params.id);

    user.cart.splice(index,1);
    user.save();
    req.flash('success','product removed from cart');

    return res.status(200).json({success : true});

    }catch(err){

        console.log(err);
        return res.status(200).json({success : false});

    }

    

}



module.exports.order = async (req,res) => {

   

    var product = await Product.findById(req.body.id);
    var price = product.price;
    price = Number(price);

var instance = new Razorpay({ key_id: 'rzp_test_4qPYOwauKaJykT', key_secret:'ZaPWbHjKiZCRn2dcsCjsNRAb' });

var options = {
  amount: price * 100,  // amount in the smallest currency unit
  currency: "INR",
  receipt: "order_rcptid_11"
};
instance.orders.create(options, function(err, order) {
    if (err){
        console.log(err);
        return;
    }
  console.log(order);
  return res.status(200).json({orderId : order.id,productId : product.id,price:price});
});

}


module.exports.Info = (req,res) => {




    return res.render('info',{

        title : "Order Info",
        orderId : req.query.orderId,
        productId : req.query.productId,
        price : req.query.price
    })

}

module.exports.productInfo = async (req,res) => {
    var user = await User.findById(req.user.id);

    return res.status(200).json({data : user});

}