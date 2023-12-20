// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');
const cookieSession = require("cookie-session");




const PORT = process.env.PORT || 8080;
const app = express();

app.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2"],
  })
);

app.set('view engine', 'ejs');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static('public'));


// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const userApiRoutes = require('./routes/users-api');
const widgetApiRoutes = require('./routes/widgets-api');
const usersRoutes = require('./routes/users');
const passwordApiRoutes = require('./routes/passwords-api');
const organizationApiRoutes = require('./routes/organizations-api');
const categoryApiRoutes = require('./routes/categories-api');
const passwordCategoryApiRoutes = require('./routes/passwordsCategories-api');
const loginRoutes = require('./routes/login');
const indexRoutes = require('./routes/index');

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/api/users', userApiRoutes);
app.use('/api/widgets', widgetApiRoutes);
app.use('/users', usersRoutes);


// Note: mount other resources here, using the same pattern above
app.use('/api/passwords', passwordApiRoutes);
app.use('/api/organizations', organizationApiRoutes);
app.use('/api/categories', categoryApiRoutes);
app.use('/api/passwordsCategoriesJoin', passwordCategoryApiRoutes);
app.use('/login', loginRoutes);
app.use('/', indexRoutes);


// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get('/', (req, res) => {
  // Check if the user is authenticated
  if (!req.session.user_id) {
    return res.redirect('/login');
  }
  const user = req.session.user_id;

  // Render the index page if authenticated and pass the user data
  res.render('index', { user });
});



app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
