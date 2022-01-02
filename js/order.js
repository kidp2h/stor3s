function loadOrders() {
  let currentId = UserModel.getCurrentIdUser();
  let listOrders = OrderModel.getOrderByIdUser(currentId);
  console.log(listOrders);
  let listOrderComponents = ``;
  let count = 1;
  listOrders.forEach((order) => {
    listOrderComponents += `
  <div class="order">
    <h2>ORDER #${count}</h2>
    <div class="list-product-in-order">`;
    let total = 0;
    order.cart.forEach((item) => {
      listOrderComponents += `
      <div class="product-order">
        <div class="order__product-wrap">
          <div class="img-box">
            <img src="${item.product.img}" alt="" srcset="">
          </div>
          <div class="order__product-info">
            <h4>${item.product.name}</h4>
            <span>QTY : ${item.quantity}</span>
            <span>Price : ${formatMoney(item.product.price)}</span>
          </div>
        </div>
        <div class="order__subtotal"><span>${formatMoney(
          Number(item.quantity) * Number(item.product.price)
        )}</span></div>
      </div>
  `;
      total += Number(item.quantity) * Number(item.product.price);
    });
    listOrderComponents += `
      <div class="order__total"><span>TOTAL: ${formatMoney(total)}</span></div>
    </div>
  </div>`;
    ++count;
  });
  $(".list-orders").innerHTML = listOrderComponents;
}
loadOrders();