'use strict';

(function () {
  var fileDialog = document.querySelector(
      window.selectors.Uploader.DIALOG
  );
  var filePreview = document.querySelector(
      window.selectors.Uploader.PREVIEW
  );
  var uploadControl = document.querySelector(
      window.selectors.Uploader.CONTAINER
  );

  /**
  * Uploads selected picture to the editor preview.
  * @param {string} file - file name to load.
  */
  var upload = function (file) {
    var reader = new FileReader();

    reader.addEventListener('load', function () {
      filePreview.src = reader.result;
    });

    reader.readAsDataURL(file);
  };

  fileDialog.addEventListener('change', function () {
    var file = fileDialog.files[0];
    upload(file);
    window.editor.open();
  });

  uploadControl.addEventListener('click', function () {
    fileDialog.value = '';
  });
})();
