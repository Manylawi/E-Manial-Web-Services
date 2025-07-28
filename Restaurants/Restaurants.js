const restaurants = [
  {
    id: 1,
    name: "Anter El Kababgy",
    location: "Main Manial Street",
    image: "https://www.wikiaddres.com/_next/image/?url=https%3A%2F%2Fapi.wikiaddres.com%2Fthumbs%2Flarge%2Ffiles%2F316645450.jpg&w=1920&q=75",
    cuisines: ["Grilled Meats", "Fast Food"],
    rating: 4.5,
    menu: {
      "Grills": [
        { name: "Anter Special Kofta", price: 75, description: "Grilled kofta with special spices" },
        { name: "Chicken Shawarma", price: 65, description: "Grilled chicken with garlic sauce" },
        { name: "Grilled Liver", price: 55, description: "Lamb liver with lemon" }
      ],
      "Appetizers": [
        { name: "Salad Plate", price: 15 },
        { name: "Grilled Eggplant", price: 20 }
      ]
    },
    openingHours: "24/7",
    contact: "01001234567\n0223456789",
    locationInfo: "123 Main Manial Street, near metro station"
  },
  {
    id: 2,
    name: "Gracias",
    location: "Abdel Aziz Al Saud Street",
    image: "https://s3-eu-west-1.amazonaws.com/elmenusv5-stg/Normal/8fe6159b-ebe4-4f50-8286-5863666ee12a.jpg",
    cuisines: ["Italian", "International"],
    rating: 4.2,
    menu: {
      "Main Courses": [
        { name: "Spaghetti Carbonara", price: 120, description: "Classic pasta with creamy sauce" },
        { name: "Margherita Pizza", price: 95, description: "Traditional pizza with fresh basil" }
      ],
      "Desserts": [
        { name: "Tiramisu", price: 65, description: "Classic Italian dessert" }
      ]
    },
    openingHours: "24/7",
    contact: "01009876543",
    locationInfo: "70 Abdel Aziz Al Saud Street"
  },
  {
    id: 3,
    name: "McDonald's",
    location: "Manial Square",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMbBdZjPdU7bmTv5N8xZUXEW4xPZQp8QhSeg&s",
    cuisines: ["Fast Food", "Burgers"],
    rating: 3.8,
    menu: {
      "Burgers": [
        { name: "Big Mac", price: 60 },
        { name: "Chicken Mac", price: 55 }
      ],
      "Sides": [
        { name: "French Fries", price: 25 },
        { name: "Chicken Nuggets", price: 45 }
      ]
    },
    openingHours: "24/7",
    contact: "19019",
    locationInfo: "Manial Square, next to the Nile"
  },
  {
    id: 4,
    name: "Bulbul Fish",
    location: "Nile Corniche",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQehMOGKeD_icEwn-Hx4WgY8nCc_fCd0Bmy4w&s",
    cuisines: ["Seafood", "Fish"],
    rating: 4.3,
    menu: {
      "Fish": [
        { name: "Grilled Nile Perch", price: 180 },
        { name: "Fried Bolti", price: 150 }
      ],
      "Seafood": [
        { name: "Grilled Prawns", price: 220 },
        { name: "Calimari", price: 160 }
      ]
    },
    openingHours: "24/7",
    contact: "01001112233",
    locationInfo: "Nile Corniche, Manial"
  }
];

let reservations = [];



function loadRestaurants() {
  const container = document.getElementById('restaurants-container');
  container.innerHTML = '';

  restaurants.forEach(restaurant => {
    const stars = '★'.repeat(Math.floor(restaurant.rating)) + '☆'.repeat(5 - Math.ceil(restaurant.rating));

    const card = document.createElement('div');
    card.className = 'restaurant-card';
    card.innerHTML = `
      <img src="${restaurant.image}" alt="${restaurant.name}" class="restaurant-img">
      <div class="restaurant-info">
        <h3 class="restaurant-name">${restaurant.name}</h3>
        <p class="restaurant-location"><i class="fas fa-map-marker-alt"></i> ${restaurant.location}</p>
        <div class="restaurant-cuisines">
          ${restaurant.cuisines.map(cuisine => `<span class="cuisine-tag">${cuisine}</span>`).join('')}
        </div>
        <div class="restaurant-action">
          <div class="restaurant-rating"><i class="fas fa-star"></i> ${restaurant.rating}</div>
          <button class="btn-outline view-restaurant" data-id="${restaurant.id}">
            <i class="fas fa-book-open me-1"></i> View Menu
          </button>
        </div>
      </div>
    `;

    container.appendChild(card);
  });

  document.querySelectorAll('.view-restaurant').forEach(button => {
    button.addEventListener('click', function () {
      const restaurantId = parseInt(this.getAttribute('data-id'));
      showRestaurantModal(restaurantId);
    });
  });
}

function showRestaurantModal(restaurantId) {
  const restaurant = restaurants.find(r => r.id === restaurantId);
  if (!restaurant) return;

  document.getElementById('modalRestaurantName').textContent = restaurant.name;
  document.getElementById('restaurantId').value = restaurant.id;
  document.getElementById('openingHours').textContent = restaurant.openingHours;
  document.getElementById('contactInfo').textContent = restaurant.contact;
  document.getElementById('locationInfo').textContent = restaurant.locationInfo;

  let menuHtml = '';
  for (const [category, items] of Object.entries(restaurant.menu)) {
    menuHtml += `<h5 class="mb-3">${category}</h5>`;
    items.forEach(item => {
      menuHtml += `
        <div class="menu-item">
          <div class="d-flex justify-content-between">
            <h6>${item.name}</h6>
            <span class="price">${item.price} EGP</span>
          </div>
          ${item.description ? `<p class="text-muted">${item.description}</p>` : ''}
        </div>
      `;
    });
  }
  document.getElementById('menuContent').innerHTML = menuHtml;

  const modal = new bootstrap.Modal(document.getElementById('restaurantModal'));
  modal.show();
}

function loadReservations() {
  const tbody = document.querySelector('#reservationsTable tbody');
  tbody.innerHTML = '';

  reservations.forEach(reservation => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${reservation.restaurantName}</td>
      <td>${reservation.date}</td>
      <td>${reservation.time}</td>
      <td>${reservation.guests}</td>
      <td>
        <span class="badge badge-${reservation.status.toLowerCase()}">
          ${reservation.status}
        </span>
      </td>
      <td>
        <button class="btn-cancel cancel-reservation" data-id="${reservation.id}">
          Cancel
        </button>
      </td>
    `;
    tbody.appendChild(row);
  });

  document.querySelectorAll('.cancel-reservation').forEach(button => {
    button.addEventListener('click', function () {
      const reservationId = parseInt(this.getAttribute('data-id'));
      cancelReservation(reservationId);
    });
  });
}

function cancelReservation(reservationId) {
  
  const index = reservations.findIndex(r => r.id === reservationId);
  if (index !== -1) {
    reservations.splice(index, 1);
    loadReservations();
    alert('Reservation cancelled successfully!');
  }
}

document.getElementById('reservationForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const restaurantId = parseInt(document.getElementById('restaurantId').value);
  const restaurant = restaurants.find(r => r.id === restaurantId);

  const newReservation = {
    id: reservations.length > 0 ? reservations[reservations.length - 1].id + 1 : 1,
    restaurantId: restaurantId,
    restaurantName: restaurant.name,
    date: document.getElementById('reserveDate').value,
    time: document.getElementById('reserveTime').value,
    guests: document.getElementById('reserveGuests').value,
    status: "Confirmed"
  };

  reservations.push(newReservation);
  loadReservations();

  alert(`Reservation confirmed at ${restaurant.name} for ${newReservation.date} at ${newReservation.time}`);

  bootstrap.Modal.getInstance(document.getElementById('restaurantModal')).hide();
  this.reset();
});

document.addEventListener('DOMContentLoaded', function () {
  loadRestaurants();
  loadReservations();
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('reserveDate').min = today;
});