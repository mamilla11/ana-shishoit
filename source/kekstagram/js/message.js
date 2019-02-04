'use strict';

(function () {
  /**
   * @class Message.
   * @description Base class for message popups.
   * @prop {Element} page - an array of Comment DOM elements.
   * @prop {Element} view - root element of comments DOM element.
   * @param {object} template - template of a message popup.
   */
  var Message = function (template) {
    this.page = null;
    this.view = null;

    this.initView(template);
  };

  /**
  * Initializes Message DOM element.
  * @param {object} template - template of a message popup.
  */
  Message.prototype.initView = function (template) {
    this.page = document.querySelector(window.selectors.Page.MAIN);
    this.view = document.querySelector(template.name)
                        .content
                        .querySelector(template.Selector.CONTAINER)
                        .cloneNode(true);
  };

  /**
  * Focuses Message DOM element.
  */
  Message.prototype.focus = function () {
    this.view.focus();
  };

  /**
  * Adds Message DOM element to main.
  */
  Message.prototype.show = function () {
    this.page.appendChild(this.view);
    this.focus();
  };

  /**
  * Removes Message DOM element from main.
  */
  Message.prototype.hide = function () {
    this.page.removeChild(this.view);
  };

  /**
   * @class SuccessMessage.
   * @prop {Element} elements - child elements of Message DOM element.
   */
  var SuccessMessage = function () {
    Message.call(this, window.templates.SuccessPopup);
    this.elements = {};

    this.initElements();
  };

  SuccessMessage.prototype = Object.create(Message.prototype);

  /**
  * Initializes child elements of Message DOM element.
  */
  SuccessMessage.prototype.initElements = function () {
    this.elements.closeButton = this.view.querySelector(
        window.templates.SuccessPopup.Selector.CLOSE_BUTTON
    );
  };

  /**
   * @class ErrorMessage.
   * @prop {Element} elements - child elements of Message DOM element.
   */
  var ErrorMessage = function () {
    Message.call(this, window.templates.ErrorPopup);
    this.elements = {};

    this.initElements();
  };

  ErrorMessage.prototype = Object.create(Message.prototype);

  /**
  * Initializes child elements of Message DOM element.
  */
  ErrorMessage.prototype.initElements = function () {
    this.elements.closeButton = this.view.querySelector(
        window.templates.ErrorPopup.Selector.CLOSE_BUTTON
    );
    this.elements.retryButton = this.view.querySelector(
        window.templates.ErrorPopup.Selector.RETRY_BUTTON
    );
    this.elements.message = this.view.querySelector(
        window.templates.ErrorPopup.Selector.MESSAGE
    );
  };

  /**
  * Sets up message.
  * @param {string} message - message to show.
  */
  ErrorMessage.prototype.setText = function (message) {
    this.elements.message.textContent = message;
  };

  var LoadingMessage = function () {
    Message.call(this, window.templates.LoadingPopup);
  };

  LoadingMessage.prototype = Object.create(Message.prototype);

  window.message = {
    SuccessMessage: SuccessMessage,
    ErrorMessage: ErrorMessage,
    LoadingMessage: LoadingMessage
  };
})();
