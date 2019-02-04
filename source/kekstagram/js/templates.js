'use strict';

(function () {
  var PictureComment = {
    name: '#comment',
    Selector: {
      CONTAINER: '.social__comment',
      AVATAR: '.social__picture',
      MESSAGE: '.social__text'
    }
  };
  var Preview = {
    name: '#picture',
    Selector: {
      CONTAINER: '.picture',
      IMAGE: '.picture__img',
      LIKES: '.picture__likes',
      COMMENTS: '.picture__comments'
    }
  };
  var SuccessPopup = {
    name: '#success',
    Selector: {
      CONTAINER: '.success',
      CLOSE_BUTTON: '.success__button'
    }
  };
  var ErrorPopup = {
    name: '#error',
    Selector: {
      CONTAINER: '.error',
      RETRY_BUTTON: '.error__button--retry',
      CLOSE_BUTTON: '.error__button--cancel',
      MESSAGE: '.error__message'
    }
  };
  var LoadingPopup = {
    name: '#messages',
    Selector: {
      CONTAINER: '.messages'
    }
  };

  window.templates = {
    PictureComment: PictureComment,
    Preview: Preview,
    SuccessPopup: SuccessPopup,
    ErrorPopup: ErrorPopup,
    LoadingPopup: LoadingPopup
  };
})();
