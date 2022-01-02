//  login
$("#login").onclick = function () {
  let flag = 0;
  let username = $("#username").value;
  let password = $("#password").value;
  $("#username").style.borderColor = "white";
  $("#password").style.borderColor = "white";
  if(username == ""){
    $("#username").style.borderColor = "red";
    flag = 1;
  }
  if(password == ""){
    $("#password").style.borderColor = "red";
    flag = 1;
  }
  if(!flag){
    if(UserModel.checkLogin(username, password)){
      toast("success", icon["success"], "Login successfully !!")
      $(".modal-user .close").click()
      let user = UserModel.setSession(username);
      $(".settings-dropdown").style.display = 'flex';
      localStorage.setItem("cart",JSON.stringify(user.cart))
      renderCart(user.cart)
      CartEvent.Initialize();
    }else{
      if(!flag)
      toast("danger", icon["danger"], "Username or password incorrect !!");
    }
  }

};
$(".logout").onclick = function(){
  $(".settings-dropdown").style.display = 'none';
  toast("success", icon["success"], "Log out successfully !!")
  UserModel.clearSession();
  $(".cart__list-products").innerHTML = '';
  localStorage.setItem("cart",JSON.stringify([]))
  if(window.location.href.includes("order")){
    window.location.href = "./index.html"
  }
}

$("#register").onclick = function(){
  console.log("xxxx")
  let inputs = ["#_username","#fullname","#address","#phone","#_password","#re-password"]
  let flag = 0,temp = [];

  inputs.forEach(selector => {
    $(selector).style.borderColor = "white";
    let value = $(selector).value
    if(value == null || value == undefined || value.trim() == "" ){
      $(selector).style.borderColor = "red";
      flag = -1
    }
  })
  if(!flag){
    let username = $("#_username")
    let password = $("#_password")
    let rePassword = $("#re-password")
    if(!(username.value.length >= 6 && username.value.length < 13)){
      username.value = ""
      username.placeholder = "Must have length 6 - 12"
      username.style.borderColor = "red"
      temp.push(0)
    }else{
      username.placeholder = "Enter your username"
      username.style.borderColor = "white"
    }
    if(password.value != rePassword.value){
      password.value = ""
      password.placeholder = "Password and confirm password not match"
      password.style.borderColor = "red"
      rePassword.value = ""
      rePassword.placeholder = "Password and confirm password not match"
      rePassword.style.borderColor = "red"
      temp.push(0)
    }else{
      if(password.value.length < 8){
        password.value = ""
        password.placeholder = "Password is weak"
        password.style.borderColor = "red"
        rePassword.value = ""
        rePassword.placeholder = "Password is weak"
        rePassword.style.borderColor = "red"
        temp.push(0)
      }else{
        password.placeholder = "Enter your password"
        password.style.borderColor = "white"
        rePassword.placeholder = "Re-enter your password"
        rePassword.style.borderColor = "white"
      }
    }
  }
  if(!flag){
    console.log("yyy")
    console.log(temp.length)
    if(temp.length == 0){
      let id = UserModel.getNextId();
      let user =   {
        id : id,
        fullname: $('#fullname').value,
        address:$('#address').value ,
        phone: $('#phone').value,
        username: $('#_username').value ,
        password: $('#_password').value,
        cart: [],
      }
      let result = UserModel.Insert(user);
      console.log(result);
      if(result == true){
        toast("success",icon["success"],"Sign up successfully !!");
        $(".toSignIn").click();
        $("#username").value = user.username;
        $("#password").value = user.password
      }else{
        if(result.username){
          toast("warning",icon["warning"],"Username is exist !!")
          $("#_username").style.borderColor = "red";
        }
        if(result.phone) {
          toast("warning",icon["warning"],"Phone is exist !!")
          $("#phone").style.borderColor = "red";
        }
      }
    }
  }

}
