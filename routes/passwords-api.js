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

  const { websiteName, userName, outputPassword, url, categoryId, organizationId } = req.body;
  console.log(userName);
  passwordQueries.createPassword(websiteName, userName, outputPassword, url, categoryId, organizationId)
    .then(newPassword => {
      console.log('success');
      res.status(201).json({ newPassword });
    })
    .catch(err => {
      console.log("Failure: Error creating new password:", err);
      res.status(500).json({ error: err.message });
    });
});

router.get('/:id', (req, res) => {
  const passwordId = req.params.id;
  passwordQueries.getPasswordById(passwordId)
    .then(password => {
      if (password) {
        res.json({ password });
      } else {
        res.status(404).json({ message: 'Password not found' });
      }
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

// DELETE /api/passwords/:id
router.delete('/:id', (req, res) => {
  const passwordId = req.params.id;
  passwordQueries.deletePassword(passwordId)
    .then(() => {
      res.json({ message: 'Password deleted successfully' });
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});


module.exports = router;