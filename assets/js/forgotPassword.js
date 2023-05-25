let btn = document.getElementById('linkbtn');
btn.addEventListener('click',async function(){

    let email = document.getElementById('email');
    var data = {
        email : email.value
    };
   var res = await fetch('/users/forgotPasswordLink',{
        method : 'post',
        redirect : 'manual',
        headers : {
            'Content-Type' : "application/json"
        },
        body : JSON.stringify(data)
    
    })

    var data = await res.json();
    
  

     if (data.data) {
        window.location.href = '/users/forgotPassword';
     }
     else{
        window.location.href = '/users/public_sign_up';
     }

})