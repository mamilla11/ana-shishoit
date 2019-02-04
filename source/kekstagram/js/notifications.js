'use strict';

(function () {
  var successPopup = new window.message.SuccessMessage();
  var errorPopup = new window.message.ErrorMessage();
  var loadingPopup = new window.message.LoadingMessage();
  /**
  * Shows load success message.
  */
  var showLoadSuccess = function () {
    successPopup.show();
  };

  /**
  * Hides load success message.
  */
  var hideLoadSuccess = function () {
    successPopup.hide();
  };

  /**
  * Shows load error message.
  * @param {string} message - message to show.
  */
  var showLoadError = function (message) {
    errorPopup.setText(message);
    errorPopup.show();
  };

  /**
  * Hides load error message.
  */
  var hideLoadError = function () {
    errorPopup.hide();
  };

  /**
  * Shows load progress message.
  */
  var showLoadInProgress = function () {
    loadingPopup.show();
  };

  /**
  * Hides load progress message.
  */
  var hideLoadInProgress = function () {
    loadingPopup.hide();
  };

  successPopup.view.addEventListener('click', function () {
    hideLoadSuccess();
  });

  successPopup.view.addEventListener('keydown', function (evt) {
    if (window.utils.isEscKeyCode(evt.keyCode)) {
      hideLoadSuccess();
    }
  });

  successPopup.elements.closeButton.addEventListener('click', function (evt) {
    evt.stopPropagation();
    hideLoadSuccess();
  });

  successPopup.elements.closeButton.addEventListener('keydown', function (evt) {
    if (window.utils.isEnterKeyCode(evt.keyCode)) {
      evt.stopPropagation();
      hideLoadSuccess();
    }
  });

  errorPopup.view.addEventListener('click', function () {
    hideLoadError();
  });

  errorPopup.view.addEventListener('keydown', function (evt) {
    if (window.utils.isEscKeyCode(evt.keyCode)) {
      evt.stopPropagation();
      hideLoadError();
    }
  });

  errorPopup.elements.retryButton.addEventListener('click', function (evt) {
    evt.stopPropagation();
    hideLoadError();
    window.editor.sendForm();
  });

  errorPopup.elements.retryButton.addEventListener('keydown', function (evt) {
    if (window.utils.isEnterKeyCode(evt.keyCode)) {
      evt.stopPropagation();
      hideLoadError();
      window.editor.sendForm();
    }
  });

  errorPopup.elements.closeButton.addEventListener('click', function (evt) {
    evt.stopPropagation();
    hideLoadError();
    window.editor.close();
  });

  errorPopup.elements.closeButton.addEventListener('keydown', function (evt) {
    if (window.utils.isEnterKeyCode(evt.keyCode)) {
      evt.stopPropagation();
      hideLoadError();
      window.editor.close();
    }
  });

  window.notifications = {
    showLoadSuccess: showLoadSuccess,
    hideLoadSuccess: hideLoadSuccess,
    showLoadError: showLoadError,
    hideLoadError: hideLoadError,
    showLoadInProgress: showLoadInProgress,
    hideLoadInProgress: hideLoadInProgress
  };
})();

