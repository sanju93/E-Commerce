


window.addEventListener('load',async function(){
    var res = await fetch('/products');
    var data = await res.json();

      var Cricket = [];
      var FootBall = [];
      var VolleyBall = [];
      var Hockey = [];
      var BaseBall = [];
      var Rugby = [];
      console.log(Rugby);


      for (let i = 0; i < data.length; i++) {
        if (data[i].sportType == 'Cricket'){
            Cricket.push(data[i]);
        }else if (data[i].sportType == 'Football') {
            FootBall.push(data[i]);
        }else if (data[i].sportType == 'VolleyBall'){
          VolleyBall.push(data[i]);
        }else if (data[i].sportType == 'Hockey') {
            Hockey.push(data[i]);
        }else if (data[i].sportType == 'BaseBall'){
            BaseBall.push(data[i])
        }else{
            Rugby.push(data[i]);
        }
      }

   ;
    

   var Cricketdiv = document.getElementById('cricket')
 
    for (let i = 0; i<Cricket.length; i++) {
        var card = document.createElement('div');

        
        card.setAttribute('class','cards');
        

        let name = Cricket[i].name;
        let image_name = Cricket[i].image;
        let price = Cricket[i].price;
        let type = Cricket[i].sportType;
       

        let product_img = document.createElement('img');
        product_img.setAttribute('src',`../images/products_images/${type}/${image_name}`);
        let product_name = document.createElement('p')
        let price_para = document.createElement('p');


        product_name.innerHTML = name;
        price_para.innerHTML = 'INR.' + price;


        var cartButton = document.createElement('button');
        cartButton.innerHTML = "Add to Cart";
        cartButton.setAttribute('class','btn btn-info mx-2');
        cartButton.setAttribute('id',`${Cricket[i]._id}`);
        
       

      

            cartButton.addEventListener('click',async function(e){

                var id = e.target.getAttribute('id');
           
    
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

        

     

        var buyButton = document.createElement('button');
        buyButton.innerHTML = "Buy";

        buyButton.setAttribute('class','btn btn-info mx-2');

        

        card.appendChild(product_img);
        card.appendChild(product_name);
        card.appendChild(price_para);
        price_para.appendChild(cartButton);
        price_para.appendChild(buyButton);


        


        



        Cricketdiv.appendChild(card);
    }

    var FootBalldiv = document.getElementById('FootBall');


    for (let i = 0; i<FootBall.length; i++) {
        var card = document.createElement('div');

        
        card.setAttribute('class','cards');
        

        let name = FootBall[i].name;
        let image_name = FootBall[i].image;
        let price = FootBall[i].price;
        let type = FootBall[i].sportType;
       

        let product_img = document.createElement('img');
        product_img.setAttribute('src',`../images/products_images/${type}/${image_name}`);
        let product_name = document.createElement('p')
        let price_para = document.createElement('p');


        product_name.innerHTML = name;
        price_para.innerHTML = 'INR.' + price;

        

        card.appendChild(product_img);
        card.appendChild(product_name);
        card.appendChild(price_para);

        


        



        FootBalldiv.appendChild(card);
    }

    var volleyBallDiv = document.getElementById('VolleyBall');



    for (let i = 0; i<VolleyBall.length; i++) {
        var card = document.createElement('div');

        
        card.setAttribute('class','cards');
        

        let name = VolleyBall[i].name;
        let image_name = VolleyBall[i].image;
        let price = VolleyBall[i].price;
        let type = VolleyBall[i].sportType;
       

        let product_img = document.createElement('img');
        product_img.setAttribute('src',`../images/products_images/${type}/${image_name}`);
        let product_name = document.createElement('p')
        let price_para = document.createElement('p');


        product_name.innerHTML = name;
        price_para.innerHTML = 'INR.' + price;

        

        card.appendChild(product_img);
        card.appendChild(product_name);
        card.appendChild(price_para);

        


        



        volleyBallDiv.appendChild(card);
    }

    var HockeyDiv = document.getElementById('Hockey');

    for (let i = 0; i <Hockey.length; i++) {
        var card = document.createElement('div');

        
        card.setAttribute('class','cards');
        

        let name = Hockey[i].name;
        let image_name = Hockey[i].image;
        let price = Hockey[i].price;
        let type = Hockey[i].sportType;
       

        let product_img = document.createElement('img');
        product_img.setAttribute('src',`../images/products_images/${type}/${image_name}`);
        let product_name = document.createElement('p')
        let price_para = document.createElement('p');


        product_name.innerHTML = name;
        price_para.innerHTML = 'INR.' + price;

        

        card.appendChild(product_img);
        card.appendChild(product_name);
        card.appendChild(price_para);

        


        



        HockeyDiv.appendChild(card);
    }


    var BaseballDiv = document.getElementById('BaseBall');


    for (let i = 0; i <BaseBall.length; i++) {
        var card = document.createElement('div');

        
        card.setAttribute('class','cards');
        

        let name = BaseBall[i].name;
        let image_name = BaseBall[i].image;
        let price = BaseBall[i].price;
        let type = BaseBall[i].sportType;
       

        let product_img = document.createElement('img');
        product_img.setAttribute('src',`../images/products_images/${type}/${image_name}`);
        let product_name = document.createElement('p')
        let price_para = document.createElement('p');


        product_name.innerHTML = name;
        price_para.innerHTML = 'INR.' + price;

        

        card.appendChild(product_img);
        card.appendChild(product_name);
        card.appendChild(price_para);

        


        



        BaseballDiv.appendChild(card);
    }

    var RugByDiv = document.getElementById('Rugby');


    for (let i = 0; i <Rugby.length; i++) {
        var card = document.createElement('div');

        
        card.setAttribute('class','cards');
        

        let name = Rugby[i].name;
        let image_name = Rugby[i].image;
        let price = Rugby[i].price;
        let type = Rugby[i].sportType;
       

        let product_img = document.createElement('img');
        product_img.setAttribute('src',`../images/products_images/${type}/${image_name}`);
        let product_name = document.createElement('p')
        let price_para = document.createElement('p');


        product_name.innerHTML = name;
        price_para.innerHTML = 'INR.' + price;

        

        card.appendChild(product_img);
        card.appendChild(product_name);
        card.appendChild(price_para);

        


        



        RugByDiv.appendChild(card);
    }







    


})