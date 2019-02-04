'use strict';

(function () {
  var MAX_HASHTAG_NUMBER = 5;

  var HASHTAG_PATTERN = /^#[а-яА-ЯёЁA-Za-z0-9_]{1,19}$/;

  var HASHTAG_PATTERN_ERROR_MESSAGE = 'Каждый хэш-тег должен начинаться с символа # ' +
                                      '(например, #хэштег) и состоять только из букв, ' +
                                      'цифр и нижнего подчеркивания (_). ' +
                                      'Допустимая длина хэш-тега от 2 до 20 ' +
                                      'символов, включая символ #.';

  var HASHTAG_DOUBLED_ERROR_MESSAGE = 'Хэш-теги не могут дублироваться. Xэш-теги ' +
                                      'нечувствительны к регистру: #HASHTAG и #hashtag ' +
                                      '- это один и тот же хэш-тег';

  var HASHTAG_NUMBER_ERROR_MESSAGE = 'Максимальное количество хэш-тегов: ' +
                                      MAX_HASHTAG_NUMBER;

  var HASHTAG_SPACES_ERROR_MESSAGE = 'Хэш-теги должны быть разделены одним пробелом';

  /**
  * Splits hashtags string to array of individual lowercased hashtags.
  * @param {string} hashtagsString - hashtags string.
  * @return {array} An array of lowercased hashtags.
  */
  var toArray = function (hashtagsString) {
    return hashtagsString.split(' ').map(function (e) {
      return e.toLowerCase();
    });
  };

  /**
  * Checks that all hashtags separated with single space.
  * @param {array} hashtags - an array of hashtags.
  * @return {bool} True if all hashtags separated with single space,
  * false otherwise.
  */
  var tooManySpacesBetween = function (hashtags) {
    for (var i = 0; i < hashtags.length; i++) {
      if (hashtags[i] === '') {
        return true;
      }
    }
    return false;
  };

  /**
  * Checks that hashtags are not doubled.
  * @param {array} hashtags - an array of hashtags.
  * @return {bool} True if hashtags are not doubled, false otherwise.
  */
  var isHashTagsDoubled = function (hashtags) {
    var array = window.utils.removeDuplicates(hashtags);
    return hashtags.length !== array.length;
  };

  /**
  * Checks that hashtags number is less than or equal
  * to MAX_HASHTAG_NUMBER.
  * @param {array} hashtags - an array of hashtags.
  * @return {bool} True if hashtags number is less than or equal
  * to MAX_HASHTAG_NUMBER, false otherwise.
  */
  var isTooManyHashTags = function (hashtags) {
    return hashtags.length > MAX_HASHTAG_NUMBER;
  };

  /**
  * Checks that all hashtags match HASHTAG_PATTERN.
  * @param {array} hashtags - an array of hashtags.
  * @return {bool} True if all hashtags match HASHTAG_PATTERN,
  * false otherwise.
  */
  var isHashTagPatternFails = function (hashtags) {
    for (var i = 0; i < hashtags.length; i++) {
      if (!HASHTAG_PATTERN.test(hashtags[i])) {
        return true;
      }
    }
    return false;
  };

  var VALIDATIONS = [
    {
      isError: tooManySpacesBetween,
      errorMessage: HASHTAG_SPACES_ERROR_MESSAGE
    },
    {
      isError: isHashTagsDoubled,
      errorMessage: HASHTAG_DOUBLED_ERROR_MESSAGE
    },
    {
      isError: isTooManyHashTags,
      errorMessage: HASHTAG_NUMBER_ERROR_MESSAGE
    },
    {
      isError: isHashTagPatternFails,
      errorMessage: HASHTAG_PATTERN_ERROR_MESSAGE
    }
  ];

  /**
  * Validates hashtags string.
  * @param {string} content - hashtags string.
  * @return {string} Error message if validation fails,
  * empty string otherwise.
  */
  var validate = function (content) {
    var hashtags = toArray(content);

    if ((hashtags.length === 1) && (hashtags[0] === '')) {
      return '';
    }

    for (var i = 0; i < VALIDATIONS.length; i++) {
      if (VALIDATIONS[i].isError(hashtags)) {
        return VALIDATIONS[i].errorMessage;
      }
    }
    return '';
  };

  window.hashtags = {
    validate: validate
  };
})();
