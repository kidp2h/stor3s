let listProduct = ProductModel.getDocumentsByPage(2)
let components = '';
listProduct.forEach(product => {
  components += `
  <div class="popular-product">
    <div class="logo-product">
      <img src="${product.imgCategory}" alt="logo">
      <i class="ion-ios-more"></i>
    </div>
    <div class="main-images">
      <a href="../pages/detail.html?id=${product.id}"><span class="see-detail">SEE DETAIL <i class="ion-ios-eye-outline"></i></span></a>
      <div class="main__box-image">
        <img id="blue" class="blue active" src="${product.img}" alt="blue">
      </div>
    </div>
    <div class="shoe-details">
      <span class="shoe_name">${product.name.length >= 20 ? product.name.slice(0,21)+"..." : product.name}</span>
      <p>
        Lorem ipsum dolor sit lorenm i amet, consectetur adipisicing elit.
        Eum, ea, ducimus!
      </p>
      <div class="stars">
        <i class="ion-ios-star"></i>
        <i class="ion-ios-star"></i>
        <i class="ion-ios-star"></i>
        <i class="ion-ios-star"></i>
        <i class="ion-ios-star"></i>
      </div>
      <div>Price : ${formatMoney(product.price)}</div>
    </div>
    <div class="button">
      <div class="button-layer"></div>
      <button data-id="${product.id}">ADD TO CART</button>
    </div>
  </div>
  `
})
$(".list-product-popular").innerHTML = components

CartEvent.AddToCart();