const connection = require('./database');

const initDB = () => {
  // Create database if not exists
  connection.query('CREATE DATABASE IF NOT EXISTS travel_app', (err) => {
    if (err) throw err;
    console.log('Database travel_app created or already exists');

    // Use the database
    connection.changeUser({ database: 'travel_app' }, (err) => {
      if (err) throw err;

      // Create tables
      const createLocationsTable = `
        CREATE TABLE IF NOT EXISTS locations (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          description TEXT,
          attractions TEXT
        )
      `;

      const createReviewsTable = `
        CREATE TABLE IF NOT EXISTS reviews (
          id INT AUTO_INCREMENT PRIMARY KEY,
          location_id INT,
          rating INT CHECK (rating >= 1 AND rating <= 5),
          comment TEXT,
          FOREIGN KEY (location_id) REFERENCES locations(id) ON DELETE CASCADE
        )
      `;

      const createBookingsTable = `
        CREATE TABLE IF NOT EXISTS bookings (
          id INT AUTO_INCREMENT PRIMARY KEY,
          customer_name VARCHAR(255) NOT NULL,
          location_id INT,
          booking_date DATE,
          FOREIGN KEY (location_id) REFERENCES locations(id) ON DELETE CASCADE
        )
      `;

      connection.query(createLocationsTable, (err) => {
        if (err) throw err;
        console.log('Locations table created');

        connection.query(createReviewsTable, (err) => {
          if (err) throw err;
          console.log('Reviews table created');

          connection.query(createBookingsTable, (err) => {
            if (err) throw err;
            console.log('Bookings table created');

            // Insert sample data
            insertSampleData();
          });
        });
      });
    });
  });
};

const insertSampleData = () => {
  // Insert locations
  const locations = [
    ['Paris', 'The City of Light', 'Eiffel Tower, Louvre Museum'],
    ['Tokyo', 'A bustling metropolis', 'Mount Fuji, Shibuya Crossing'],
    ['New York', 'The Big Apple', 'Statue of Liberty, Times Square']
  ];

  locations.forEach(location => {
    connection.query('INSERT INTO locations (name, description, attractions) VALUES (?, ?, ?)', location, (err) => {
      if (err) console.error('Error inserting location:', err);
    });
  });

  // Insert reviews (assuming location ids 1,2,3)
  const reviews = [
    [1, 5, 'Amazing city!'],
    [2, 4, 'Great food and culture'],
    [3, 5, 'Iconic landmarks']
  ];

  reviews.forEach(review => {
    connection.query('INSERT INTO reviews (location_id, rating, comment) VALUES (?, ?, ?)', review, (err) => {
      if (err) console.error('Error inserting review:', err);
    });
  });

  // Insert bookings
  const bookings = [
    ['John Doe', 1, '2023-12-01'],
    ['Jane Smith', 2, '2023-11-15']
  ];

  bookings.forEach(booking => {
    connection.query('INSERT INTO bookings (customer_name, location_id, booking_date) VALUES (?, ?, ?)', booking, (err) => {
      if (err) console.error('Error inserting booking:', err);
    });
  });

  console.log('Sample data inserted');
};

module.exports = initDB;
