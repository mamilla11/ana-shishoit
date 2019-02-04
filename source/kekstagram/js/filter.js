'use strict';

(function () {
  var INTENSITY_MIN = 0;
  var INTENSITY_MAX = 100;

  var image = document.querySelector(
      window.selectors.Filter.IMAGE
  );
  var intensity = document.querySelector(
      window.selectors.Filter.INTENSITY
  );

  var filters = {
    chrome: {
      changeIntensity: function (value) {
        return 'grayscale(' + parseFloat(value).toFixed(2) + ')';
      },
      minDepth: 0,
      maxDepth: 1
    },
    sepia: {
      changeIntensity: function (value) {
        return 'sepia(' + parseFloat(value).toFixed(2) + ')';
      },
      minDepth: 0,
      maxDepth: 1
    },
    marvin: {
      changeIntensity: function (value) {
        return 'invert(' + parseFloat(value).toFixed(0) + '%)';
      },
      minDepth: 0,
      maxDepth: 100
    },
    phobos: {
      changeIntensity: function (value) {
        return 'blur(' + parseFloat(value).toFixed(2) + 'px)';
      },
      minDepth: 0,
      maxDepth: 3
    },
    heat: {
      changeIntensity: function (value) {
        return 'brightness(' + parseFloat(value).toFixed(2) + ')';
      },
      minDepth: 1,
      maxDepth: 3
    }
  };

  var currentFilter = null;

  /**
  * Returns filter to it's default value.
  */
  var toDefault = function () {
    image.classList = '';
    image.style.filter = '';
    intensity.value = INTENSITY_MIN;
  };

  /**
  * Apply filter to image.
  * @param {string} filterName - filter name.
  */
  var apply = function (filterName) {
    toDefault();
    currentFilter = filters[filterName];

    if (!currentFilter) {
      window.slider.hide();
    } else {
      intensity.value = INTENSITY_MAX;
      window.slider.show();
      window.slider.toMax();
      image.classList.add('effects__preview--' + filterName);
    }
  };

  /**
  * Adjusts filter intensity.
  * @param {number} percent - filter intensity
  * (a number from 0 to 1).
  */
  var adjustIntensity = function (percent) {
    intensity.value = 100 * parseFloat(percent).toFixed(2);

    var value = window.utils.percentToValue(
        percent,
        currentFilter.maxDepth,
        currentFilter.minDepth
    );

    image.style.filter = currentFilter.changeIntensity(value);
  };

  window.filter = {
    apply: apply,
    adjustIntensity: adjustIntensity,
    toDefault: toDefault
  };
})();
