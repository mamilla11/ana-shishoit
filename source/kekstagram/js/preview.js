'use strict';

(function () {
  /**
   * @class Preview
   * @description All future preview behaviour should be added to this class.
   * @prop {Object} picture - picture information.
   * @prop {Element} view - root element of picture preview DOM element.
   * @prop {Object} elements - child elements of picture preview DOM element.
   * @param {Object} picture - picture information.
   */
  var Preview = function (picture) {
    this.picture = picture;
    this.view = null;
    this.elements = {};

    this.initView();
  };

  /**
  * Initializes preview DOM element.
  */
  Preview.prototype.initView = function () {
    this.view = document.querySelector(window.templates.Preview.name)
                        .content
                        .querySelector(window.templates.Preview.Selector.CONTAINER)
                        .cloneNode(true);

    this.elements.image = this.view.querySelector(
        window.templates.Preview.Selector.IMAGE
    );
    this.elements.likes = this.view.querySelector(
        window.templates.Preview.Selector.LIKES
    );
    this.elements.comments = this.view.querySelector(
        window.templates.Preview.Selector.COMMENTS
    );

    this.elements.image.src = this.picture.url;
    this.elements.likes.textContent = this.picture.likes;
    this.elements.comments.textContent = this.picture.comments.length;
  };

  window.Preview = Preview;
})();
