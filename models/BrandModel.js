const BrandModel = {
  Initialize: function (newData) {
    localStorage.setItem("brands", JSON.stringify(BRANDS));
  },
  getAll: function () {
    return JSON.parse(localStorage.getItem("brands"));
  }
}


if (BrandModel.getAll() == null) BrandModel.Initialize();