class Cart {
  constructor() {
    this.items = [...new Set()];
    this.keys = new Set();
    this.totalPrice = 0;
  }

  addProduct(product, qty) {
    let clone = Object.assign({}, product);
    qty = parseInt(qty);
    clone.total = clone.valor * qty;
    if (!clone.quantidade) clone.quantidade = qty;

    if (this.keys.has(clone.nome)) {
      let find = this.items.find((item) => item.nome == clone.nome);
      let findNumber = find.quantidade;
      const word = findNumber <= 1 ? "Kilo" : "Kilos";
      if (
        !confirm(
          `Você ja possui ${findNumber} ${word}, deseja adicionar mais ${qty}`
        )
      )
        return;

      find.quantidade += clone.quantidade;
      find.total += clone.total;
      this.totalPrice += clone.total;

      return;
    }
    if (!confirm("Você deseja adicionar este item ao seu carrinho ?")) return;

    this.keys.add(clone.nome);
    this.items.push(clone);
    this.totalPrice += clone.total;
  }

  getProducts() {
    return this.items;
  }

  getTotalPriceCart() {
    return this.totalPrice.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });
  }
}

const productShop = new Cart();
