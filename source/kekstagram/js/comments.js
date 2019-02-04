'use strict';

(function () {
  /**
   * @class Comments
   * @prop {Array<Comment>} comments - an array of Comment DOM elements.
   * @prop {Element} view - root element of comments DOM element.
   * @prop {Object} elements - child elements of comments DOM element.
   * @prop {number} shownCount - how mane comments are already shown.
   * @prop {number} totalCount - total number of comments.
   */
  var Comments = function () {
    this.MAX_COUNT = 5;

    this.comments = [];
    this.view = null;
    this.elements = {};

    this.shownCount = 0;
    this.totalCount = 0;

    this.initView();
    this.addEventHandlers();
  };

  /**
  * Initializes Comments DOM element.
  */
  Comments.prototype.initView = function () {
    this.view = document.querySelector(
        window.selectors.Comments.CONTAINER
    );
    this.elements.totalCount = document.querySelector(
        window.selectors.Comments.TOTAL_COUNT
    );
    this.elements.shownCount = document.querySelector(
        window.selectors.Comments.SHOWN_COUNT
    );
    this.elements.counter = document.querySelector(
        window.selectors.Comments.COUNTER
    );
    this.elements.loader = document.querySelector(
        window.selectors.Comments.LOADER
    );
  };

  /**
  * Clears Comments DOM element.
  */
  Comments.prototype.clearView = function () {
    while (this.view.firstChild) {
      this.view.removeChild(this.view.firstChild);
    }
  };

  /**
  * Initializes Comment DOM elements.
  * @param {Object} comments - comments information.
  */
  Comments.prototype.setComments = function (comments) {
    this.comments = [];

    comments.forEach(function (comment) {
      this.comments.push(new window.Comment(comment));
    }, this);

    this.shownCount = 0;
    this.totalCount = comments.length;

    this.updateCounters();
    this.clearView();
    this.showLoader();
    this.showCounter();
    this.loadMore();
  };

  /**
  * Updates comment counters.
  */
  Comments.prototype.updateCounters = function () {
    this.elements.totalCount.textContent = this.totalCount;
    this.elements.shownCount.textContent = this.shownCount;
  };

  /**
  * Adds new comments to Comments DOM element.
  */
  Comments.prototype.loadMore = function () {
    if (this.totalCount === 0) {
      this.hideCounter();
      this.hideLoader();
      return;
    }

    var restComments = this.totalCount - this.shownCount;
    var commentsToShow = 0;

    if (restComments <= this.MAX_COUNT) {
      this.hideLoader();
      commentsToShow = restComments;
    } else {
      commentsToShow = this.MAX_COUNT;
    }

    var fragment = document.createDocumentFragment();

    for (var i = 0; i < commentsToShow; i++) {
      fragment.appendChild(this.comments[this.shownCount++].view);
    }

    this.view.appendChild(fragment);
    this.updateCounters();
  };

  /**
  * Hides comments counter.
  */
  Comments.prototype.hideCounter = function () {
    this.elements.counter.classList.add('hidden');
  };

  /**
  * Shows comments counter.
  */
  Comments.prototype.showCounter = function () {
    this.elements.counter.classList.remove('hidden');
  };

  /**
  * Hides comments loader.
  */
  Comments.prototype.hideLoader = function () {
    this.elements.loader.classList.add('hidden');
  };

  /**
  * Shows comments loader.
  */
  Comments.prototype.showLoader = function () {
    this.elements.loader.classList.remove('hidden');
  };

  /**
  * Sets up event handlers.
  */
  Comments.prototype.addEventHandlers = function () {
    this.elements.loader.addEventListener('click', function (evt) {
      evt.stopPropagation();
      this.loadMore();
    }.bind(this));

    this.elements.loader.addEventListener('keydown', function (evt) {
      if (window.utils.isEnterKeyCode(evt.keyCode)) {
        evt.stopPropagation();
        this.loadMore();
      }
    }.bind(this));
  };

  window.Comments = Comments;
})();
