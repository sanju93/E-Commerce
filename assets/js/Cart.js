var deleteBtn = document.getElementsByClassName('delete');


for (let i = 0; i < deleteBtn.length; i++) {


    deleteBtn[i].addEventListener('click',async function(e) {
        var id = e.target.getAttribute('id');
     
      
     
        await fetch(`/users/products/delete_cart_product/${id}`);
      
        location.reload();
        
       
       
        
    })
}


var Buybtn = document.getElementsByClassName('buy');

for (let i = 0; i < Buybtn.length; i++){
    Buybtn[i].addEventListener('click',async function(e){
        var id = e.target.getAttribute('id');

        




        var res = await fetch(`/users/products/create/OrderId`,{
            method : 'POST',
            timeout : 0,
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                id : id,
                qty : 1
            })
            
           })


           var data = await res.json();


           if (data.success === true){
             window.location.href = '/';
           }else{
            window.location.href = `/users/products/Info?orderId=${data.orderId}&productId=${data.productId}&price=${data.price}&qty=${data.qty}`;

           }

    


    })
}