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
      const res = await fetch('/api/cart/count');
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
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });

    const data = await res.json();

    if (data.success) {
      showToast('Order placed successfully!', 'success');
      // Optionally redirect to tracking or home after a short delay
      setTimeout(() => {
        window.location.href = '/tracking';  // or another page
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
  fetch('/api/cart/add', {
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
  fetch('/api/cart/update', {
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
async function updateCartDisplay() {
  const container = document.getElementById('cart-items-container');
  if (!container) return;

  try {
    const res = await fetch('/api/cart');
    const data = await res.json();
    const cart = data.cart;

    let totalPrice = 0;
    let totalQuantity = 0;

    if (!cart || cart.length === 0) {
      container.innerHTML = `
        <p class="text-center text-muted">Your cart is empty.</p>
        <div id="cart-summary" class="cart-total text-center mt-4">
          <h5>Total: $<span id="total-price">0.00</span></h5>
          <p class="text-muted">Quantity: <span id="total-quantity">0</span> items</p>
          <button class="btn btn-primary mt-3" onclick="checkout()" disabled>Checkout</button>
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
          <div class="cart-item d-flex justify-content-between align-items-center" data-index="${index}">
            <div>
              <h6>${item.name}</h6>
              <p class="text-muted mb-0">$${item.price.toFixed(2)}</p>
            </div>
            <div class="quantity-control">
              <button class="quantity-btn" onclick="changeQty(${index}, -1)">-</button>
              <span class="qty">${item.qty}</span>
              <button class="quantity-btn" onclick="changeQty(${index}, 1)">+</button>
            </div>
          </div>
        `;
      })
      .join('');
      
    container.innerHTML = cartItemsHtml;

    // Update existing total/quantity spans if present on the page.
    const priceSpan = document.getElementById('total-price');
    const qtySpan = document.getElementById('total-quantity');
    
    if (priceSpan && qtySpan) {
        priceSpan.textContent = totalPrice.toFixed(2);
        qtySpan.textContent = totalQuantity;
    } else {
        // Fallback for full client-side rendering if EJS didn't pre-render the summary
        container.innerHTML += `
            <div id="cart-summary" class="cart-total text-center mt-4">
                <h5>Total: $<span id="total-price">${totalPrice.toFixed(2)}</span></h5>
                <p class="text-muted">Quantity: <span id="total-quantity">${totalQuantity}</span> items</p>
                <button class="btn btn-primary mt-3" onclick="checkout()">Checkout</button>
            </div>
        `;
    }

    updateCartCount(totalQuantity);
  } catch (err) {
    console.error('Error fetching cart:', err);
    container.innerHTML = '<p class="text-center text-muted">Error loading cart.</p>';
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