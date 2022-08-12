"use strict";

// CLONE TEMPLATE
if ("content" in document.createElement("template")) {
  const cardsArea = document.getElementById("cardsArea");

  product.forEach((item) => {
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
  console.error("Seu navegador não suporte template");
}

// GET ELEMENTS
const category = document.getElementById("category");
const searchBar = document.getElementById("searchBar");
let allCards = document.querySelectorAll(".cardAreaClass");

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
