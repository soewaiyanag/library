const body = document.querySelector("body");
const toggle = document.querySelector(".toggle__switch");

toggle.addEventListener("click", () => {
  body.classList.toggle("disable");
});

const form = document.querySelector("form");
const addBookBtn = document.querySelector(".add-book");

addBookBtn.addEventListener("click", function () {
  form.classList.toggle("hide");
});
