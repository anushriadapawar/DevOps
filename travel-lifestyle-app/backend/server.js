const express = require('express');
const path = require('path');
const initDB = require('./db/init');
const locationsRouter = require('./routes/locations');
const bookingsRouter = require('./routes/bookings');

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize database
initDB();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// Routes
app.use('/api/locations', locationsRouter);
app.use('/api/bookings', bookingsRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
