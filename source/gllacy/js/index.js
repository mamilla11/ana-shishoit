var feedback_open_link  = document.querySelector(".feedback__button--open");
var feedback_close_link = document.querySelector(".feedback__button--close");
var feedback_modal      = document.querySelector(".feedback__modal");
var overlay             = document.querySelector(".overlay");
var feedback_name       = document.querySelector("[name=feedback-name]");
var feedback_email      = document.querySelector("[name=feedback-email]");
var feedback_text       = document.querySelector("[name=feedback-text]");
var search_link         = document.querySelector(".user-action__item.search");
var search_input        = document.querySelector(".input-field--search");
var login_link          = document.querySelector(".user-action__item.auth");
var login_input         = document.querySelector("[name=login]");


feedback_open_link.addEventListener("click", function(evt) {
  evt.preventDefault();
  feedback_modal.classList.add("modal-show");
  feedback_modal.classList.add("modal-bounce");
  overlay.classList.add("overlay-show");
  feedback_name.focus();

  setTimeout(function() {
    feedback_modal.classList.remove("modal-bounce");
  }, 300);
});

feedback_close_link.addEventListener("click", function(evt) {
  evt.preventDefault();
  feedback_modal.classList.remove("modal-show");
  feedback_modal.classList.remove("modal-error");
  overlay.classList.remove("overlay-show");
});

overlay.addEventListener("click", function(evt) {
  evt.preventDefault();
  feedback_modal.classList.remove("modal-show");
  feedback_modal.classList.remove("modal-error");
  overlay.classList.remove("overlay-show");
});

feedback_modal.addEventListener("submit", function(evt) {
  if (!feedback_name.value  ||
      !feedback_email.value ||
      !feedback_text.value) {
    evt.preventDefault();
    feedback_modal.classList.add("modal-error");

    setTimeout(function() {
      feedback_modal.classList.remove("modal-error");
    }, 300);
  }
});

search_link.addEventListener("mouseenter", function() {
  search_input.focus();
});

login_link.addEventListener("mouseenter", function() {
  login_input.focus();
});

window.addEventListener("keydown", function(evt) {
  var escape = 27;
  if (evt.keyCode === escape) {
    if (feedback_modal.classList.contains("modal-show")) {
      evt.preventDefault();
      feedback_modal.classList.remove("modal-show");
      feedback_modal.classList.remove("modal-error");
      overlay.classList.remove("overlay-show");
    }
  }
});

var myMap;

ymaps.ready(init);

function init () {
  myMap = new ymaps.Map("map", {
    center: [59.93928783923012,30.32921285189815],
    zoom: 16
  }, {
    searchControlProvider: "yandex#search"
  }),

  myPlacemark = new ymaps.Placemark([59.93866874833191,30.322839923278767], {
    hintContent: "ул. Большая Конюшенная 19/8, Санкт-Петербург",
  }, {
      iconLayout: "default#image",
      iconImageHref: "img/pin.png",
      iconImageSize: [218, 142],
      iconImageOffset: [-37, -133]
  });

  myMap.geoObjects.add(myPlacemark);
}

