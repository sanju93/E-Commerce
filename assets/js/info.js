



var orderId = document.getElementById('orderId');
var productId = document.getElementById('productId');
var Address = document.getElementById('Address');
var price = document.getElementById('price');
orderId.style.display = "none";
productId.style.display = "none";
price.style.display = "none";


fetch('/users/products/ProductsInfo').
then(res => res.json()).
then((data) => {
    



    console.log(price.innerHTML);

    var options = {
        "key": "rzp_test_4qPYOwauKaJykT", // Enter the Key ID generated from the Dashboard
        "amount": `${price.innerHTML*100}`, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": "bat",
        "description": "Test Transaction",
        "image": "https://example.com/your_logo",
        "order_id": orderId.innerHTML, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "handler": function (response){


           
            alert(response.razorpay_payment_id);
            alert(response.razorpay_order_id);
            alert(response.razorpay_signature);
        },
        "prefill": {
            "name": data.data.name,
            "email": data.data.email,
            "contact": "9000090000"
        },
        "notes": {
            "address": Address.value
        },
        "theme": {
            "color": "#3399cc"
        }
    };


    var rzp1 = new Razorpay(options);
    rzp1.on('payment.failed', function (response){
            alert(response.error.code);
            alert(response.error.description);
            alert(response.error.source);
            alert(response.error.step);
            alert(response.error.reason);
            alert(response.error.metadata.order_id);
            alert(response.error.metadata.payment_id);
    });
 

    document.getElementById('rzp-button1').onclick = function(e){
        rzp1.open();


      
        e.preventDefault();
       
    
    
    }
});







   



    

    
  
    





