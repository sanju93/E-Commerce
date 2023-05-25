
window.addEventListener('load',async function(){
   var res = await this.fetch('/users/getAdminData');

   var data = await res.json();

   console.log(data);
})




