// Client facing scripts here

// Creating new password
const createPasswordElement = function (passwordObj) {

  const $tweet = $(`
 <article class="tweet">
        <header>
          <img src="${tweetObj.user.avatars}" alt="Profile Image">
          <div>
            <p>${tweetObj.user.name}</p>
            <p id="tweet-id"><b>${tweetObj.user.handle}</b></p>
          </div>
        </header>
      
        <div class="tweet-content">
          <p >${$("<div>").text(tweetObj.content.text).html()}</p>
        </div>
      
        <footer>
          <p><b>${timeAgo}</b></p>
          <div class="icons">
            <i class="fa-solid fa-flag"></i>
            <i class="fas fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
          </div>
        </footer>
      </article>
 `);

  return $tweet;
};

    <tr>
      <td>Example Website</td>
      <td>john_doe</td>
      <td>********</td>
      <td>http://example.com</td>
      <td>General</td>
      <td>
        <span class="edit">Edit</span> /
        <span class="delete">Delete</span>
      </td>
    </tr>




<table>
  <thead>
    <tr>
      <th>Website Name</th>
      <th>Username</th>
      <th>Password</th>
      <th>URL</th>
      <th>Category</th>
      <th>Action</th>
    </tr>
  </thead>

  <tbody>
    <!-- Script for container -->
  </tbody>
</table>