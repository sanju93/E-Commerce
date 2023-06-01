
window.addEventListener('load',async function(){
   var res = await this.fetch('/users/getAdminData');

   var data = await res.json();

   console.log(data.products);

   var userContainer = document.getElementById('users-container');
  

   for (let i = 0; i < data.products.length; i++) {

      var user = document.createElement('div')
      user.setAttribute('class','child1');

      var name_para = document.createElement('p');
      var email = document.createElement('p');

      name_para.innerHTML = 'Consumer Name : ' + data.products[i][0].consumerName;
      email.innerHTML = 'Consumer Email : ' + data.products[i][0].consumerEmail;

      user.appendChild(name_para);
      user.appendChild(email);

      userContainer.appendChild(user);
      userContainer.appendChild(document.createElement('hr'));

      for (let j = 0; j < data.products[i].length; j++) {
           var child2 = document.createElement('div');

           child2.setAttribute('class','child2')

           var img = this.document.createElement('img');

           img.setAttribute('src',`../images/products_images/${data.products[i][j].sportType}/${data.products[i][j].productImage}`);

           var productName = this.document.createElement('p')
           productName.innerHTML = "Product Name :" + data.products[i][j].productName;


           var orderId = this.document.createElement('p');

           orderId.innerHTML = "OrderId : " +  data.products[i][j].orderId;


           var price = this.document.createElement('p');

           price.innerHTML = "Price : " +  data.products[i][j].price;

           var qty = this.document.createElement('p');

           qty.innerHTML =  "Quantity : " + data.products[i][j].qty;


           var orderDate = this.document.createElement('p');

           orderDate.innerHTML = "Order Placed Date : " +  data.products[i][j].orderPlaced;


           var Dispatch = this.document.createElement('button');
           Dispatch.innerHTML = "Dispatch Item";

           if (data.products[i][j].dispatch){

            Dispatch.setAttribute('disabled','true');

           }

           Dispatch.setAttribute('id',`${data.products[i][j].paymentId}`)

           Dispatch.addEventListener('click',async function(e){

            var id = e.target.getAttribute('id');
       
             await fetch('/users/products/deliveryStatus',{
                  method : 'post',
                  headers : {
                     'Content-Type' : 'application/json'
                  },
                  body : JSON.stringify({
                     id : id,
                     status : 'Dispatch'
                  })
               })

             

              

               window.location.reload();
           })

           var OutForDelivery = this.document.createElement('button');

           OutForDelivery.innerHTML = "Out for Delivery";

           if (data.products[i][j].outfordelivery){
            OutForDelivery.setAttribute('disabled','true');
           }

           OutForDelivery.setAttribute('id',`${data.products[i][j].paymentId}`);

           OutForDelivery.addEventListener('click',async function(e){
            var id = e.target.getAttribute('id');

            


         await fetch('/users/products/deliveryStatus',{
               method : 'post',
               headers : {
                  'Content-Type' : 'application/json'
               },
               body : JSON.stringify({
                  id : id,
                  status : 'OutForDelivery'
               })
            })

            
         
       
         

            window.location.reload();

           })


           var Delivered = this.document.createElement('button');

           Delivered.innerHTML = 'Delivered';

           if(data.products[i][j].delivered){

            Delivered.setAttribute('disabled',true);

           }

           Delivered.setAttribute('id',`${data.products[i][j].paymentId}`)


           Delivered.addEventListener('click',async function(e){

            var id = e.target.getAttribute('id');

           var res =  await fetch('/users/products/deliveryStatus',{
               method : 'post',
               headers : {
                  'Content-Type' : 'application/json'
               },
               body : JSON.stringify({
                  id : id,
                  status : 'Delivered'
               })
            })

        
            window.location.reload();

           })



           










           child2.appendChild(img);
           child2.appendChild(productName);
           child2.appendChild(orderId);
           child2.appendChild(price);
           child2.appendChild(qty);
           child2.appendChild(orderDate);
           child2.appendChild(Dispatch);
           child2.appendChild(OutForDelivery);
           child2.appendChild(Delivered);
           userContainer.appendChild(child2);


           

      }

   


}

  
})




