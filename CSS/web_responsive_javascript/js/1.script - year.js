/* DOM  */
const yearEl = document.querySelector(".year");

/* FOOTER SECTION */
const updateYear = function () {
  yearEl.textContent = new Date().getFullYear();
};
updateYear();
