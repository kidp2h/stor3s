const ProductModel = {
  Initialize: function (newData) {
    localStorage.setItem("products", JSON.stringify(PRODUCTS));
  },
  getAll: function () {
    return JSON.parse(localStorage.getItem("products"));
  },
  getProductById: function (id) {
    let collection = this.getAll();
    let result = collection.filter((product) => product.id == id);
    return result[0];
  },
  getTotalPage: function (document = this.getAll()) {
    return (totalPageUser =
      document.length % LIMIT == 0
        ? document.length / LIMIT
        : document.length / LIMIT + 1);
  },
  getDocumentsByPage: function (page, document = this.getAll()) {
    return document.slice((page - 1) * LIMIT, page * LIMIT);
  },
  getProductByBrand(category = "0") {
    if (category == 0) return this.getAll();
    return this.getAll().filter((product) => product.category.toLowerCase() == category.toLowerCase());
  },
  Search(min, max, name, category) {
    let patternCategory = !category
      ? new RegExp(".*", "g")
      : new RegExp(`^${category.toLowerCase()}$`, "g");
    let patternName =
      name == ""
        ? new RegExp(".*", "g")
        : new RegExp(`${name.toLowerCase()}`, "g");
        console.log(patternName);
    let products = [];
    ProductModel.getAll()?.forEach((product) => {
      if (
        min <= product.price &&
        product.price <= max &&
        product.category.toLowerCase().match(patternCategory) &&
        product.name.toLowerCase().match(patternName)
      ) {
        products.push(product);
      }
    });
    return products;
  },
  Pagination(c,m) {
    let current = c,
      left = current - 2,
      right = current + 2,
      range = [],
      rangeWithDots = [],
      l;

    for (let i = 1; i <= m; i++) {
      if (i == 1 || (i > left && i <= right) || i == m) {
        range.push(i);
      }
    }

    for (let i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push("...");
        }
      }
      rangeWithDots.push(i);
      l = i;
    }
    return rangeWithDots;
  },
};
if (ProductModel.getAll() == null) ProductModel.Initialize();
