(function (global) {
  var dc = {};

  // Set the default pages to load
  var homeHtml = "snippets/home-page.html";
  var historyHtml = "snippets/history-content.html"; // Corrected path to history content

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
    // On first load, show home view
    showLoading("#main-content");
    $ajaxUtils.sendGetRequest(
      homeHtml,
      function (responseText) {
        insertHtml("#main-content", responseText);
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Smooth scroll to top after content is loaded
      },
      false
    );
  });

  // Function to load the home page content
  dc.loadHomeContent = function () {
    showLoading("#main-content");
    $ajaxUtils.sendGetRequest(homeHtml, function (responseText) {
      insertHtml("#main-content", responseText);
    });
  };

  // Function to load the history page content
  dc.loadHistoryContent = function () {
    showLoading("#main-content");
    $ajaxUtils.sendGetRequest(historyHtml, function (responseText) {
      insertHtml("#main-content", responseText);
      document.body.style.backgroundColor = "black";
    });
  };
  

  // Expose the 'dc' object to the global scope
  global.$dc = dc;
})(window);
