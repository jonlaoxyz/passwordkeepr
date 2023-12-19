// Client facing scripts here

// Creating new password
const createPasswordElement = function (passwordObj) {
  const $passwordContainer = $(`
  <section class="password-item rounded shadow">
      <div class="website-name row">
        <h2>${passwordObj.website_name}</h2>
      </div>
      <div class="user-id row">
        <span class="col-2 p-1 text-end">User Name:</span>
        <span class="col p-1">${passwordObj.username}</span>
        <span class="col p-1"><a href="" class="copy-icon" data-text="${passwordObj.username}"><i class="bi bi-copy"></i></a></span>
      </div>
      <div class="password row">
        <span class="col-2 p-1 text-end">Password:</span>
        <span class="col p-1">${passwordObj.password}</span>
        <span class="col p-1"><a href="" class="copy-icon" data-text="${passwordObj.password}"><i class="bi bi-copy"></i></a></span>
      </div>
      <div class="url row">
        <span class="col-2 p-1 text-end">URL:</span>
        <span class="col p-1"><a href="${passwordObj.url}">${passwordObj.url}</a></span>
      </div>
      <div class="category row">
        <span class="col-2 p-1 text-end">Category:</span>
        <span class="col p-1">${passwordObj.category_name}</span>
      </div>
      <div class="actions text-end">
        <a href="" title="Edit"><i class="bi bi-pencil-square"></i></a> |
        <a href="" title="Delete"><i class="bi bi-trash3"></i></a>
      </div>
    </section>
  `);

  return $passwordContainer;
};


// Append new password to the password-container
const renderPasswords = function (passwords) {
  $('#password-list').empty();
  for (const password of passwords) {
    const $password = createPasswordElement(password);

    $('#password-list').append($password);
  }

  // Add click event for copy-icon
  $('.copy-icon').click(function (event) {
    event.preventDefault();   //prevents scrolling to the top of the page
    const textToCopy = $(this).data('text');
    copyToClipboard(textToCopy);
    alert("Copy Successfull");
  });

};

// Function to loads a password from '/api/passwordsCategoriesJoin' and recieve an array of tweets in json
const loadPasswords = function () {
  return $.ajax({
    method: "GET",
    url: "/api/passwordsCategoriesJoin",
    dataType: "json"
  });
};




$(document).ready(function () {
  // Load passwords and rendering.
  loadPasswords().then((response) => {
    const passwords = response.passwordsCategoriesJoin; // Access the array property
    renderPasswords(passwords);
  }).catch(function (error) {
    console.error('Error loading passwords:', error);
  });



});


// Post password details to server when new password is saved
$("#form").on("submit", function (event) {
  event.preventDefault();

  //validation

  //If everything goes great, proceed with sending tweet to server
  const formData = $(event.currentTarget).serialize();
  console.log(formData);




});






// // Post password details to server when new password is saved
// $("#form").on("submit", function(event) {
//   event.preventDefault();

//   //validation

//   //If everything goes great, proceed with sending tweet to server
//   const formData = $(event.currentTarget).serialize();
//   console.log(formData);
//   $.ajax({
//     method: "POST",
//     url: "/api",
//     data: formData
//   }).then(() => {
//     loadTweets().then((tweets) => {
//       $(".counter").text("140");
//       // post success message
//       let SuccessMessage = $(".success-message");
//       SuccessMessage.text("Tweet Successfully Posted!").show();
//       setTimeout(() => {
//         SuccessMessage.hide();
//       }, 2500);
//       // render tweets
//       renderTweets(tweets);
//     }).catch(function(error) {
//       console.error("Error loading tweets:", error);
//     });

//     $tweetText.val("");
//   });


// //  });




