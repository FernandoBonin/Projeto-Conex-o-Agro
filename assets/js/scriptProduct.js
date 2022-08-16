"use strict";

// CLONE TEMPLATE
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
}

creatTemplate(products);

// GET ELEMENTS
const category = document.getElementById("category");
const searchBar = document.getElementById("searchBar");
let allCards = document.querySelectorAll(".cardAreaClass");
let inputProdQty = document.querySelectorAll(".inputProdQty");
const elementFilterValue = document.getElementById("filterValue");

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
  allCards.forEach((item) => {
    item.classList.remove("d-none");
    let dataCategory = item.getAttribute("data-category");
    if (dataCategory != category.value) {
      item.classList.add("d-none");
    }
    if (category.value == "Categorias") {
      item.classList.remove("d-none");
    }
  });
}

// EVENT SEARCH BAR
searchBar.addEventListener("keyup", searchProduct);
function searchProduct(event) {
  let searchBarValue = formatName(event.target.value);
  allCards.forEach((item) => {
    let dataName = formatName(item.getAttribute("data-name"));
    if (!dataName.includes(searchBarValue)) {
      item.classList.add("d-none");
    } else {
      item.classList.remove("d-none");
    }
  });
}

// EVENT FILTER VALUE
elementFilterValue.addEventListener("change", () => {
  let selectValue = elementFilterValue.value;
  let productusOrderly;
  let cardsClass = document.querySelectorAll(".cardAreaClass");

  cardsClass.forEach((item) => {
    item.remove();
  });

  if (selectValue == "") {
    creatTemplate(products);
    return;
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
});

// GET PRODUCT VALUE
let resultQtyInput;
let resultCurrency;
inputProdQty.forEach((item) => {
  item.addEventListener("change", () => {
    console.log(item);
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
        if (valueInput >= 0) {
          totalProduct.style.color = "black";
          totalProduct.innerHTML = "Total: " + resultCurrency;
        } else {
          totalProduct.style.color = "red";
          totalProduct.innerHTML = "Digite um valor válido";
        }
      }
    });
  });
});
