const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);


function formatMoney(value){
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value)
}

function updateCart(){
  let newCart = [];
  $$(".cart__list-products .cart__item")?.forEach(element => {
    let id = Number(element.querySelector(".action").dataset.id)
    newCart.push({product : ProductModel.getProductById(id),quantity : Number(element.querySelector(".input-qty").value)})
  })
  UserModel.setCart(newCart);
  renderCart(newCart);
}
function getCartTemp(){
  return JSON.parse(localStorage.getItem("cart"));
}
function addToCart(id){
  if(!UserModel.isLogin()){
    toast("warning",icon["warning"],"Please login before purchase product !!")
    $(".ion-ios-person-outline").click();
  }else{
    let cart = JSON.parse(localStorage.getItem("cart"));
    let found = 0;
    for (let item of cart) {
      if(item.product.id == id){
        item.quantity = Number(item.quantity) + 1;
        found = 1;
      }
    }
    if(!found){
      cart.push({product : ProductModel.getProductById(id),quantity : 1})
    }
    localStorage.setItem("cart",JSON.stringify(cart))
    if(UserModel.isLogin()){
      UserModel.updateCartUser(cart,UserModel.getSession().id)
    }
    renderCart(cart);
    toast("success",icon["success"],"Product was added your cart !!")
  }
}