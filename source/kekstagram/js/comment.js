'use strict';

(function () {
  /**
   * @class Comment
   * @description All future comment behaviour should be added to this class.
   * @prop {Object} comment - comment information.
   * @prop {Element} view - root element of comment DOM element.
   * @prop {Object} elements - child elements of comment DOM element.
   * @param {Object} comment - comment information.
   */
  var Comment = function (comment) {
    this.comment = comment;
    this.view = null;
    this.elements = {};

    this.initView();
  };

  /**
  * Initializes comment DOM element.
  */
  Comment.prototype.initView = function () {
    this.view = document.querySelector(window.templates.PictureComment.name)
                        .content
                        .querySelector(window.templates.PictureComment.Selector.CONTAINER)
                        .cloneNode(true);

    this.elements.avatar = this.view.querySelector(
        window.templates.PictureComment.Selector.AVATAR
    );
    this.elements.message = this.view.querySelector(
        window.templates.PictureComment.Selector.MESSAGE
    );

    this.elements.avatar.src = this.comment.avatar;
    this.elements.message.textContent = this.comment.message;
  };

  window.Comment = Comment;
})();
