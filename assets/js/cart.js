class Cart {
  constructor() {
    this.items = [];
  }
  addProduct(product, qty) {
    product.quantidade = qty;
    //let a = [...new Set(product)];
    this.items.push(product);
  }
  getProducts() {
    return this.items;
  }
}
const productShop = new Cart();
