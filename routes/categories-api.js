// routes/categories-api.js

const express = require('express');
const router = express.Router();
const categoryQueries = require('../db/queries/categories');

// GET /api/categories
router.get('/', (req, res) => {
  categoryQueries.getCategories()
    .then(categories => {
      res.json({ categories });
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;