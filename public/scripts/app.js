// Client facing scripts here

// Creating new password
const createPasswordElement = function (passwordObj) {
  const $passwordContainer = $(`
  <article class="password-item">
  <div class="website-name">
    <span class="col">Website:</span>
    <span class="col">${passwordObj.website_name}</span>
  </div>
  <div class="user-id">
    <span class="col">User Name:</span>
    <span class="col">${passwordObj.username}</span>
    <span class="col"><i class="bi bi-copy"></i></span>
  </div>
  <div class="password">
    <span>Password:</span>
    <span>${passwordObj.password}</span>
    <span><i class="bi bi-copy"></i></span>
  </div>
  <div class="url">
    <span>URL:</span>
    <span><a href="${passwordObj.url}">${passwordObj.url}</a></span>
  </div>
  <div class="category">
    <span>Category:</span>
    <span>${passwordObj.category_name}</span>
  </div>
  <div class="actions">
      <i class="bi bi-pencil-square"></i> <i class="bi bi-trash3"></i>
  </div>
</article>
  `);

  return $passwordContainer;
};

// Append new password to the password-container
const renderPasswords = function (response) {
  const passwords = response.passwordsCategoriesJoin; // Extract passwords from the response
  $('#password-container').empty();
  for (const password of passwords) {
    const $password = createPasswordElement(password);

    $('#password-container').append($password);
  }

};


// Function to loads a password from '/api/passwordsCategoriesJoin' and recieve an array of tweets in json
const loadPasswords = function() {
  return $.ajax({
    method: "GET",
    url: "/api/passwordsCategoriesJoin",
    dataType: "json"
  });
};

$(document).ready(function() {

  // Load passwords and rendering.
  loadPasswords().then((passwords) => {
    renderPasswords(passwords);
  }).catch(function(error) {
    console.error("Error loading tweets:", error);
  });
});