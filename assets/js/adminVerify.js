
var verify = document.getElementById('verify');
var url = window.location.href;

var id = url.substring(url.lastIndexOf('/') + 1,url.length);


verify.addEventListener('click',async function(){
    var code = document.getElementById('code').value;

    var data = {
        code : code,
        id : id
    }

    await fetch('/users/verifyAdmin',{
        method : 'post',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(data)
    })

    document.getElementById('code').value = '';


    window.location.href = '/users/admin_sign_in';
  
   


    
})