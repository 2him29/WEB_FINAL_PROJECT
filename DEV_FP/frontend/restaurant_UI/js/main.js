// ===============================
// LIVRAMEAL MAIN JAVASCRIPT FILE
// ===============================

// ======== PAGE NAVIGATION ========
function showPage(pageId) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(page => {
    page.classList.add('hidden');
  });

  // Show the selected page
  const target = document.getElementById(pageId);
  if (target) {
    target.classList.remove('hidden');
    target.classList.add('fade-in');
  }

  // Special handling for restaurant page: always reset to list view
  if (pageId === 'restaurant') {
    resetRestaurantToList();
  }

  // Update active nav link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
  });
  const activeLink = document.querySelector(`.nav-link[onclick*="${pageId}"]`);
  if (activeLink) activeLink.classList.add('active');
}

// Function to reset the restaurant section to its list view
function resetRestaurantToList() {
  const restaurantSection = document.getElementById('restaurant');
  restaurantSection.innerHTML = `
    <div class="container">
      <h2 class="section-title text-center mb-5">Popular Restaurants</h2>
      <div id="restaurant-list" class="row g-4"></div>
    </div>
  `;
  loadRestaurants();
}

// ======== RESTAURANT DATA ========
const restaurants = [
  {
    name: "Burger Palace",
    image: "images/burger.jpg",
    category: "Fast Food",
    rating: 4.7,
    items: [
      { name: "Classic Burger", price: 8, image: "images/burger.jpg" },
      { name: "Cheese Deluxe", price: 10, image: "images/burger2.jpg" },
      { name: "BBQ Tower", price: 12, image: "images/burger3.jpg" }
    ]
  },
  {
    name: "Sushi World",
    image: "images/sushi.jpg",
    category: "Asian",
    rating: 4.5,
    items: [
      { name: "Salmon Roll", price: 12, image: "images/sushi2.jpg" },
      { name: "Tuna Special", price: 14, image: "images/sushi3.jpg" },
      { name: "Avocado Maki", price: 9, image: "images/sushi4.jpg" }
    ]
  },
  {
    name: "Pizza Factory",
    image: "images/pizza.jpg",
    category: "Italian",
    rating: 4.8,
    items: [
      { name: "Pepperoni Pizza", price: 11, image: "images/pizza2.jpg" },
      { name: "Margherita", price: 9, image: "images/pizza3.jpg" },
      { name: "4 Cheese Pizza", price: 13, image: "images/pizza4.jpg" }
    ]
  }
];

// ======== LOAD RESTAURANTS ========
function loadRestaurants() {
  const list = document.getElementById('restaurant-list');
  if (!list) return;
  list.innerHTML = '';
  restaurants.forEach((res, index) => {
    const div = document.createElement('div');
    div.className = 'col-md-4';
    div.innerHTML = `
      <div class="restaurant-card" onclick="openRestaurant(${index})">
        <img src="${res.image}" alt="${res.name}">
        <div class="restaurant-info">
          <h5 class="restaurant-name">${res.name}</h5>
          <p class="mb-1 text-muted">${res.category}</p>
          <span class="rating"><i class="fa-solid fa-star"></i> ${res.rating}</span>
        </div>
      </div>
    `;
    list.appendChild(div);
  });
}

// ======== OPEN RESTAURANT MENU ========
let currentRestaurant = null;
function openRestaurant(index) {
  currentRestaurant = restaurants[index];
  showRestaurantMenu(currentRestaurant);
}

// ======== SHOW MENU ITEMS ========
function showRestaurantMenu(restaurant) {
  const restaurantSection = document.getElementById('restaurant');
  restaurantSection.innerHTML = `
    <div class="container">
      <button class="btn btn-outline-primary mb-4" onclick="resetRestaurantToList()">← Back</button>
      <h2 class="section-title text-center mb-4">${restaurant.name}</h2>
      <div class="row g-4">
        ${restaurant.items
          .map(
            item => `
          <div class="col-md-4">
            <div class="menu-item text-center">
              <img src="${item.image}" alt="${item.name}">
              <h6 class="mt-3">${item.name}</h6>
              <p class="text-muted mb-2">$${item.price}</p>
              <button class="btn btn-primary btn-sm" onclick='addToCart(${JSON.stringify(
                item
              )})'>Add to Cart</button>
            </div>
          </div>
        `
          )
          .join('')}
      </div>
    </div>
  `;
}

// ======== CART SYSTEM ========
let cart = [];

function addToCart(item) {
  const found = cart.find(i => i.name === item.name);
  if (found) {
    found.qty++;
  } else {
    cart.push({ ...item, qty: 1 });
  }
  updateCartCount();
  showToast(`${item.name} added to cart`);
  updateCartDisplay();
}

function updateCartCount() {
  const count = cart.reduce((sum, i) => sum + i.qty, 0);
  document.getElementById('cart-count').textContent = count;
}

function updateCartDisplay() {
  const cartItems = document.getElementById('cart-items');
  if (!cartItems) return;

  if (cart.length === 0) {
    cartItems.innerHTML = `<p class="text-center text-muted">Your cart is empty.</p>`;
    return;
  }

  cartItems.innerHTML = cart
    .map(
      (item, index) => `
      <div class="cart-item d-flex justify-content-between align-items-center">
        <div>
          <h6>${item.name}</h6>
          <p class="text-muted mb-0">$${item.price}</p>
        </div>
        <div class="quantity-control">
          <button class="quantity-btn" onclick="changeQty(${index}, -1)">-</button>
          <span>${item.qty}</span>
          <button class="quantity-btn" onclick="changeQty(${index}, 1)">+</button>
        </div>
      </div>
    `
    )
    .join('');
}

function changeQty(index, amount) {
  cart[index].qty += amount;
  if (cart[index].qty <= 0) cart.splice(index, 1);
  updateCartCount();
  updateCartDisplay();
}

function checkout() {
  if (cart.length === 0) {
    showToast("Your cart is empty!", "error");
    return;
  }
  showToast("Order placed successfully!");
  cart = [];
  updateCartCount();
  updateCartDisplay();
}

// ======== TOAST SYSTEM ========
function showToast(message, type = "success") {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `custom-toast ${type === "success" ? "toast-success" : "toast-error"}`;
  toast.innerHTML = `
    <i class="fa-solid ${type === "success" ? "fa-check-circle" : "fa-circle-exclamation"}"></i>
    <span>${message}</span>
  `;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(400px)';
    setTimeout(() => toast.remove(), 400);
  }, 2500);
}

// ======== INITIALIZE ========
window.addEventListener('DOMContentLoaded', () => {
  showPage('home');
  updateCartCount();
});
