const PageEvent = {
  LoadEventPage : function() {
    $$(".pagination ul li")?.forEach(page => {
      page.onclick = function(){
        $("#input-page").value = this.dataset.page;
        renderListProductShopAtPage(this.dataset.page,);
        renderPage(this.dataset.page);
        PageEvent.LoadEventPage();
        CartEvent.AddToCart();
        //alert(this.dataset.page);
      }
    })
  },
  LoadEventPageByDocument : function(document) {
    $$(".pagination ul li")?.forEach(page => {
      page.onclick = function(){
        $("#input-page").value = this.dataset.page;
        renderListProductShopAtPage(this.dataset.page,document);
        renderPage(this.dataset.page, ProductModel.getTotalPage(document));
        PageEvent.LoadEventPageByDocument(document);
        CartEvent.AddToCart();
      }
    })
  },
  LoadPageCurrent : function(current){

  }
}