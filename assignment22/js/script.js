(function (global) {
  var dc = {};

  // Set the default pages to load
  var homeHtml = "snippets/home-page.html";
  var historyHtml = "snippets/history-content.html";
  var contactHtml = "snippets/contact.html";

  // Convenience function for inserting innerHTML for 'selector'
  var insertHtml = function (selector, html) {
    var targetElem = document.querySelector(selector);
    targetElem.innerHTML = html;
  };

  // Show loading icon inside element identified by 'selector'.
  var showLoading = function (selector) {
    var html = "<div class='text-center'>";
    html += "<img src='images/ajax-loader.gif'></div>";
    insertHtml(selector, html);
  };

  // On page load (before images or CSS)
  document.addEventListener("DOMContentLoaded", function (event) {
    // Check the current URL for a query parameter to determine which page to load
    var currentPage = new URLSearchParams(window.location.search).get('page');

    // Load the appropriate content based on the URL parameter
    switch (currentPage) {
      case 'history':
        dc.loadHistoryContent();
        break;
      case 'contact':
        dc.loadcontactContent();
        break;
      default:
        dc.loadHomeContent(); // Default to home content
        break;
    }
  });

  // Function to load the home page content
  dc.loadHomeContent = function () {
    showLoading("#main-content");
    $ajaxUtils.sendGetRequest(homeHtml, function (responseText) {
      insertHtml("#main-content", responseText);
      history.pushState(null, '', '?page=home'); // Update the URL to ?page=home
    });
  };

  // Function to load the history page content
  dc.loadHistoryContent = function () {
    showLoading("#main-content");
    $ajaxUtils.sendGetRequest(historyHtml, function (responseText) {
      insertHtml("#main-content", responseText);
      history.pushState(null, '', '?page=history'); // Update the URL to ?page=history
    });
  };

  // Function to load the contact page content
  dc.loadcontactContent = function () {
    showLoading("#main-content");
    $ajaxUtils.sendGetRequest(contactHtml, function (responseText) {
      insertHtml("#main-content", responseText);
      history.pushState(null, '', '?page=contact'); // Update the URL to ?page=contact
    });
  };

  

  // Expose the 'dc' object to the global scope
  global.$dc = dc;
})(window);
