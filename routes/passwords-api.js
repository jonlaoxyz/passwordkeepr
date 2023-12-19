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

// POST /api/password
router.post('/', (req, res) => {
  const { website_name, username, password, url, category_id, organization_id } = req.body;

  passwordQueries.createPassword(website_name, username, password, url, category_id, organization_id)
    .then(newPassword => {
      console.log('success');
      res.status(201).json({ newPassword });
    })
    .catch(err => {
      console.log("failure");
      res.status(500).json({ error: err.message });
    });
});


module.exports = router;