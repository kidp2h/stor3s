const Validate = {
  isEmail : function(text){
    let pattern = /[a-zA-Z0-9]+\@[a-zA-Z0-9]+\.[a-zA-Z]+(\.[a-zA-Z]+)?/g;
    return text.match(pattern)?.length > 0 
  },
  isPhone : function(text){
    let pattern = /^0[0-9\s.-]{9,12}$/g;
    return text.match(pattern)?.length > 0
  }
}