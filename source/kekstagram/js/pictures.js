'use strict';

(function () {
  var MAX_NEWEST_PREVIEWS = 10;
  var FILTER_APPLY_TIMEOUT = 500;

  var previewsContainer = document.querySelector(
      window.selectors.Pictures.CONTAINER
  );
  var filtersContainer = document.querySelector(
      window.selectors.Pictures.FILTERS
  );
  var filtersForm = filtersContainer.querySelector(
      window.selectors.Pictures.FILTERS_FORM
  );
  var filterButtons = filtersForm.querySelectorAll(
      window.selectors.Pictures.FILTER_BUTTON
  );

  var currentFilter = filtersForm.querySelector('.img-filters__button--active');

  var picturePopup = new window.PicturePopup();
  var previews = [];

  var filters = {
    'filter-popular': function () {
      showPopular();
    },
    'filter-new': function () {
      showNewest();
    },
    'filter-discussed': function () {
      showDiscussed();
    }
  };

  var applyFilter = window.utils.debounce(function (previewsToShow) {
    showPreviews(previewsToShow);
  }, FILTER_APPLY_TIMEOUT);

  /**
  * Picture preview click event handler.
  * Shows popup with full scale picture.
  * @param {number} index - picture preview index.
  */
  var onPreviewElemClick = function (index) {
    picturePopup.setPicture(previews[index].picture);
    picturePopup.show();
  };

  /**
  * Shows all picture previews.
  * @param {Array<Preview>} previewsToShow - previews to show.
  */
  var showPreviews = function (previewsToShow) {
    var fragment = document.createDocumentFragment();

    clearPreviews();

    previewsToShow.forEach(function (picture) {
      fragment.appendChild(picture.view);
    });

    previewsContainer.appendChild(fragment);
  };

  var clearPreviews = function () {
    var elements = previewsContainer.querySelectorAll(
        window.templates.Preview.Selector.CONTAINER
    );

    elements.forEach(function (element) {
      previewsContainer.removeChild(element);
    });
  };

  /**
  * Shows picture filters.
  */
  var showFilters = function () {
    filtersContainer.classList.remove('img-filters--inactive');
  };

  /**
  * Hides picture filters.
  */
  var hideFilters = function () {
    filtersContainer.classList.add('img-filters--inactive');
  };

  /**
  * Switches current pictures filter.
  * @param {number} index - index of a filter element.
  */
  var switchFilter = function (index) {
    currentFilter.classList.remove('img-filters__button--active');
    currentFilter = filterButtons[index];
    currentFilter.classList.add('img-filters__button--active');

    filters[currentFilter.id]();
  };

  /**
  * Selects and shows popular pictures.
  */
  var showPopular = function () {
    applyFilter(previews.slice());
  };

  /**
  * Selects and shows newest pictures.
  */
  var showNewest = function () {
    var index = window.utils.getRandomNumber(0, previews.length);
    var getNextPreview = window.utils.getNextItem(previews, index);

    var previewsToShow = [];
    for (var i = 0; i < MAX_NEWEST_PREVIEWS; i++) {
      previewsToShow.push(getNextPreview());
    }

    applyFilter(previewsToShow);
  };

  /**
  * Selects and shows discussed pictures.
  */
  var showDiscussed = function () {
    var previewsToShow = previews.slice().sort(function (a, b) {
      return b.picture.comments.length -
             a.picture.comments.length;
    });

    applyFilter(previewsToShow);
  };

  /**
  * Sets up all pictures downloaded from server.
  * @param {array} pictures - pictures downloaded from server.
  */
  var onLoadSuccess = function (pictures) {
    previews = [];

    pictures.forEach(function (picture) {
      previews.push(new window.Preview(picture));
    });

    showPreviews(previews.slice());
    addEventHandlers();
    showFilters();
  };

  /**
  * Prints error message if pictures download error occurs.
  * @param {string} errorMessage - error message.
  */
  var onLoadError = function (errorMessage) {
    hideFilters();
    window.notifications.showLoadError(errorMessage);
  };

  /**
  * Starts the downloading pictures from server.
  * @param {function} onLoadSuccess - download success callback.
  * @param {function} onLoadError - download error callback.
  */
  var loadPictures = function () {
    window.backend.load(onLoadSuccess, onLoadError);
  };

  /**
  * Adds event handlers.
  */
  var addEventHandlers = function () {
    previews.forEach(function (preview) {
      preview.view.addEventListener('click', function () {
        onPreviewElemClick(previews.indexOf(preview));
      });
    });

    for (var i = 0; i < filterButtons.length; i++) {
      addButtonEventHandlers(filterButtons[i], i);
    }
  };

  /**
  * Adds button event handlers.
  * @param {Element} button - button DOM element.
  * @param {number} index - index of a button DOM element.
  */
  var addButtonEventHandlers = function (button, index) {
    button.addEventListener('click', function () {
      switchFilter(index);
    });

    button.addEventListener('keydown', function (evt) {
      if (window.utils.isEnterKeyCode(evt.keyCode)) {
        switchFilter(index);
      }
    });
  };

  window.pictures = {
    loadPictures: loadPictures
  };
})();
