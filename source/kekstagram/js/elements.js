'use strict';

(function () {
  var Page = {
    BODY: 'body',
    MAIN: 'main'
  };
  var Comments = {
    CONTAINER: '.social__comments',
    TOTAL_COUNT: '.comments-count',
    SHOWN_COUNT: '.comments-loaded',
    COUNTER: '.social__comment-count',
    LOADER: '.comments-loader'
  };
  var Editor = {
    CONTAINER: '.img-upload__overlay',
    FORM: '.img-upload__form',
    CLOSE_BUTTON: '.img-upload__cancel',
    FILTER_SELECTORS: '.effects__radio',
    SCALE_UP_BUTTON: '.scale__control--bigger',
    SCALE_DOWN_BUTTON: '.scale__control--smaller',
    COMMENT: '.text__description',
    HASHTAGS: '.text__hashtags'
  };
  var Filter = {
    IMAGE: '.img-upload__preview img',
    INTENSITY: '.effect-level__value'
  };
  var Scale = {
    SCALE: '.scale__control--value',
    IMAGE: '.img-upload__preview'
  };
  var Slider = {
    SLIDER: '.effect-level',
    SCALE: '.effect-level__line',
    PIN: '.effect-level__pin',
    DEPTH: '.effect-level__depth'
  };
  var PicturePopup = {
    BODY: 'body',
    CONTAINER: '.big-picture',
    PICTURE_INFO: '.big-picture__social',
    IMAGE: '.big-picture__img img',
    LIKES: '.likes-count',
    CAPTION: '.social__caption',
    CLOSE_BUTTON: '.big-picture__cancel'
  };
  var Pictures = {
    CONTAINER: '.pictures',
    FILTERS: '.img-filters',
    FILTERS_FORM: '.img-filters__form',
    FILTER_BUTTON: '.img-filters__button'
  };
  var Uploader = {
    CONTAINER: '.img-upload__control',
    DIALOG: '#upload-file',
    PREVIEW: '.img-upload__preview img'
  };

  window.selectors = {
    Page: Page,
    Comments: Comments,
    Editor: Editor,
    Filter: Filter,
    Scale: Scale,
    Slider: Slider,
    PicturePopup: PicturePopup,
    Pictures: Pictures,
    Uploader: Uploader
  };
})();
