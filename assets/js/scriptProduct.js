"use strict";

// GET ELEMENTS
const category = document.getElementById("category");
const searchBar = document.getElementById("searchBar");
const elementFilterValue = document.getElementById("filterValue");

// CREAT TEMPLATE
function creatTemplate(productArr) {
  if ("content" in document.createElement("template")) {
    const cardsArea = document.getElementById("cardsArea");

    productArr.forEach((item) => {
      const temp = document
        .getElementById("templateCards")
        .content.cloneNode(true);
      temp.querySelector("img").setAttribute("src", item.imagem);
      temp.querySelector("h4").innerText += item.nome;
      temp.querySelector("p").innerText = item.valor.toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL",
      });

      // GET VALUE PRODUCTS
      let totalPrice = temp.querySelector(".totalPrice");
      temp
        .querySelector(".inputProdQty")
        .addEventListener("change", (event) => {
          const qtyInput = event.target.value;
          const valueTotal = calculatePrice(qtyInput, item);
          let totalPriceColor = "red";
          let totalPriceText = "Digite um valor válido";
          if (qtyInput > 0) {
            totalPriceColor = "black";
            totalPriceText = "Total: " + valueTotal;
          }
          totalPrice.style.color = totalPriceColor;
          totalPrice.innerHTML = totalPriceText;
        });

      // CART SHOP
      const qtyProd = temp.querySelector(".inputProdQty");
      temp.querySelector(".btnShopCart").addEventListener("click", () => {
        let qtyProdValue = qtyProd.value;
        if (qtyProdValue <= 0) return alert("Digite uma quantidade válida");

        productShop.addProduct(item, qtyProdValue);

        console.log(
          productShop.getProducts(),
          "----------",
          productShop.getTotalPriceCart()
        );

        totalPrice.innerHTML = "";
        qtyProd.value = 0;
      });

      cardsArea.appendChild(temp);
    });
  } else {
    console.error("Seu navegador não suporta template");
  }
}

creatTemplate(products);

// CALCULATE PRODUCT PRICE
function calculatePrice(qty, product) {
  const total = product.valor * qty;
  return total.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
}

// FORMAT NAME
function formatName(name) {
  return name
    .toLowerCase()
    .replace("ã", "a")
    .replace("ç", "c")
    .replace("ó", "o")
    .replace("ú", "u")
    .replace(/\s+/g, "")
    .trim();
}

// EVENT SELECT CATEGORY
category.addEventListener("change", selectCategory);
function selectCategory() {
  let categoryValue = category.value;
  let productsCategory = [];
  let allCards = document.querySelectorAll(".cardAreaClass");

  allCards.forEach((item) => {
    item.remove();
  });

  if (categoryValue == "Categorias") {
    return creatTemplate(products);
  }

  products.forEach((item) => {
    if (categoryValue == item.categoria) {
      return productsCategory.push(item);
    }
  });
  creatTemplate(productsCategory);
}

// EVENT SEARCH BAR
searchBar.addEventListener("keyup", searchProduct);
function searchProduct(event) {
  let searchBarValue = formatName(event.target.value);
  let allCards = document.querySelectorAll(".cardAreaClass");
  let searchBarArr = [];

  allCards.forEach((item) => {
    item.remove();
  });

  products.forEach((item) => {
    let productsName = formatName(item.nome);
    if (productsName.includes(searchBarValue)) {
      return searchBarArr.push(item);
    }
  });
  creatTemplate(searchBarArr);
}

// EVENT FILTER VALUE
elementFilterValue.addEventListener("change", filterValue);
function filterValue() {
  let selectValue = elementFilterValue.value;
  let productusOrderly;
  let allCards = document.querySelectorAll(".cardAreaClass");

  allCards.forEach((item) => {
    item.remove();
  });

  if (selectValue == "") {
    return creatTemplate(products);
  }

  if (selectValue == 1) {
    productusOrderly = products.slice().sort((a, b) => {
      if (a.valor < b.valor) {
        return -1;
      } else {
        return true;
      }
    });
  }

  if (selectValue == 2) {
    productusOrderly = products.slice().sort((a, b) => {
      if (a.valor > b.valor) {
        return -1;
      } else {
        return true;
      }
    });
  }
  creatTemplate(productusOrderly);
}
