'use strict';

(function () {
  var slider = document.querySelector(
      window.selectors.Slider.SLIDER
  );
  var scale = document.querySelector(
      window.selectors.Slider.SCALE
  );
  var pin = document.querySelector(
      window.selectors.Slider.PIN
  );
  var depthElement = document.querySelector(
      window.selectors.Slider.DEPTH
  );

  /**
  * Shows slider.
  */
  var show = function () {
    slider.classList.remove('hidden');
  };

  /**
  * Hides slider.
  */
  var hide = function () {
    slider.classList.add('hidden');
  };

  /**
  * Moves slider pin to it's max position.
  */
  var toMax = function () {
    var scaleWidth = window.utils.getElementWidth(scale);
    pin.style.left = scaleWidth + 'px';
    applyChanges();
  };

  /**
  * Moves slider pin to it's min position.
  */
  var toMin = function () {
    pin.style.left = 0 + 'px';
    applyChanges();
  };

  /**
  * Updates depth element width according to pin
  * position relative to scale.
  * @param {float} percent - the number from 0 to 1,
  * that describes pin position relative to scale.
  */
  var changeDepthElementWidth = function (percent) {
    depthElement.style.width = (percent * 100) + '%';
  };

  /**
  * Moves slider pin to the new position.
  * @param {number} position - X coordinate.
  */
  var movePin = function (position) {
    pin.style.left = position + 'px';
  };

  /**
  * Applies slider changes to binded elements.
  */
  var applyChanges = function () {
    var percent = getPinPositionRelativeToScaleInPercent();
    changeDepthElementWidth(percent);
    window.editor.changeFilterIntensity(percent);
  };

  /**
  * Calculates pin position relative to scale in percent.
  * @return {float} Number from 0 to 1, that describes
  * pin position relative to scale in percent.
  */
  var getPinPositionRelativeToScaleInPercent = function () {
    var pinXCoord = window.utils.getElementXCoord(pin);
    var scaleXCoord = window.utils.getElementXCoord(scale);
    var pinHalfWidth = window.utils.getElementWidth(pin) / 2;
    var scaleWidth = window.utils.getElementWidth(scale);

    var pinPosition = Math.round(pinXCoord + pinHalfWidth - scaleXCoord);

    return pinPosition / scaleWidth;
  };

  /**
  * Scale click event handler.
  * If user clicks on scale, the scale pin should moves
  * to the position, where click occurs.
  * @param {object} evt - event object.
  */
  var onScaleClick = function (evt) {
    var pinXCoord = window.utils.getElementXCoord(pin);
    var pinHalfWidth = window.utils.getElementWidth(pin) / 2;
    var shiftX = evt.pageX - pinXCoord - pinHalfWidth;
    var moveTo = pin.offsetLeft + shiftX;
    movePin(moveTo);
    applyChanges();
  };

  /**
  * Pin mouse down event handler.
  * If user captures the pin, it starts to follow the cursor,
  * unless the pin is released.
  * @param {object} evt - event object.
  */
  var onPinMouseDown = function (evt) {
    var pinXCoord = window.utils.getElementXCoord(pin);
    var scaleXCoord = window.utils.getElementXCoord(scale);
    var scaleWidth = window.utils.getElementWidth(scale);
    var shiftX = evt.pageX - pinXCoord;

    var onMouseMove = function (moveEvt) {
      var moveTo = moveEvt.pageX - shiftX - scaleXCoord;

      moveTo = (moveTo < 0) ? 0 : moveTo;
      moveTo = (moveTo > scaleWidth) ? scaleWidth : moveTo;

      movePin(moveTo);
      applyChanges();
    };

    var onMouseUp = function () {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  /**
  * Pin focus event handler.
  * If user focuses on the pin and starts to press
  * left and right arrows on the keyboard,
  * the pin starts to move left and right accordingly
  */
  var onPinFocus = function () {
    var scaleWidth = window.utils.getElementWidth(scale);
    var leftLimit = 0;
    var rightLimit = scaleWidth;
    var step = scaleWidth / 20;

    var onDocumentKeyDown = function (evt) {
      var moveTo = null;

      if (window.utils.isLeftArrowKeyCode(evt.keyCode)) {
        moveTo = pin.offsetLeft - step;
        moveTo = moveTo < leftLimit ? leftLimit : moveTo;
      }

      if (window.utils.isRightArrowKeyCode(evt.keyCode)) {
        moveTo = pin.offsetLeft + step;
        moveTo = moveTo > rightLimit ? rightLimit : moveTo;
      }

      if (moveTo !== null) {
        movePin(moveTo);
        applyChanges();
      }
    };

    var onPinBlur = function () {
      document.removeEventListener('keydown', onDocumentKeyDown);
      pin.removeEventListener('blur', onPinBlur);
    };

    document.addEventListener('keydown', onDocumentKeyDown);
    pin.addEventListener('blur', onPinBlur);
  };

  pin.addEventListener('mousedown', onPinMouseDown);
  pin.addEventListener('focus', onPinFocus);
  scale.addEventListener('click', onScaleClick);

  window.slider = {
    show: show,
    hide: hide,
    toMax: toMax,
    toMin: toMin
  };
})();
