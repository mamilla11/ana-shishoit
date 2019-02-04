var menu_toggle = document.querySelector(".page-header__menu-toggle");
var navigation  = document.querySelector(".page-header__navigation");

if (menu_toggle.classList.contains("page-header__menu-toggle--no-js")) {
    menu_toggle.classList.remove("page-header__menu-toggle--no-js");
    menu_toggle.classList.add("page-header__menu-toggle--open");
    navigation.classList.remove("page-header__navigation--open");
  }

menu_toggle.addEventListener("click", function(evt) {
  evt.preventDefault();

  navigation.classList.toggle("page-header__navigation--open");
  menu_toggle.classList.toggle("page-header__menu-toggle--close");
});
