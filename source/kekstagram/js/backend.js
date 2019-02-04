'use strict';

(function () {
  var SERVER_TIMEOUT = 10000;
  var STATUS_200_OK = 200;

  var HttpMethod = {
    POST: {
      command: 'POST',
      url: 'https://js.dump.academy/kekstagram'
    },
    GET: {
      command: 'GET',
      url: 'https://js.dump.academy/kekstagram/data'
    }
  };

  var StatusMessage = {
    1: 'Статус ответа: информационный',
    2: 'Статус ответа: успешный',
    3: 'Статус ответа: перенаправление',
    4: 'Статус ответа: ошибка клиента',
    5: 'Статус ответа: ошибка сервера'
  };

  var Message = {
    CONNECTION_ERROR: 'Произошла ошибка соединения',
    TIMEOUT: 'Запрос не успел выполниться за ' + SERVER_TIMEOUT + 'мс',
    UNKNOWN_STATUS: 'Неизвестный статус ответа сервера'
  };

  /**
  * Loads data from server.
  * @param {function} onLoad - load finished callback.
  * @param {function} onError - load error callback.
  */
  var load = function (onLoad, onError) {
    executeRequest(HttpMethod.GET, onLoad, onError);
  };

  /**
  * Loads data to server.
  * @param {object} data - data to send.
  * @param {function} onLoad - load finished callback.
  * @param {function} onError - load error callback.
  */
  var save = function (data, onLoad, onError) {
    executeRequest(HttpMethod.POST, onLoad, onError, data);
  };

  /**
  * Executes HTTP request.
  * @param {object} method - HttpMethod item.
  * @param {function} onLoad - load finished callback.
  * @param {function} onError - load error callback.
  * @param {object} data - data to send, if needed.
  */
  var executeRequest = function (method, onLoad, onError, data) {
    var xhr = new XMLHttpRequest();

    if (onLoad && onError) {
      setupCallbacks(xhr, method, onLoad, onError);
    }

    sendRequest(xhr, method, data);
  };

  /**
  * Sets HTTP request callbacks.
  * @param {object} xhr - XMLHttpRequest instance.
  * @param {object} method - HttpMethod item.
  * @param {function} onLoad - load finished callback.
  * @param {function} onError - load error callback.
  */
  var setupCallbacks = function (xhr, method, onLoad, onError) {
    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_200_OK) {
        switch (method) {
          case HttpMethod.POST:
            onLoad();
            break;
          case HttpMethod.GET:
            onLoad(xhr.response);
            break;
        }
      } else {
        onError(getStatusType(xhr.status) + ', код ответа: ' + xhr.status);
      }
    });

    xhr.addEventListener('error', function () {
      onError(Message.CONNECTION_ERROR);
    });

    xhr.addEventListener('timeout', function () {
      onError(Message.TIMEOUT);
    });
  };

  /**
  * Sends HTTP request callbacks.
  * @param {object} xhr - XMLHttpRequest instance.
  * @param {object} method - HttpMethod item.
  * @param {object} data - data to send, if needed.
  */
  var sendRequest = function (xhr, method, data) {
    xhr.timeout = SERVER_TIMEOUT;

    xhr.open(method.command, method.url);

    switch (method) {
      case HttpMethod.POST:
        xhr.send(data);
        break;
      case HttpMethod.GET:
        xhr.responseType = 'json';
        xhr.send();
        break;
    }
  };

  /**
  * Gets status type message.
  * @param {number} status - status code.
  * @return {string} Status type message.
  */
  var getStatusType = function (status) {
    return StatusMessage[(status + '')[0]];
  };

  window.backend = {
    load: load,
    save: save
  };
})();
