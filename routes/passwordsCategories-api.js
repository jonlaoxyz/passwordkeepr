// routes/passwords-categories.js

const express = require('express');
const router = express.Router();
const passwordCategoriesQueries = require('../db/queries/passwordsCategoriesJoin');

// GET /api/passwordCategories
router.get('/', (req, res) => {
  passwordCategoriesQueries.getPasswordsCategoriesJoin()
    .then(passwordsCategoriesJoin => {
      res.json({ passwordsCategoriesJoin });
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});



module.exports = router;