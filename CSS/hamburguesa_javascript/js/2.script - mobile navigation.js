/****************************************/
/* DOM SECTION COMUNES*/
/****************************************/
const headerEl = document.querySelector(".header");

/****************************************/
/* NAVIGATION MENU */
/****************************************/

/* sin delegación */
/*
const openMenuBtnMobile = document.querySelector(
  ".icon-mobile-nav[name='menu-outline']"
);
const closeMenuBtnMobile = document.querySelector(
  ".icon-mobile-nav[name='close-outline']"
);
openMenuBtnMobile.addEventListener("click", function () {
  headerEl.classList.add("nav-open");
});

closeMenuBtnMobile.addEventListener("click", function () {
  headerEl.classList.remove("nav-open");
});
*/

/*con delegación*/
const btnNavEl = document.querySelector(".btn-mobile-nav");
btnNavEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");

  /*
  if (headerEl.classList.contains("nav-open")){
    headerEl.classList.remove("nav-open");
  }
  else{
    headerEl.classList.add("nav-open");
  }
*/
});

/****************************************/
/* FOOTER SECTION */
/****************************************/
const yearEl = document.querySelector(".year");
const updateYear = function () {
  yearEl.textContent = new Date().getFullYear();
};

/* init */
updateYear();
