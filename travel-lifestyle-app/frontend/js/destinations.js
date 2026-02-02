document.addEventListener('DOMContentLoaded', () => {
  fetchLocations();
});

async function fetchLocations() {
  try {
    const response = await fetch('http://localhost:3000/api/locations');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const locations = await response.json();
    displayLocations(locations);
  } catch (error) {
    console.error('Error fetching locations:', error);
    document.getElementById('locations-list').innerHTML = '<p>Error loading destinations. Please try again later.</p>';
  }
}

function displayLocations(locations) {
  const container = document.getElementById('locations-list');
  container.innerHTML = '';

  locations.forEach(location => {
    const locationDiv = document.createElement('div');
    locationDiv.className = 'location';
    locationDiv.innerHTML = `
      <h3>${location.name}</h3>
      <p>${location.description}</p>
      <p><strong>Attractions:</strong> ${location.attractions}</p>
    `;
    container.appendChild(locationDiv);
  });
}
