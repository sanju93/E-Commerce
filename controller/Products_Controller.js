var User = require('../models/User');
var Product = require('../models/Product');
var Payments = require('../models/Payments');
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

   
    var qty = req.body.qty;
    
    var product = await Product.findById(req.body.id);
    var price = product.price;
  
    
    price = Number(price);

    price *= qty;
   
    


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
  return res.status(200).json({orderId : order.id,productId : product.id,price:price,qty});
});

}


module.exports.Info = (req,res) => {



 
    return res.render('info',{

        title : "Order Info",
        orderId : req.query.orderId,
        productId : req.query.productId,
        price : req.query.price,
        qty : req.query.qty
        
    })

}

module.exports.productInfo = async (req,res) => {
    var user = await User.findById(req.user.id);

    return res.status(200).json({data : user});

}


module.exports.payments = async (req,res) => {

    try
    
    {

        
    var orderId = req.body.orderId;
    var productId = req.body.productId;
    var paymentId = req.body.paymentId;
    var price = req.body.price;
    var qty = req.body.qty;
    var date = new Date();
    
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    date = day + '/' + month + '/' + year;
   

   var payments =  await Payments.create({
        paymentId : paymentId,
        product : productId,
        user : req.user.id,
        orderId : orderId,
        status : true,
        orderPlaced : date,
        qty : qty,
        price : price
    });

    var user = await User.findById(req.user.id);
    user.orders.push(payments.id);
    user.save();


    var product = await Product.findById(productId);

    product.quantity = Number(product.quantity) - 1;
    product.save();



    return res.status(200).json({success : true})

    }catch(err){
        console.log(err);
        return res.status(402).json({success : false});
    }
}


module.exports.ordersPage = async (req,res) => {

    try{

        
        var orders = [];
        var user = await User.findById(req.user.id);

        var payments = user.orders;

        for (var i = 0; i < payments.length; i++){

           var order = await Payments.findById(payments[i]);

           var product = await Product.findById(order.product);

           var data = {};

           data.orderPlaced = order.orderPlaced;
           data.product_name = product.name;
           data.image = `/images/products_images/${product.sportType}/${product.image}`;
           data.consumerName = req.user.name;
           data.orderId = order.orderId;
           data.price = order.price;
           data.qty = order.qty;
           data.status = order.status;
           data.productId = product.id



            orders.push(data);



            
        }





        return res.render('ordersPage',{
            title : 'Your Orders',
            orders : orders
        })

    }catch(err){
        console.log(err);
        return err;
    }



}


module.exports.ProductView =  async (req,res) => {

    var product = await Product.findById(req.params.id);


    return res.render('productPage',{
        title : `${product.name}`,
        product
    });

   
    
}