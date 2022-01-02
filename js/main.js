if(UserModel.getSession() != null){
  $(".settings-dropdown").style.display = 'flex';
}
function toast(type, icon, text) {
  let toast = document.createElement('div');
  let html = `                
  <div class="alert ${type}">
    <div class="alert-icon">
      <i class="fas ${icon}"></i>
    </div>
    <div class="alert-text">
      <span>${text}</span>
    </div>
    <div class="alert-close">
      <i class="ion-android-close"></i>
    </div>
  </div>`;
  console.log(html);
  toast.innerHTML = html;
  toast.style.transition = 'all 1s';
  $('.groups-alert').prepend(toast);
  const removeToast = setTimeout(() => {
    $('.groups-alert').removeChild(toast);
  }, 2000);
  toast.onclick = function (e) {
    if (e.target.closest('.alert-close')) {
      toast.style.transform = 'translate(-500px)';
      setTimeout(() => {
        $('.groups-alert').removeChild(toast);
      }, 1000);
      clearTimeout(removeToast);
    }
  };
}

$$('.sidebar li:not(:first-child)')?.forEach((item) =>
item.addEventListener('click', function () {
  $$('.pagination')?.forEach((item) => {
    item.classList.remove('hidden');
  });
  $$('.sidebar li')?.forEach((item) => item.classList.remove('active'));
  this.classList.add('active');
  $('.sidebar').classList.add('active');
  $('.main-content').classList.add('active');
  $('.toggle').classList.remove('open');
})
);
$('.toggle').onclick = () => {
$$('.pagination')?.forEach((item) => {
  item.classList.toggle('hidden');
});
$('.sidebar').classList.toggle('active');
$('.main-content').classList.toggle('active');
$('.toggle').classList.toggle('open');
};
$(".main-content .user i:first-child").onclick = () => {
  if(UserModel.getSession() != null){
    $(".settings-dropdown").style.display = 'flex';
  }else{
    $(".modal-user").classList.add('active');
    $(".overlay-modal").classList.toggle("active");
    $("body").classList.toggle("prevent-scroll");
  }
  
}
$(".modal-user .close").onclick = () => {
  $(".modal-user").style.transition = "all 1s";
  $(".modal-user").style.transform = "translate(-50%,-300%)";
  $(".overlay-modal").classList.toggle("active")
  setTimeout(() => {
    $(".modal-user").classList.toggle('active');

    $(".modal-user").style.transform = "translate(-50%,-50%)";
  },500)
  $("body").classList.toggle("prevent-scroll");
}
$(".toSignIn").onclick = () => {
  $(".modal-content-register").style.transform = "translateY(-300%)";
  setTimeout(() => {
    $(".modal-content-register").classList.toggle("active")
    $(".modal-content-login").classList.toggle("active")
    $(".modal-content-register").style.transform = "translateY(0)";
    $(".modal-header .title span").textContent = "SIGN IN"
  },500)
  $(".modal-content-login").animate([
    // keyframes
    { transform: 'translateY(300%)',opacity:0.3 },
    { transform: 'translateY(0)',opacity:1 }
  ], {
    // timing options
    duration: 1000
  });
  
}

$(".toSignUp").onclick = () => {
  //alert('x');
  $(".modal-content-login").style.transform = "translateY(300%)";
  setTimeout(() => {
    $(".modal-content-register").classList.toggle("active")
    $(".modal-content-login").classList.toggle("active")
    $(".modal-content-login").style.transform = "translateY(0)";
    $(".modal-header .title span").textContent = "SIGN UP"
  },500)
  $(".modal-content-register").animate([
    // keyframes
    { transform: 'translateY(-300%)',opacity:0.3 },
    { transform: 'translateY(0)' ,opacity:1}
  ], {
    // timing options
    duration: 1000
  });
  
}
$(".open-cart").onclick = function(){
  $(".sidecart").classList.add("active");
}
$(".close-cart").onclick = function(){
  $(".sidecart").style.transform = "translateX(400px)"

  setTimeout(() => {
    $(".sidecart").classList.remove("active");
    $(".sidecart").style = null
  },500)
}
if(UserModel.isLogin()){
  renderCart(UserModel.getCart(UserModel.getCurrentIdUser()))
}

$(".subtotal .btn-danger").onclick = function(){
  if(!UserModel.isLogin() || UserModel.getCart(UserModel.getCurrentIdUser()).length <= 0 ){
    toast("warning",icon['warning'],"Cart is empty");
  }else{
    toast("success",icon['success'],"Order is successfully !!");
    UserModel.userCheckout(UserModel.getCurrentIdUser(),UserModel.getCart(UserModel.getCurrentIdUser()))
    $(".cart__list-products").innerHTML = ""
    $(".subtotal span").innerHTML = "Total: $0.00"
    if(window.location.href.includes("order")){
      loadOrders();
    }
  }
}

