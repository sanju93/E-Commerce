var url = window.location.href;

var token = url.substring(url.indexOf('=') + 1,url.length);


var form = document.getElementById('submit-btn');
form.addEventListener('click',async () => {


    var password = document.getElementById('password');
    var confirm_password = document.getElementById('confirm_password');

    if (password.value !== confirm_password.value) {
        location.reload();
        
    }else{
  

    var data = {
     token : token,
     password : password.value,
     confirm_password : confirm_password.value
    }

    var res = await fetch('/users/updatePassword',{
        method : 'post',
        headers : {
            'Content-Type' : 'application/json'
        },
        credentials : 'same-origin',
        redirect : 'follow',
        mode : 'cors',
        cache : 'no-cache',
        body : JSON.stringify(data)
    });

    var data = await res.json();

    if (data.data){
        window.location.href = '/users/public_sign_in';

    }
    else{
        window.location.href = '/users/forgotPassword';
    }

}



   
})