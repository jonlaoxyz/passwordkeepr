// routes/passwords.js

const express = require('express');
const router = express.Router();
const passwordQueries = require('../db/queries/passwords');

// GET /api/passwords
router.get('/', (req, res) => {
  passwordQueries.getPasswords()
    .then(passwords => {
      res.json({ passwords });
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;