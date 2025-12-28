// ===============================
// LIVRAMEAL MAIN JAVASCRIPT FILE (EJS VERSION)
// ===============================

// ======== UTILITY FUNCTIONS ========

// Updates the visual cart counter (badge). Fetches current count if none provided.
async function updateCartCount(count) {
  const cartCountElement = document.getElementById('cart-count'); 
  if (!cartCountElement) return;

  if (typeof count === 'undefined') {
    try {
      const res = await fetch('http://localhost:3000/api/cart/count');
      const data = await res.json();
      count = data.cartCount || 0;
    } catch (err) {
      console.error('Could not fetch initial cart count:', err);
      return;
    }
  }

  cartCountElement.textContent = count;
  cartCountElement.style.display = count > 0 ? 'inline-block' : 'none';
}

// Initiates checkout via server API.
// Initiates checkout via server API (POST).
async function checkout() {
  try {
    const res = await fetch('http://localhost:3000/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });

    const data = await res.json();

    if (data.success) {
      showToast('Order placed successfully!', 'success');
      // Redirect to tracking page with order ID
      setTimeout(() => {
        window.location.href = data.redirect || '/tracking';
      }, 1200);
    } else {
      showToast(data.message || 'Checkout failed', 'error');
    }
  } catch (err) {
    console.error('Checkout error:', err);
    showToast('Error during checkout', 'error');
  }
}


// ======== TOAST SYSTEM ========
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `custom-toast ${type === 'success' ? 'toast-success' : 'toast-error'}`;
  toast.innerHTML = `
    <i class="fa-solid ${type === 'success' ? 'fa-check-circle' : 'fa-circle-exclamation'}"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(400px)';
    setTimeout(() => toast.remove(), 400);
  }, 2500);
}

// PAGE NAVIGATION 
function showPage(page) {
  window.location.href = `/${page}`;
}



// ======== CART SYSTEM ========
// Adds item to session cart via API POST request.
function addToCart(name, price, image) {
  fetch('http://localhost:3000/api/cart/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, price, image }),
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        updateCartCount(data.cartCount);
        showToast(`${name} added to cart`);
        // Only refresh display if the user is currently on the cart page.
        if (window.location.pathname === '/cart') updateCartDisplay();
      }
    })
    .catch(err => {
      console.error('Error adding to cart:', err);
      showToast('Error adding to cart', 'error');
    });
}

// Changes item quantity or removes item via API POST request.
function changeQty(index, amount) {
  fetch('http://localhost:3000/api/cart/update', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ index, amount }),
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) updateCartDisplay();
    })
    .catch(err => {
      console.error('Error updating cart:', err);
      showToast('Error updating cart', 'error');
    });
}

// Fetches current cart data and dynamically renders the list and totals.
// UPDATED: Added try-catch for better error handling on fetch failures
async function updateCartDisplay() {
  const container = document.getElementById('cart-items-container');
  if (!container) return;

  try {
    const res = await fetch('http://localhost:3000/api/cart');
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    const cart = data.cart;

    let totalPrice = 0;
    let totalQuantity = 0;

    if (!cart || cart.length === 0) {
      container.innerHTML = `
        <div class="text-center py-5">
          <i class="fa-solid fa-cart-shopping fa-3x text-muted mb-3"></i>
          <p class="text-muted mb-4">Your cart is empty.</p>
          <a href="/restaurants" class="btn" style="background:#ff6b35; color: white;">
            Browse Restaurants
          </a>
        </div>
        <div id="cart-summary" class="border-top pt-4 mt-4 d-none">
          <div class="d-flex justify-content-between mb-3">
            <span class="text-muted">Quantity:</span>
            <strong><span id="total-quantity">0</span> items</strong>
          </div>
          <div class="d-flex justify-content-between mb-4">
            <span class="fw-bold fs-5">Total:</span>
            <strong class="fs-5 text-primary">$<span id="total-price">0.00</span></strong>
          </div>
          <button class="btn w-100 text-white" style="background:#ff6b35;" onclick="checkout()" disabled>Checkout</button>
        </div>
      `;
      updateCartCount(0);
      return;
    }

    const cartItemsHtml = cart
      .map((item, index) => {
        totalPrice += item.price * item.qty;
        totalQuantity += item.qty;
        return `
          <div class="cart-item-card d-flex justify-content-between align-items-center mb-3 p-3 border rounded" data-index="${index}">
            <div class="flex-grow-1">
              <h6 class="mb-1 fw-semibold">${item.name}</h6>
              <p class="text-muted mb-0">$${item.price.toFixed(2)} each</p>
            </div>
            <div class="quantity-control d-flex align-items-center gap-2">
              <button class="quantity-btn" data-index="${index}" data-delta="-1" onclick="changeQty(parseInt(this.dataset.index), parseInt(this.dataset.delta))">-</button>
              <span class="qty fw-bold">${item.qty}</span>
              <button class="quantity-btn" data-index="${index}" data-delta="1" onclick="changeQty(parseInt(this.dataset.index), parseInt(this.dataset.delta))">+</button>
            </div>
          </div>
        `;
      })
      .join('');
      
    container.innerHTML = `
      <div class="mb-4">
        ${cartItemsHtml}
      </div>
    `;

    // Update existing total/quantity spans if present on the page.
    const priceSpan = document.getElementById('total-price');
    const qtySpan = document.getElementById('total-quantity');
    const summaryDiv = document.getElementById('cart-summary');
    
    if (priceSpan && qtySpan) {
        priceSpan.textContent = totalPrice.toFixed(2);
        qtySpan.textContent = totalQuantity;
        if (summaryDiv) {
          summaryDiv.classList.remove('d-none');
        }
    } else {
        // Fallback for full client-side rendering if EJS didn't pre-render the summary
        container.innerHTML += `
            <div id="cart-summary" class="border-top pt-4 mt-4">
                <div class="d-flex justify-content-between mb-3">
                  <span class="text-muted">Quantity:</span>
                  <strong><span id="total-quantity">${totalQuantity}</span> items</strong>
                </div>
                <div class="d-flex justify-content-between mb-4">
                  <span class="fw-bold fs-5">Total:</span>
                  <strong class="fs-5 text-primary">$<span id="total-price">${totalPrice.toFixed(2)}</span></strong>
                </div>
                <button class="btn w-100 text-white" style="background:#ff6b35;" onclick="checkout()">Checkout</button>
            </div>
        `;
    }

    updateCartCount(totalQuantity);
  } catch (err) {
    console.error('Error fetching cart:', err);
    container.innerHTML = '<p class="text-center text-muted">Error loading cart. Please try again.</p>';
    showToast('Error loading cart', 'error');
  }
}


// ======== INITIALIZE ========
window.addEventListener('DOMContentLoaded', () => {
  updateCartCount(); 

  // Check the current page path and update the cart display if on the cart view.
  if (window.location.pathname === '/cart') {
    updateCartDisplay(); 
  }
});