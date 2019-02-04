'use strict';

(function () {
  /**
   * @class PicturePopup
   * @prop {Object} picture - picture information.
   * @prop {Comments} comments - picture comments container.
   * @prop {Element} view - root element of picture popup DOM element.
   * @prop {Object} elements - child elements of picture popup DOM element.
   */
  var PicturePopup = function () {
    this.MAX_COMMENTS_COUNT = 5;

    this.comments = new window.Comments();

    this.picture = null;
    this.view = null;
    this.elements = {};

    this.initView();
    this.addEventListeners();
  };

  /**
  * Initializes view and elements collection.
  */
  PicturePopup.prototype.initView = function () {
    this.view = document.querySelector(
        window.selectors.PicturePopup.CONTAINER
    );
    this.elements.body = document.querySelector(
        window.selectors.PicturePopup.BODY
    );
    this.elements.pictureInfo = this.view.querySelector(
        window.selectors.PicturePopup.PICTURE_INFO
    );
    this.elements.image = this.view.querySelector(
        window.selectors.PicturePopup.IMAGE
    );
    this.elements.likes = this.view.querySelector(
        window.selectors.PicturePopup.LIKES
    );
    this.elements.caption = this.view.querySelector(
        window.selectors.PicturePopup.CAPTION
    );
    this.elements.closeButton = this.view.querySelector(
        window.selectors.PicturePopup.CLOSE_BUTTON
    );
  };

  /**
  * Shows full scale picture popup.
  */
  PicturePopup.prototype.show = function () {
    this.view.classList.remove('hidden');
    this.elements.body.classList.add('modal-open');
    this.view.focus();
  };

  /**
  * Hides full scale picture popup.
  */
  PicturePopup.prototype.hide = function () {
    this.view.classList.add('hidden');
    this.elements.body.classList.remove('modal-open');
  };

  /**
  * Sets up new picture.
  * @param {Object} picture - picture information.
  */
  PicturePopup.prototype.setPicture = function (picture) {
    this.picture = picture;
    this.comments.setComments(picture.comments);

    this.elements.image.src = this.picture.url;
    this.elements.likes.textContent = this.picture.likes;
    this.elements.caption.textContent = this.picture.description;
  };

  /**
  * Sets up event handlers.
  */
  PicturePopup.prototype.addEventListeners = function () {
    this.view.addEventListener('keydown', function (evt) {
      if (window.utils.isEscKeyCode(evt.keyCode)) {
        this.hide();
      }
    }.bind(this));

    this.view.addEventListener('click', function () {
      this.hide();
    }.bind(this));

    this.elements.closeButton.addEventListener('click', function () {
      this.hide();
    }.bind(this));

    this.elements.pictureInfo.addEventListener('click', function (evt) {
      evt.stopPropagation();
    });
  };

  window.PicturePopup = PicturePopup;
})();
