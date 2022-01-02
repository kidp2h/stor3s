const UserModel = {
  Initialize: function (newData) {
    localStorage.setItem('users', JSON.stringify(USERS));
  },
  getAll: function () {
    return JSON.parse(localStorage.getItem('users'));
  },
  UpdateAll: function (data) {
    localStorage.setItem('users', JSON.stringify(data));
  },
  checkLogin: function(username,password){
    let collection = this.getAll();
    return (collection?.filter(user => user.username == username && user.password == password))?.[0]
  },
  setSession : function(username){
    let collection = this.getAll();
    let user = (collection?.filter(user => user.username == username))?.[0]
    localStorage.setItem('session', JSON.stringify(user));
    return user;
  },
  getSession : function(username){
    return JSON.parse(localStorage.getItem('session'));
  },
  clearSession : function(){
    localStorage.removeItem('session');
  },
  Insert: function (document) {
    result = this.getAll();
    if(this.CheckUsername(document.username) || this.checkPhone(document.phone)){
      return {
        username: this.CheckUsername(document.username),
        phone: this.checkPhone(document.phone),
      }
    }else{
      result.push(document);
      this.UpdateAll(result);
      return true;
    }

  },
  getNextId() {
    return Math.max(...this.getAll().map((user) => user.id));
  },
  CheckEmail(email){
    let collection = this.getAll();
    return (collection?.filter(user => user.email == email))?.[0]
  },
  CheckUsername(username){
    let collection = this.getAll();
    return (collection?.filter(user => user.username == username))?.[0]
  },
  checkPhone(phone){
    let collection = this.getAll();
    return (collection?.filter(user => user.phone == phone))?.[0]
  },
  getCart(id){
    let collection = this.getAll();
    return (collection?.filter(user => user.id == id))?.[0].cart
  },
  setCart(cart){
    let user = this.getSession();
    user.cart = cart;
    localStorage.setItem('cart', JSON.stringify(cart));
    this.updateCartUser(cart,user.id)
  },
  updateCartUser(cart,id){
    let collection = this.getAll();
    for (let document of collection) {
      if(document.id == id){
        document.cart = cart;
      }
    }
    this.UpdateAll(collection)
  },
  isLogin(){
    return JSON.parse(localStorage.getItem('session')) != null
  },
  getCurrentIdUser(){
    return JSON.parse(localStorage.getItem('session'))?.id
  },
  userCheckout(id,cart){
    let collection = this.getAll();
    collection.forEach(document => {
      if(document.id == id){
        document.cart = [];
      }
    })
    this.UpdateAll(collection);
    this.setCart([]);
    OrderModel.insertOrder(cart,id)
  }
}
if (UserModel.getAll() == null) UserModel.Initialize();