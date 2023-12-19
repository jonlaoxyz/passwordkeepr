/*
 * All routes for Login are defined here
 * Since this file is loaded in server.js into /login,
 *   these routes are mounted onto /login
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const db = require('../db/connection'); 
const { Pool } = require('pg');
const pool = new Pool();


const getUserByEmail = (email) => {
  return db.query('SELECT * FROM users WHERE email = $1;', [email])
    .then(data => {
      return data.rows[0]; // Assuming the email is unique
    });
};



router.get('/', (req, res) => {
  res.render('login');
});

// POST route for handling login
router.post('/', (req, res) => {
  const user_email = req.body.email;
  const user_password = req.body.password;

  getUserByEmail(user_email)
    .then(user => {
      if (!user) {
        return res.status(403).send("User doesn't exists");
      }
      if (user.password !== user_password) {
        return res.status(403).send("Invalid email or password");
      }


      res.redirect('/');
    })
    .catch(err => {
      console.error('Error during login:', err);
      res.status(500).send('Internal Server Error');
    });
});

module.exports = router;
