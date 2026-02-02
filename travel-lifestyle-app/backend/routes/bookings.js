const express = require('express');
const connection = require('../db/database');

const router = express.Router();

// GET /api/bookings - Fetch all bookings
router.get('/', (req, res) => {
  const query = 'SELECT * FROM bookings';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching bookings:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json(results);
  });
});

// POST /api/bookings - Create a new booking
router.post('/', (req, res) => {
  const { customer_name, location_id, booking_date } = req.body;
  if (!customer_name || !location_id || !booking_date) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const query = 'INSERT INTO bookings (customer_name, location_id, booking_date) VALUES (?, ?, ?)';
  connection.query(query, [customer_name, location_id, booking_date], (err, result) => {
    if (err) {
      console.error('Error inserting booking:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.status(201).json({ id: result.insertId, message: 'Booking created successfully' });
  });
});

module.exports = router;
