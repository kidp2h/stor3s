//renderCart(local)
let current = Number($("#input-page").value);
renderListProductShopAtPage(current);
renderPage(current);
PageEvent.LoadEventPage();
CartEvent.AddToCart();

let listBrands = BrandModel.getAll();
let BrandComponents = ''
listBrands.forEach(brand => {
  BrandComponents+=`
  <div class="brand" data-brand="${brand.name}">
    <img src="${brand.img}" alt="" width="40" height="40">${brand.name}
  </div>`
})
$(".wrap-brand").innerHTML = BrandComponents;
BrandEvent();


function BrandEvent(){
  $$(".wrap-brand .brand")?.forEach(brand => {
    brand.onclick = function(){
        $$(".wrap-brand .brand")?.forEach(item => item.classList.remove("active"));
        this.classList.add("active");
    }
    brand.ondblclick = function(){
      $$(".wrap-brand .brand")?.forEach(item => item.classList.remove("active"))
    }
  })
}

$(".btn-filter").onclick = function(){
  let nameBrand = 0
  let min = $("#minPrice").value || 0;
  let max = $("#maxPrice").value || 9999999999999999;
  let name = $(".byName input").value || '';
  $$(".wrap-brand .brand")?.forEach(brand => {
    if(brand.classList.contains("active")) {
      nameBrand = brand.dataset.brand.toLowerCase();
    }
  })
  console.log(nameBrand, min, max,name);
  let result = ProductModel.Search(Number(min), Number(max), name, nameBrand);
  let totalPage = ProductModel.getTotalPage(result)
  renderListProductShopAtPage(current,result);
  renderPage(1, totalPage)
  PageEvent.LoadEventPageByDocument(result);
  CartEvent.AddToCart();
}