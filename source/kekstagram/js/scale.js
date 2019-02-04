'use strict';

(function () {
  var SCALE_STEP = 25;
  var SCALE_MAX = 100;
  var SCALE_MIN = 25;
  var SCALE_DEFAULT = 100;

  var scale = document.querySelector(
      window.selectors.Scale.SCALE
  );
  var image = document.querySelector(
      window.selectors.Scale.IMAGE
  );

  /**
  * Returns scale to it's default value (SCALE_DEFAULT).
  */
  var toDefault = function () {
    setNumericScaleValue(SCALE_DEFAULT);
    scaleImage(SCALE_DEFAULT);
  };

  /**
  * Increases scale value for SCALE_STEP.
  */
  var increase = function () {
    var value = getNumericScaleValue();
    if (value < SCALE_MAX) {
      value += SCALE_STEP;
      applyChanges(value);
    }
  };

  /**
  * Decreases scale value for SCALE_STEP.
  */
  var decrease = function () {
    var value = getNumericScaleValue();
    if (value > SCALE_MIN) {
      value -= SCALE_STEP;
      applyChanges(value);
    }
  };

  /**
  * Applies scale value changes to binded elements.
  * @param {number} value - scale value
  */
  var applyChanges = function (value) {
    setNumericScaleValue(value);
    scaleImage(value);
  };

  /**
  * Parses scale value to number.
  * @return {number} Scale value parsed to int.
  */
  var getNumericScaleValue = function () {
    return parseInt(scale.value, 10);
  };

  /**
  * Converts scale value to string and updates DOM element value.
  * @param {number} value - numeric scale value.
  */
  var setNumericScaleValue = function (value) {
    scale.value = value + '%';
  };

  /**
  * Scales image according to scale value.
  * @param {number} percent - scale value (the number from 0 to 100).
  */
  var scaleImage = function (percent) {
    image.style.transform = 'scale(' + (percent * 0.01) + ')';
  };

  window.scale = {
    increase: increase,
    decrease: decrease,
    toDefault: toDefault
  };
})();

