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
        <i class="far fa-edit" style="color: #989ea9;"></i> /
        <i class="fa-solid fa-trash" style="color: #989ea9;"></i>
      </td>
    </tr>
  `);

  return $passwordRow;
};

    




