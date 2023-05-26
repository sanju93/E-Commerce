var deleteBtn = document.getElementsByClassName('delete');


for (var i = 0; i < deleteBtn.length; i++) {
    deleteBtn[i].addEventListener('click',async (e) => {
        var id = e.target.getAttribute('id');
        var res = await fetch(`/users/products/delete_cart_product/${id}`);
        var data = await res.json();
        location.reload();
        
       
       
        
    })
}