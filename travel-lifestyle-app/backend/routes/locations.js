const express = require('express');
const connection = require('../db/database');

const router = express.Router();

// GET /api/locations
router.get('/', (req, res) => {
  const query = 'SELECT * FROM locations';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching locations:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json(results);
  });
});

module.exports = router;
