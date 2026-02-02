document.addEventListener('DOMContentLoaded', () => {
  fetchBookings();
  const form = document.getElementById('booking-form');
  form.addEventListener('submit', handleBookingSubmit);
});

async function fetchBookings() {
  try {
    const response = await fetch('http://localhost:3000/api/bookings');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const bookings = await response.json();
    displayBookings(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    document.getElementById('bookings-list').innerHTML = '<p>Error loading bookings. Please try again later.</p>';
  }
}

function displayBookings(bookings) {
  const container = document.getElementById('bookings-list');
  container.innerHTML = '';

  if (bookings.length === 0) {
    container.innerHTML = '<p>No bookings found.</p>';
    return;
  }

  bookings.forEach(booking => {
    const bookingDiv = document.createElement('div');
    bookingDiv.className = 'booking';
    bookingDiv.innerHTML = `
      <h3>Booking ID: ${booking.id}</h3>
      <p><strong>Customer:</strong> ${booking.customer_name}</p>
      <p><strong>Location ID:</strong> ${booking.location_id}</p>
      <p><strong>Date:</strong> ${booking.booking_date}</p>
    `;
    container.appendChild(bookingDiv);
  });
}

async function handleBookingSubmit(event) {
  event.preventDefault();

  const customerName = document.getElementById('customer-name').value;
  const locationId = parseInt(document.getElementById('location-id').value);
  const bookingDate = document.getElementById('booking-date').value;

  try {
    const response = await fetch('http://localhost:3000/api/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customer_name: customerName,
        location_id: locationId,
        booking_date: bookingDate,
      }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.json();
    alert('Booking created successfully!');
    document.getElementById('booking-form').reset();
    fetchBookings(); // Refresh the list
  } catch (error) {
    console.error('Error creating booking:', error);
    alert('Error creating booking. Please try again.');
  }
}
