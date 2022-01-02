const OrderModel = {
  Initialize: function () {
    localStorage.setItem("orders", JSON.stringify([]));
  },
  getAll: function () {
    return JSON.parse(localStorage.getItem("orders"));
  },
  getOrderByIdUser: function(userId){
    let collection = this.getAll();
    return collection.filter(document => document.userId == userId);
  },
  insertOrder : function(cart,userId){
    let collection = this.getAll();
    console.log(cart)
    let order = {
      userId: userId,
      cart : cart
    }
    collection.push(order);
    console.log(collection)
    localStorage.setItem("orders", JSON.stringify(collection));
  }
}
if (OrderModel.getAll() == null) OrderModel.Initialize();