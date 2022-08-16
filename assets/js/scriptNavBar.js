"use strick";

const btnMobile = document.getElementById("btnMobile");

btnMobile.addEventListener("click", showMenuMobile);

function showMenuMobile() {
  const navArea = document.getElementById("navArea");
  navArea.classList.toggle("active");
}
