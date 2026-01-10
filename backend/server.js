// ===============================
// LIVRAMEAL SERVER
// ===============================

const express = require('express');
const mysql = require('mysql2');
const session = require('express-session');
const path = require('path');
const util = require("util");

const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();
const port = 3000;

// ------------------------------
// DATABASE CONNECTION
// ------------------------------

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'restolist_db',
  multipleStatements: true
});

const query = util.promisify(db.query).bind(db);

// ------------------------------
// MIDDLEWARE
// ------------------------------

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: "livrameal_secret_key",
  resave: false,
  saveUninitialized: true
}));

app.use("/auth", authRoutes);
app.use("/", userRoutes);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/images', express.static("C:/Users/FODHIL/OneDrive/Documents/DEV_FP/frontend/restaurant_UI/public/images"));
app.use('/css', express.static("C:/Users/FODHIL/OneDrive/Documents/DEV_FP/frontend/restaurant_UI/css"));
app.use('/js', express.static("C:/Users/FODHIL/OneDrive/Documents/DEV_FP/frontend/restaurant_UI/js"));

// ------------------------------
// EJS VIEW ROUTES
// ------------------------------

app.get('/', (req, res) => {
  res.render('layout', {
    currentPage: 'home',
    cartCount: req.session.cart
      ? req.session.cart.reduce((s, i) => s + i.qty, 0)
      : 0
  });
});

app.get('/restaurants', async (req, res) => {
  try {
    const restaurants = await query("SELECT * FROM restaurants");
    res.render('layout', {
      currentPage: 'restaurants',
      restaurants,
      cartCount: req.session.cart
        ? req.session.cart.reduce((s, i) => s + i.qty, 0)
        : 0
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error");
  }
});

app.get('/menu/:id', async (req, res) => {
  try {
    const restaurantId = req.params.id;

    const restaurant = await query(
      "SELECT * FROM restaurants WHERE id = ?",
      [restaurantId]
    );

    const menuItems = await query(
      "SELECT * FROM menus WHERE restaurant_id = ?",
      [restaurantId]
    );

    if (!restaurant.length) {
      return res.status(404).send("Restaurant not found");
    }

    res.render('layout', {
      currentPage: 'menu',
      restaurant: restaurant[0],
      menuItems,
      cartCount: req.session.cart
        ? req.session.cart.reduce((s, i) => s + i.qty, 0)
        : 0
    });

  } catch (err) {
    console.error(err);
    res.status(500).send("Database error");
  }
});

// NEW: Added route for the cart page (renders cart.ejs within layout)
app.get('/cart', (req, res) => {
  res.render('layout', {
    currentPage: 'cart',
    cart: req.session.cart || [],
    cartCount: req.session.cart
      ? req.session.cart.reduce((s, i) => s + i.qty, 0)
      : 0
  });
});

// ------------------------------
// ORDER TRACKING (PER ORDER)
// ------------------------------

// API endpoint for real-time order status updates
app.get('/api/tracking/:orderId', async (req, res) => {
  const { orderId } = req.params;

  try {
    const result = await query(
      "SELECT status, created_at FROM orders WHERE id = ?",
      [orderId]
    );

    if (!result.length) {
      return res.status(404).json({ error: "Order not found" });
    }

    const order = result[0];
    const createdAt = new Date(order.created_at);
    const now = new Date();
    const diffSeconds = Math.floor((now - createdAt) / 1000);

    let status = 'confirmed';

    if (diffSeconds >= 25) status = 'delivered';
    else if (diffSeconds >= 15) status = 'delivery';
    else if (diffSeconds >= 5) status = 'preparing';

    res.json({ status });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Tracking error" });
  }
});


app.get('/tracking/:orderId', async (req, res) => {
  const { orderId } = req.params;
  const userId = req.session.userId; // Get current user ID (null if not logged in)

  try {
    const orderResult = await query(
      "SELECT id, user_id, total_amount, status, created_at FROM orders WHERE id = ?",
      [orderId]
    );

    if (!orderResult.length) {
      return res.status(404).send("Order not found");
    }

    const order = orderResult[0];

    // Authorization check:
    // - Allow if order has no user_id (guest checkout) - for backward compatibility
    // - Allow if current user owns the order
    // - Deny if order belongs to another user
    if (order.user_id !== null && order.user_id !== userId) {
      return res.status(403).send("You don't have permission to view this order");
    }

    // Fetch order items with menu item details
    const orderItems = await query(
      `SELECT oi.quantity, oi.price, mi.name, mi.image 
       FROM order_items oi 
       LEFT JOIN menu_items mi ON oi.menu_item_id = mi.id 
       WHERE oi.order_id = ?`,
      [orderId]
    );

    res.render('layout', {
      currentPage: 'tracking',
      orderId,
      orderStatus: order.status,
      orderTotal: order.total_amount,
      orderDate: order.created_at,
      orderItems: orderItems || [],
      cartCount: req.session.cart
        ? req.session.cart.reduce((s, i) => s + i.qty, 0)
        : 0
    });

  } catch (err) {
    console.error("TRACKING ERROR:", err);
    res.status(500).send("Database error");
  }
});

// ------------------------------
// PROFILE
// ------------------------------

app.get('/profile', async (req, res) => {
  const userId = 1; // temp user

  try {
    const result = await query(
      "SELECT * FROM user_profiles WHERE user_id = ?",
      [userId]
    );

    const profile = result.length ? result[0] : null;

    res.render('layout', {
      currentPage: 'profile',
      profile,
      success: req.query.success || null,
      cartCount: req.session.cart
        ? req.session.cart.reduce((s, i) => s + i.qty, 0)
        : 0
    });

  } catch (err) {
    console.error("PROFILE LOAD ERROR:", err);
    res.status(500).send("Database error");
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/'));
});

// ------------------------------
// API ROUTES
// ------------------------------

app.get('/api/restaurants', async (req, res) => {
  try {
    const restaurants = await query("SELECT * FROM restaurants");
    res.json(restaurants);
  } catch {
    res.status(500).json({ error: "Database error" });
  }
});

app.get('/api/menu/:id', async (req, res) => {
  try {
    const menuItems = await query(
      "SELECT * FROM menu_items WHERE restaurant_id = ?",
      [req.params.id]
    );
    res.json(menuItems);
  } catch {
    res.status(500).json({ error: "Database error" });
  }
});

// ------------------------------
// CART
// ------------------------------

app.post('/api/cart/add', (req, res) => {
  const { name, price, image } = req.body;
  if (!req.session.cart) req.session.cart = [];

  const existing = req.session.cart.find(i => i.name === name);
  if (existing) existing.qty += 1;
  else req.session.cart.push({ name, price: parseFloat(price), image, qty: 1 });

  res.json({
    success: true,
    cartCount: req.session.cart.reduce((s, i) => s + i.qty, 0)
  });
});

app.get('/api/cart/count', (req, res) => {
  const cart = req.session.cart || [];
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  res.json({ cartCount });
});

// NEW: Added route to fetch the full cart data (required for updateCartDisplay in main.js)
app.get('/api/cart', (req, res) => {
  const cart = req.session.cart || [];
  res.json({ cart });
});

app.post('/api/cart/update', (req, res) => {
  const { index, amount } = req.body;
  if (req.session.cart && req.session.cart[index]) {
    req.session.cart[index].qty += parseInt(amount);
    if (req.session.cart[index].qty <= 0) {
      req.session.cart.splice(index, 1);
    }
  }
  res.json({ success: true, cart: req.session.cart });
});

// ------------------------------
// CHECKOUT
// ------------------------------

app.post('/api/checkout', async (req, res) => {
  const cart = req.session.cart || [];
  if (!cart.length) {
    return res.json({ success: false, message: "Cart is empty" });
  }

  // Get user ID from session (null if not logged in - allows guest checkout)
  const userId = req.session.userId || null;

  try {
    const totalAmount = cart.reduce(
      (s, i) => s + i.price * i.qty,
      0
    );

    // Include user_id when creating order
    const order = await query(
      "INSERT INTO orders (user_id, total_amount, status) VALUES (?, ?, ?)",
      [userId, totalAmount, 'confirmed']
    );

    const orderId = order.insertId;

    const orderItems = cart.map(i => [
      orderId,
      null,
      i.qty,
      i.price
    ]);

    await query(
      "INSERT INTO order_items (order_id, menu_item_id, quantity, price) VALUES ?",
      [orderItems]
    );

    req.session.cart = [];

    res.json({
      success: true,
      redirect: `/tracking/${orderId}`
    });

  } catch (err) {
    console.error("CHECKOUT ERROR:", err);
    res.json({ success: false, message: "Checkout failed" });
  }
});

// ------------------------------
// SERVER START
// ------------------------------

app.listen(port, () =>
  console.log(`Server running at http://localhost:${port}`)
);