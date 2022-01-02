let stringURL = window.location.href
let url = new URL(stringURL);
let id = url.searchParams.get("id");

let product = ProductModel.getProductById(id)
let component = `
  <div class="img">
    <img src="${product.img}" class="image-product">
  </div>
  <div class="separator"></div>
  <div class="info-product">
    <a href="./index.html" class="back-to-home"><i class="ion-arrow-left-c"></i>Back to home</a>
    <span class="category-product">${product.category}</span>
    <span class="name-product">${product.name}</span>
    <div class="stars">
      <i class="ion-ios-star"></i>
      <i class="ion-ios-star"></i>
      <i class="ion-ios-star"></i>
      <i class="ion-ios-star"></i>
      <i class="ion-ios-star"></i>
    </div>
    <div class="group-form-product">
      <span>Select quality</span>
      <div class="quality-product">
        <div>OLD</div>
        <div>NEW</div>
      </div>
    </div>
    <div class="group-form-product">
      <span>Price</span>
      <div class="price-product">
        <span>${formatMoney(product.price)}</span>
      </div>
    </div>
    <div class="group-form-product">
      <span>Color</span>
      <div class="list-color">
        <div class="black"></div>
        <div class="pink"></div>
        <div class="green"></div>
      </div>
    </div>
    <div class="group-form-product">
      <span>Size</span>
      <div class="list-size">
        <div>36</div>
        <div>37</div>
        <div>38</div>
        <div>39</div>
        <div>40</div>
      </div>
    </div>
    <div class="btn btn-primary add-to-cart">ADD TO CART</div>
  </div>
`
$(".product-detail").innerHTML = component
eventDetailProduct();
function eventDetailProduct(){
  $$(".list-color div")?.forEach((color) => {
    color.onclick = function () {
      $$(".list-color div")?.forEach((item) => item.classList.remove("active"));
      this.classList.add("active");
    }
  })
  $$(".list-size div")?.forEach((color) => {
    color.onclick = function () {
      $$(".list-size div")?.forEach((item) => item.classList.remove("active"));
      this.classList.add("active");
    }
  })
  $$(".quality-product div")?.forEach((color) => {
    color.onclick = function () {
      $$(".quality-product div")?.forEach((item) => item.classList.remove("active"));
      this.classList.add("active");
    }
  })
  $(".add-to-cart").onclick = function(){
    addToCart(id);
  }
}

