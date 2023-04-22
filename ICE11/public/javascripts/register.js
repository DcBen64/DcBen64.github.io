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
    // User class
  class User {
    constructor(firstName, lastName, username, email, password) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.username = username;
      this.email = email;
      this.password = password;
    }
  }
    // Add an event listener to the register form submit button
    $('#registerForm').on('submit', function(event) {
      // Prevent the form from submitting
      event.preventDefault();
  
      // Get the input values
      var firstName = $("#firstname").val();
      var lastName = $("#lastname").val();
      var email = $("#email").val();
      var password = $('#password').val();
      var confirmPassword = $('#confirm_password').val();
  
      // Validate first name
      if (firstName.length < 2) {
        showError("First name must be at least 2 characters long.", "firstNameError");
      } else {
        hideError("lastNameError");
      }
      
      // Validate last name
      if (lastName.length < 2) {
        showError("Last name must be at least 2 characters long.", "lastNameError");
      } else {
        hideError("firstNameError");
      }
  
      // Validate email
      var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showError("Email must be at least 8 characters long and contain an @ symbol.", "emailError");
      } else {
        hideError("emailError");
      }
  
      // Validate passwords
      if (password.length < 6 || confirmPassword.length < 6) {
        showError("Passwords must be at least 6 characters long.", "passwordError");
      } else if (password !== confirmPassword) {
        showError("Passwords do not match.", "confirmPasswordError");
      } else {
        hideError("passwordError");
        hideError("confirmPasswordError");
       // Create a new User object
      var user = new User(firstName, lastName, null, email, password);
      console.log(user);

      // Clear the form
      $('#registerForm')[0].reset();
        }
    });
  
  });
  