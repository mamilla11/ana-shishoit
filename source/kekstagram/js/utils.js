'use strict';

(function () {
  var KeyCode = {
    ESC: 27,
    ENTER: 13,
    LEFT_ARROW: 37,
    RIGHT_ARROW: 39
  };

  /**
  * Checks is the ECS keycode.
  * @param {number} keyCode - keycode.
  * @return {bool} True if ECS keycode, false otherwise.
  */
  var isEscKeyCode = function (keyCode) {
    return keyCode === KeyCode.ESC;
  };

  /**
  * Checks is the ENTER keycode.
  * @param {number} keyCode - keycode.
  * @return {bool} True if ENTER keycode, false otherwise.
  */
  var isEnterKeyCode = function (keyCode) {
    return keyCode === KeyCode.ENTER;
  };

  /**
  * Checks is the LEFT_ARROW keycode.
  * @param {number} keyCode - keycode.
  * @return {bool} True if LEFT_ARROW keycode, false otherwise.
  */
  var isLeftArrowKeyCode = function (keyCode) {
    return keyCode === KeyCode.LEFT_ARROW;
  };

  /**
  * Checks is the RIGHT_ARROW keycode.
  * @param {number} keyCode - keycode.
  * @return {bool} True if RIGHT_ARROW keycode, false otherwise.
  */
  var isRightArrowKeyCode = function (keyCode) {
    return keyCode === KeyCode.RIGHT_ARROW;
  };

  /**
  * Gets the random value from a range.
  * @param {number} min - start range value.
  * @param {number} max - end range value.
  * @return {number} The random value from a range.
  */
  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  /**
  * Converts percent to value.
  * @param {float} percent - value from 0 to 1.
  * @param {number} max - end range value.
  * @param {number} min - start range value (0 if nit specified).
  * @return {float} Percent converted to value.
  */
  var percentToValue = function (percent, max, min) {
    if ((!min) || (min === 0)) {
      return max * percent;
    }
    return (max - min) * percent + min;
  };

  /**
  * Gets the random item from an array.
  * @param {Array} items - an array of items.
  * @return {number} The random item from an array.
  */
  var getRandomItem = function (items) {
    return items[getRandomNumber(0, items.length - 1)];
  };

  /**
  * Gets the function, to retrieve the next element from an array.
  * @param {Array} items - an array of items.
  * @param {number} index - start index (0 if not specified).
  * @return {function} The function, to retrieve the next element from an array.
  */
  var getNextItem = function (items, index) {
    if (!index) {
      index = 0;
    }

    var getNext = function () {
      if (index === items.length) {
        index = 0;
      }
      return items[index++];
    };

    return getNext;
  };

  /**
  * Removes duplicates from an array.
  * @param {Array} items - an array of items.
  * @return {Array} A new array without duplicates.
  */
  var removeDuplicates = function (items) {
    var iter = function (source, result, index) {
      if (index === source.length) {
        return result;
      }
      if (!result.includes(source[index])) {
        result.push(source[index]);
      }
      return iter(source, result, ++index);
    };

    return iter(items, [], 0);
  };

  /**
  * Gets the DOM element width.
  * @param {object} element - DOM element.
  * @return {number} The DOM element width.
  */
  var getElementWidth = function (element) {
    return parseInt(getComputedStyle(element).width, 10);
  };

  /**
  * Gets the DOM element X coordinate.
  * @param {object} element - DOM element.
  * @return {number} The DOM element X coordinate.
  */
  var getElementXCoord = function (element) {
    var box = element.getBoundingClientRect();
    return box.left + window.pageXOffset;
  };

  /**
  * Delayed execution of a function.
  * @param {function} cb - function to execute.
  * @param {number} timeout - delay in milliseconds.
  * @return {function}
  */
  var debounce = function (cb, timeout) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, timeout);
    };
  };

  /**
  * Prevents default event behaviour.
  * @param {object} evt - event object.
  */
  var preventEventDefault = function (evt) {
    evt.preventDefault();
    evt.stopPropagation();
  };

  window.utils = {
    isEscKeyCode: isEscKeyCode,
    isEnterKeyCode: isEnterKeyCode,
    isLeftArrowKeyCode: isLeftArrowKeyCode,
    isRightArrowKeyCode: isRightArrowKeyCode,
    getRandomNumber: getRandomNumber,
    percentToValue: percentToValue,
    getRandomItem: getRandomItem,
    getNextItem: getNextItem,
    removeDuplicates: removeDuplicates,
    getElementWidth: getElementWidth,
    getElementXCoord: getElementXCoord,
    debounce: debounce,
    preventEventDefault: preventEventDefault
  };
})();
