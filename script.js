const body = document.querySelector("body");
const toggle = document.querySelector(".toggle__switch");

toggle.addEventListener("click", () => {
  body.classList.toggle("disable");
});
