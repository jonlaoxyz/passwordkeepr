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
        <a href="" title="Edit" ><i class="bi bi-pencil-square class="edit-password" data-password-id="${passwordObj.id}"></i></a> |
        <a href="" title="Delete" class="delete-password" data-password-id="${passwordObj.id}"><i class="bi bi-trash3"></i></a>
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

// Function to loads a password from '/api/passwordsCategoriesJoin' and recieve an array of passwords in json
const loadPasswords = function () {
  return $.ajax({
    method: "GET",
    url: "/api/passwordsCategoriesJoin",
    dataType: "json"
  });
};

// Convert category name to category_id function
const convertCategoryToId = function (categoryName) {
  const categoryMapping = {
    "Social": 1,
    "Work Related": 2,
    "Entertainment": 3,
    "Finance": 4,
    "Health and Fitness": 5,
    "Education": 6,
  };

  return categoryMapping[categoryName];
};

// Function to fetch password details by ID
const fetchPasswordDetails = function (passwordId) {

  $.ajax({
    method: "GET",
    url: `/api/passwords/${passwordId}`,
    dataType: "json"
  })
    .then((response) => {

      const passwordDetails = response.password[0];
      console.log(passwordDetails[0]);
      populateEditForm(passwordDetails);
    })
    .catch((error) => {
      console.error('Error fetching password details:', error);
    });
};

// Function to populate the edit form with password details
const populateEditForm = function (passwordDetails) {
  $("#websiteName").val(passwordDetails.website_name);
  $("#url").val(passwordDetails.url);
  $("#userName").val(passwordDetails.username);
  $("#categories").val(passwordDetails.category_id);
  $("#outputPassword").val(passwordDetails.password);
};


// Function to delete a password
const deletePassword = function (passwordId) {
  $.ajax({
    method: "DELETE",
    url: `/api/passwords/${passwordId}`,
    success: function (response) {
      console.log("Password deleted:", response);

      // Reload passwords and render them after deletion
      loadPasswords().then((response) => {
        const passwords = response.passwordsCategoriesJoin;
        renderPasswords(passwords);
      }).catch(function (error) {
        console.error('Error loading passwords:', error);
      });

      alert("Password deleted successfully!");
    },
    error: function (error) {
      console.error('Error deleting password:', error);
      alert("Error deleting password. Please try again.");
    },
  });
};





$(document).ready(function () {
  // Load passwords and rendering.
  loadPasswords().then((response) => {
    const passwords = response.passwordsCategoriesJoin;
    renderPasswords(passwords);
  }).catch(function (error) {
    console.error('Error loading passwords:', error);
  });

  // Add click event for save button on password form
  $("#passwordForm").on("submit", function (event) {
    event.preventDefault();
    console.log("formData");

    const websiteName = $("#websiteName").val();
    const url = $("#url").val();
    const userName = $("#userName").val();
    const category = $("#categories").val();
    const outputPassword = $("#outputPassword").val();
    //validation
    if (!websiteName || !url || !userName || !category || !outputPassword) {
      alert("Please fill in all fields");
      return;
    }

    // Convert category name to category_id
    const categoryId = convertCategoryToId(category);
    const organizationId = 1;

    const requestBody = {
      websiteName: websiteName,
      url: url,
      userName: userName,
      outputPassword: outputPassword,
      organizationId: organizationId,
      categoryId: categoryId,
    };

    const requestBodyJSON = requestBody;

    //If everything goes great, proceed with sending tweet to server
    $.ajax({
      method: "POST",
      url: "/api/passwords",
      data: requestBodyJSON,
      success: function (response) {
        // Handle the success response from the server
        console.log("Hey:", response);

        // Clear the form fields (optional)
        $("#websiteName, #url, #userName, #categories, #outputPassword").val('');

        // Load updated passwords and render them
        loadPasswords().then((response) => {
          const passwords = response.passwordsCategoriesJoin;
          renderPasswords(passwords);
        }).catch(function (error) {
          console.error('Error loading passwords:', error);
        });

        // show a success message to the user
        alert("Password saved successfully!");
        $("#newPassword").hide();
      },
      error: function (error) {
        // error response from the server
        console.error('Error saving password:', error);
        alert("Error saving password. Please try again.");
      },
    });

  });


  // Add click event for delete-password
  $('#password-list').on('click', '.delete-password', function (event) {
    event.preventDefault();
    const passwordId = $(this).data('password-id');
    deletePassword(passwordId);
  });



  $('#password-list').on('click', '.bi-pencil-square', function (event) {
    event.preventDefault();
    const passwordId = $(this).data('password-id');
    $("#sectionHeader").text("Edit Form");
    
    $('#newPassword').show();
    $(".mainList").hide();
    $("#password-list").hide();
    fetchPasswordDetails(passwordId);

  });

  $("#cancelButton , #closeMe").on("click", function (event) {
    event.preventDefault();
    $("#newPassword").hide();
    $(".mainList").show();
    $("#password-list").show();

  
});




});



