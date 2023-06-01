var minus = document.getElementById('minus');
var plus = document.getElementById('plus');
var textBox = document.getElementById('textBox');


minus.addEventListener('click',function(){
    if (Number(textBox.value) > 1 ){
        textBox.value = Number(textBox.value) - 1;  
    }
});


plus.addEventListener('click',function(){
    if (Number(textBox.value) < 5 ){
        textBox.value = Number(textBox.value) + 1; 
     
    }
});



var BuyBtn = document.getElementById('BuyBtn');

var CartBtn = document.getElementById('CartBtn');




BuyBtn.addEventListener('click',async function(){

    var id = document.getElementById('productId').innerHTML;
 

    var res = await fetch(`/users/products/create/OrderId`,{
        method : 'POST',
        timeout : 0,
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            id : id,
            qty : Number(textBox.value)
        })
        
       })


       var data = await res.json();

       if (data.success === true){
        window.location.reload();
       }else{

        window.location.href = `/users/products/Info?orderId=${data.orderId}&productId=${data.productId}&price=${data.price}&qty=${data.qty}`;

       }


 

})


CartBtn.addEventListener('click',async function(){
  

      
    var id = document.getElementById('productId').innerHTML;

        var res = await fetch('/users/products/AddtoCart',{
            method : 'post',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({id : id})
        })

        var data = await res.json();

        if (data.success == true) {
            location.reload();
        }

     
        
        
        

    

})

