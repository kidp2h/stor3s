
function renderCart(cart){
  let ItemComponents = ``
  let subtotal = 0;
  cart?.forEach(item => {
    ItemComponents += `
      <div class="cart__item">
        <a href="./detail.html?id=${item.product.id}">
          <img src="${item.product.img}" class="item-image" alt="">
        </a>
        <div class="item-info">
          <h4>${item.product.name.length >= 20 ? item.product.name.slice(0,21)+"..." : item.product.name}</h4>
          <div>
            <span class="quantity">${item.quantity}</span>
            <span>x</span>
            <span class="price">${formatMoney(item.product.price)}</span>
          </div>
          <div class="increase-qty">
            <span>-</span>
            <input type="number" class="input-qty" value="${item.quantity}">
            <span>+</span>

          </div>
        </div>
        <div class="action" data-id="${item.product.id}">x</div>
      </div>
    `
    subtotal += item.quantity*item.product.price
  })
  $(".cart__list-products").innerHTML = ItemComponents;
  $(".subtotal span").textContent = "Total: "+formatMoney(subtotal)
  CartEvent.Initialize();
}

function renderListProductShopAtPage(page = 1,document = ProductModel.getAll()) {
  let listProductShop = ProductModel.getDocumentsByPage(page, document);
  let components = "";
  listProductShop.forEach((product) => {
  components += `
  <div class="popular-product">
    <div class="logo-product">
      <img src="${product.imgCategory}" alt="logo">
      <i class="ion-ios-more"></i>
    </div>
    <div class="main-images">
      <a href="../pages/detail.html?id=${
        product.id
      }"><span class="see-detail">SEE DETAIL <i class="ion-ios-eye-outline"></i></span></a>
      <div class="main__box-image">
        <img id="blue" class="blue active" src="${product.img}" alt="blue">
      </div>
    </div>
    <div class="shoe-details">
      <span class="shoe_name">${
        product.name.length >= 20
          ? product.name.slice(0, 21) + "..."
          : product.name
      }</span>
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
  `;
  });
  $(".products-in-shop").innerHTML = components;
}

function renderPage(current, max = ProductModel.getTotalPage()){
  
  let range = ProductModel.Pagination(Number(current), max)
  //console.log(current,max,range )
  console.log(max)
  let PageComponent = ``
  range.forEach((page) => {
    if(page == "..."){
      PageComponent += `<li class="three-dots">${page}</li>`
    }else if(Number(page) == Number(current)){
      PageComponent += `<li class="page active" data-page="${page}">${page}</li>`
    }else{
      PageComponent += `<li class="page" data-page="${page}">${page}</li>`
    }
    
  })
  $(".pagination ul").innerHTML = PageComponent;
}