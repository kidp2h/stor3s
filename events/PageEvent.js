const PageEvent = {
  LoadEventPage : function() {
    $$(".pagination ul li")?.forEach(page => {
      page.onclick = function(){
        $("#input-page").value = this.dataset.page;
        renderListProductShopAtPage(Number(this.dataset.page));
        renderPage(Number(this.dataset.page));
        PageEvent.LoadEventPage();
        CartEvent.AddToCart();
      }
    })
    $$(".pagination span").forEach(btn => {
      btn.onclick = function(){
        if(btn.classList.contains("prev")){
          if(Number($("#input-page").value)  > 1){
            $("#input-page").value = Number($("#input-page").value) - 1;
          }
          
        }else{
          let max = Number($(".pagination li:last-child").dataset.page);
          if(Number($("#input-page").value) < max){
            $("#input-page").value = Number($("#input-page").value) + 1;
          }
        }
        // alert("1")
        renderListProductShopAtPage(Number($("#input-page").value));
        renderPage(Number($("#input-page").value));
        PageEvent.LoadEventPage();
        CartEvent.AddToCart();
      }
    })
  },
  LoadEventPageByDocument : function(document) {
    $$(".pagination ul li")?.forEach(page => {
      page.onclick = function(){
        $("#input-page").value = this.dataset.page;
        renderListProductShopAtPage(Number(this.dataset.page),document);
        renderPage(Number(this.dataset.page), ProductModel.getTotalPage(document));
        PageEvent.LoadEventPageByDocument(document);
        CartEvent.AddToCart();
      }
    })
    $$(".pagination span").forEach(btn => {
      btn.onclick = function(){
        if(btn.classList.contains("prev")){
          if(Number($("#input-page").value)  > 1){
            $("#input-page").value = Number($("#input-page").value) - 1;
          }
          
        }else{
          let max = Number($(".pagination li:last-child").dataset.page);
          if(Number($("#input-page").value) < max){
            $("#input-page").value = Number($("#input-page").value) + 1;
          }
        }
        // alert("2");
        renderListProductShopAtPage(Number($("#input-page").value),document);
        renderPage(Number($("#input-page").value), ProductModel.getTotalPage(document));
        PageEvent.LoadEventPageByDocument(document);
        CartEvent.AddToCart();
      }
    })
  }
}