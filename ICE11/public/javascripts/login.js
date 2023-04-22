$(document).ready(function() {

    // Create the ErrorMessage div and hide it
    var errorMessageDiv = $('<div id="ErrorMessage"></div>').hide();
  
    // Add the ErrorMessage div to the page
    $('body').append(errorMessageDiv);
  
    // Function to show the error message
    function showError(message, elementId) {
      // Set the error message text and show the ErrorMessage div
      errorMessageDiv.text(message);
      $("#" + elementId).text(message);
    }
  
    // Function to hide the error message
    function hideError(elementId) {
      // Hide the ErrorMessage div
      $("#" + elementId).text("");
    }
  
    // Add an event listener to the login form submit button
    $('#loginForm').on('submit', function(event) {
      // Prevent the form from submitting
      event.preventDefault();
  
      // Get the input values
      var username = $("#username").val();
      var password = $('#password').val();
  
      // Validate username
      if (username.length < 3) {
        showError("Username must be at least 3 characters long.", "usernameError");
      } else {
        hideError("usernameError");
      }
  
      // Validate password
      if (password.length < 6) {
        showError("Password must be at least 6 characters long.", "passwordError");
      } else {
        hideError("passwordError");
      }
  
      // Check if all inputs are valid
      if (username.length >= 3 && password.length >= 6) {
        // Insert the username into the nav bar
        var usernameLink = $('<a class="nav-link" href="#">' + username + '</a>');
        var navItem = $('<li class="nav-item"></li>');
        navItem.append(usernameLink);
  
        // Find the "Contact Us" link and insert the username link before it
        var contactUsLink = $('a[href="./contact.html"]');
        contactUsLink.parent().before(navItem);
        contactUsLink.parent().before('<li>&nbsp;&nbsp;&nbsp;</li>');
  
        // Clear the form
        $('#loginForm')[0].reset();
      }
    });
  
  });
  