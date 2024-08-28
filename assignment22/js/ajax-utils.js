(function (global) {
  // Set up a namespace for our utility
  var ajaxUtils = {};

  // Returns an HTTP request object
  function getRequestObject() {
    if (global.XMLHttpRequest) {
      return new XMLHttpRequest();
    } else if (global.ActiveXObject) {
      // For very old IE browsers (optional)
      return new ActiveXObject("Microsoft.XMLHTTP");
    } else {
      global.alert("Ajax is not supported!");
      return null;
    }
  }

  // Makes an Ajax GET request to 'requestUrl'
  ajaxUtils.sendGetRequest = function (requestUrl, responseHandler, isJsonResponse) {
    var request = getRequestObject();
    request.onreadystatechange = function () {
      handleResponse(request, responseHandler, isJsonResponse);
    };
    request.open("GET", requestUrl, true); // true for asynchronous
    request.send(null); // for POST only, we can use request.send()
  };

  // Handles the response from the server
  function handleResponse(request, responseHandler, isJsonResponse) {
    if (request.readyState == 4 && request.status == 200) {
      // Default to isJsonResponse = true if not explicitly set
      if (isJsonResponse === undefined) {
        isJsonResponse = true;
      }
      responseHandler(request.responseText);

    }
  }

  // Expose utility to the global object
  global.$ajaxUtils = ajaxUtils;
})(window);