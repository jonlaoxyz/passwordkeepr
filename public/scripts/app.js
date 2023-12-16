// Client facing scripts here

// Creating new password
const createPasswordElement = function(passwordObj) {
  const $passwordRow = $(`
    <tr>
      <td>${passwordObj.website_name}</td>
      <td>${passwordObj.username}</td>
      <td>${passwordObj.password}</td>
      <td><a href="">${passwordObj.url}</a></td>
      <td>${passwordObj.category}</td>
      <td>
        <span class="edit">Edit</span> /
        <span class="delete">Delete</span>
      </td>
    </tr>
  `);

  return $passwordRow;
};

    




