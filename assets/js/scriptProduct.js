"use strict";

// GET ELEMENTS
const category = document.getElementById("category");
const searchBar = document.getElementById("searchBar");
const elementFilterValue = document.getElementById("filterValue");

// VARIABLES
let inputProdQty;
let resultQtyInput;
let resultCurrency;

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
      let getData = temp.querySelector("img").parentElement.parentElement;
      getData.setAttribute("data-category", item.categoria);
      getData.setAttribute("data-name", item.nome);

      cardsArea.appendChild(temp);
    });
  } else {
    console.error("Seu navegador não suporta template");
  }

  // GET VALUE PRODUCTS
  inputProdQty = document.querySelectorAll(".inputProdQty");

  inputProdQty.forEach((item) => {
    item.addEventListener("change", getValueInput);
    function getValueInput() {
      let totalProduct =
        item.parentElement.parentElement.parentElement.lastElementChild;
      let dataName =
        item.parentElement.parentElement.parentElement.parentElement.getAttribute(
          "data-name"
        );
      let valueInput = item.value;

      products.forEach((item) => {
        if (dataName == item.nome) {
          resultQtyInput = valueInput * item.valor;
          resultCurrency = resultQtyInput.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
          });
        }
      });
      if (valueInput > 0) {
        totalProduct.style.color = "black";
        totalProduct.innerHTML = "Total: " + resultCurrency;
      } else {
        totalProduct.style.color = "red";
        totalProduct.innerHTML = "Digite um valor válido";
      }
    }
  });
}

creatTemplate(products);

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
