const express = require('express');
const router = express.Router();
const db = require('../db/connection');


router.post('/logout', (req, res) => {
  // Destroy the session

  req.session = null;
  res.redirect('/login');

});


module.exports = router;