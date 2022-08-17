class Cart {
  constructor() {
    this.items = [];
  }
  addProduct(product, qty) {
    product.quantidade = qty;
    this.items.push(product);
  }
  checkDuplicate(arr) {
    let arrNew = [...new Set(arr)];
    return arrNew;
  }
  getProducts() {
    return this.items;
  }
}
const productShop = new Cart();
