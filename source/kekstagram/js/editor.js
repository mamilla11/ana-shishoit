'use strict';

(function () {
  var body = document.querySelector(
      window.selectors.Page.BODY
  );
  var form = document.querySelector(
      window.selectors.Editor.FORM
  );
  var editor = form.querySelector(
      window.selectors.Editor.CONTAINER
  );
  var closeButton = form.querySelector(
      window.selectors.Editor.CLOSE_BUTTON
  );
  var filterSelectors = form.querySelectorAll(
      window.selectors.Editor.FILTER_SELECTORS
  );
  var scaleUpButton = form.querySelector(
      window.selectors.Editor.SCALE_UP_BUTTON
  );
  var scaleDownButton = form.querySelector(
      window.selectors.Editor.SCALE_DOWN_BUTTON
  );
  var comment = form.querySelector(
      window.selectors.Editor.COMMENT
  );
  var hashtags = form.querySelector(
      window.selectors.Editor.HASHTAGS
  );

  /**
  * Filter selection changed event handler.
  * Applies selected filter to image.
  * @param {object} evt - event object.
  */
  var onFilterSelectionChanged = function (evt) {
    window.filter.apply(evt.target.value);
  };

  /**
  * Filter selection key down event handler.
  * Prevents form submitting.
  * @param {object} evt - event object.
  */
  var onFilterSelectionKeyDown = function (evt) {
    if (window.utils.isEnterKeyCode(evt.keyCode)) {
      evt.preventDefault();
    }
  };

  /**
  * Opens editor popup.
  */
  var open = function () {
    editor.classList.remove('hidden');
    body.classList.add('modal-open');
    window.filter.toDefault();
    window.scale.toDefault();
    window.slider.hide();
  };

  /**
  * Closes editor popup.
  */
  var close = function () {
    editor.classList.add('hidden');
    body.classList.remove('modal-open');
    form.reset();
  };

  /**
  * Closes editor if load successfully finished.
  */
  var onLoadSuccess = function () {
    close();
    window.notifications.hideLoadInProgress();
    window.notifications.showLoadSuccess();
  };

  /**
  * Shows error if load finished with error.
  * @param {string} errorMessage - error message to display.
  */
  var onLoadError = function (errorMessage) {
    window.notifications.hideLoadInProgress();
    window.notifications.showLoadError(errorMessage);
  };

  /**
  * Sends form data to server.
  */
  var sendForm = function () {
    window.notifications.showLoadInProgress();
    window.backend.save(
        new FormData(form),
        onLoadSuccess,
        onLoadError
    );
  };

  /**
  * Adjusts filter intensity.
  * @param {number} percent - filter intensity
  * (a number from 0 to 1).
  */
  var changeFilterIntensity = function (percent) {
    window.filter.adjustIntensity(percent);
  };

  for (var i = 0; i < filterSelectors.length; i++) {
    filterSelectors[i].addEventListener('change', onFilterSelectionChanged);
    filterSelectors[i].addEventListener('keydown', onFilterSelectionKeyDown);
  }

  document.addEventListener('keydown', function (evt) {
    if (window.utils.isEscKeyCode(evt.keyCode)) {
      close();
    }
  });

  closeButton.addEventListener('click', function () {
    close();
  });

  scaleUpButton.addEventListener('click', function () {
    window.scale.increase();
  });

  scaleDownButton.addEventListener('click', function () {
    window.scale.decrease();
  });

  comment.addEventListener('keydown', function (evt) {
    if (window.utils.isEscKeyCode(evt.keyCode)) {
      evt.stopPropagation();
    }
  });

  hashtags.addEventListener('keydown', function (evt) {
    if (window.utils.isEscKeyCode(evt.keyCode)) {
      evt.stopPropagation();
    }
  });

  hashtags.addEventListener('input', function (evt) {
    var errorMessage = window.hashtags.validate(evt.target.value);
    hashtags.setCustomValidity(errorMessage);
  });

  form.addEventListener('submit', function (evt) {
    if (form.checkValidity()) {
      evt.preventDefault();
      sendForm();
    }
  });

  window.editor = {
    open: open,
    close: close,
    changeFilterIntensity: changeFilterIntensity,
    sendForm: sendForm
  };
})();
