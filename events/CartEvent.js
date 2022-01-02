const CartEvent = {
  IncreaseQuantity : function (quantity) {
    $$(".increase-qty span")?.forEach((ele => {
      ele.onclick = function(){
        if(this.textContent == "+"){
          let temp = Number(this.parentElement.querySelector("input").value)
          this.parentElement.querySelector("input").value = temp + 1;
        }else{
          let temp = Number(this.parentElement.querySelector("input").value);
          if(temp - 1 == 0){
            this.parentElement.parentElement.parentElement.querySelector(".action").click();
          }else{
            this.nextElementSibling.value = temp - 1;
          }
          
        }
        let qty = this.parentElement.parentElement.querySelector(".item-info .quantity");
        qty.textContent = this.parentElement.querySelector("input").value
        updateCart();
      }
    }))
  },
  RemoveItem : function(quantity) {
    $$(".cart__item .action")?.forEach(ele => {
      ele.onclick = function(){
        let id = this.dataset.id;
        this.parentElement.remove();
        let cart = JSON.parse(localStorage.getItem("cart"));
        let newCart = cart.filter(item => item.product.id != id)
        localStorage.setItem("cart",JSON.stringify(newCart))
        updateCart();
      }
    })
  },
  AddToCart : function(){
    $$(".popular-product button, .popular-shop button")?.forEach(btn => {
      btn.onclick = function(){
        addToCart(Number(this.dataset.id));
      }
    })
  },
  Initialize : function(){
    this.IncreaseQuantity();
    this.RemoveItem();
  }
}