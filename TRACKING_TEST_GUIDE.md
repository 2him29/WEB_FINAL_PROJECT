# 📋 Testing Guide: Order Tracking Page Improvements

## ✅ Pre-Testing Setup

1. **Start your server:**
   ```bash
   cd backend
   node server.js
   ```
   You should see: `Server running at http://localhost:3000`

2. **Ensure database is running** (MySQL/MariaDB)

3. **Clear browser cache** or use incognito mode for fresh testing

---

## 🧪 Test Scenarios

### Test 1: Complete Order Flow & Redirect Fix ✅

**Purpose:** Verify checkout correctly redirects to tracking page with order ID

**Steps:**
1. Go to `http://localhost:3000`
2. Navigate to Restaurants → Select a restaurant → View Menu
3. Add 2-3 items to cart (click "Add to Cart")
4. Go to Cart page (`/cart`)
5. Click "Checkout" button
6. **Expected Result:** 
   - ✅ Toast notification: "Order placed successfully!"
   - ✅ After 1.2 seconds, automatically redirects to `/tracking/{orderId}` (NOT just `/tracking`)
   - ✅ URL should look like: `http://localhost:3000/tracking/1` (with actual order ID)

**What to check:**
- [ ] Redirect URL contains the order ID
- [ ] No 404 errors
- [ ] Tracking page loads correctly

---

### Test 2: Order Details Display ✅

**Purpose:** Verify all order information is displayed correctly

**Steps:**
1. Complete an order (or go directly to `/tracking/1` if you have an existing order)
2. **Expected Result:**
   - ✅ Order ID is displayed at the top
   - ✅ Order date/time is shown with clock icon
   - ✅ Total amount is displayed prominently
   - ✅ Order items list shows:
     - Item names
     - Quantities
     - Prices (calculated: price × quantity)
     - Item thumbnails (if available)

**What to check:**
- [ ] All order details are visible
- [ ] Calculations are correct
- [ ] Formatting looks good

---

### Test 3: Timeline with Icons & Status ✅

**Purpose:** Verify timeline displays correctly with visual enhancements

**Steps:**
1. View tracking page for an order
2. **Expected Result:**
   - ✅ Timeline shows 4 steps:
     1. 🔵 Order Confirmed (check-circle icon)
     2. Order Confirmed (if status is "confirmed")
     3. 🔵 Preparing Your Meal (utensils icon)
     4. 🔵 Out for Delivery (truck icon)
     5. 🔵 Delivered (check-double icon)
   - ✅ Current status has **orange/primary color** and pulse animation
   - ✅ Completed steps have **green/secondary color**
   - ✅ Incomplete steps are gray
   - ✅ Active step label is bold and colored

**What to check:**
- [ ] Icons appear correctly for each step
- [ ] Colors match the order status
- [ ] Pulse animation works on active step

---

### Test 4: Real-Time Auto-Refresh ✅

**Purpose:** Verify automatic status updates work

**Steps:**
1. Open tracking page in browser (`/tracking/1`)
2. Keep the page open
3. Manually update order status in database:
   ```sql
   UPDATE orders SET status = 'preparing' WHERE id = 1;
   ```
4. Wait 10 seconds (or watch the "Last checked" timestamp update)
5. **Expected Result:**
   - ✅ Page automatically refreshes after status change is detected
   - ✅ New status is displayed correctly
   - ✅ Timeline updates to show new active step
   - ✅ "Last checked: [time]" updates every 10 seconds

**Alternative Test (Easier):**
1. Open tracking page
2. Watch bottom of active status for "Last checked" timestamp
3. It should update every 10 seconds
4. Open browser console (F12) and check for any errors

**What to check:**
- [ ] Auto-refresh works (check Network tab in DevTools)
- [ ] No console errors
- [ ] Status updates correctly

---

### Test 5: Manual Refresh Button ✅

**Purpose:** Verify manual refresh works

**Steps:**
1. On tracking page, click "Refresh Status" button
2. **Expected Result:**
   - ✅ Page reloads
   - ✅ Latest order status is displayed
   - ✅ All data is up-to-date

**What to check:**
- [ ] Button is clickable
- [ ] Page refreshes correctly

---

### Test 6: Navigation Buttons ✅

**Purpose:** Verify action buttons work

**Steps:**
1. On tracking page, click "Back to Home" button
2. **Expected Result:**
   - ✅ Redirects to homepage (`/`)
   - ✅ Navigation works smoothly

**What to check:**
- [ ] Buttons are visible and styled correctly
- [ ] Links work properly

---

### Test 7: Error Handling ✅

**Purpose:** Verify error handling for invalid orders

**Steps:**
1. Try accessing `/tracking/99999` (non-existent order ID)
2. **Expected Result:**
   - ✅ Shows "Order not found" or 404 error
   - ✅ No crashes or blank pages

**What to check:**
- [ ] Graceful error handling
- [ ] User-friendly error message

---

### Test 8: Responsive Design ✅

**Purpose:** Verify page works on mobile devices

**Steps:**
1. Open browser DevTools (F12)
2. Click device toolbar (mobile icon)
3. Select a mobile device (iPhone, Android)
4. View tracking page
5. **Expected Result:**
   - ✅ Layout adapts to mobile screen
   - ✅ Text is readable
   - ✅ Buttons are accessible
   - ✅ Cards stack properly

**What to check:**
- [ ] Mobile-friendly layout
- [ ] No horizontal scrolling issues
- [ ] Touch targets are adequate size

---

### Test 9: Video Background ✅

**Purpose:** Verify video background displays correctly

**Steps:**
1. View tracking page
2. **Expected Result:**
   - ✅ Video plays automatically (muted, looped)
   - ✅ Video is dimmed (brightness filter)
   - ✅ Content is readable over video
   - ✅ Video doesn't interfere with interactions

**What to check:**
- [ ] Video loads and plays
- [ ] Proper z-index layering
- [ ] Performance is good (no lag)

---

### Test 10: Status Progression ✅

**Purpose:** Test all order statuses

**Steps:**
1. Create a test order
2. Manually update status in database:
   ```sql
   -- Test each status:
   UPDATE orders SET status = 'confirmed' WHERE id = [your_order_id];
   UPDATE orders SET status = 'preparing' WHERE id = [your_order_id];
   UPDATE orders SET status = 'delivery' WHERE id = [your_order_id];
   UPDATE orders SET status = 'delivered' WHERE id = [your_order_id];
   ```
3. Refresh tracking page after each change
4. **Expected Result:**
   - ✅ Each status displays correctly
   - ✅ Timeline shows correct active step
   - ✅ Colors and icons update properly
   - ✅ Auto-refresh stops when status is "delivered"

**What to check:**
- [ ] All 4 statuses work correctly
- [ ] Visual feedback is accurate
- [ ] No status rendering errors

---

## 🐛 Common Issues & Troubleshooting

### Issue: Redirect goes to `/tracking` instead of `/tracking/{id}`
**Solution:** Check browser console for errors. Verify `main.js` uses `data.redirect`.

### Issue: Auto-refresh not working
**Solution:** 
- Check browser console for errors
- Verify API endpoint `/api/tracking/:orderId` is accessible
- Check Network tab to see if requests are being made

### Issue: Order items not showing
**Solution:**
- Check if `order_items` table has data
- Verify `menu_items` table has matching IDs
- Check database query in server logs

### Issue: Timeline not showing correctly
**Solution:**
- Clear browser cache
- Check if CSS file is loading correctly
- Verify font-awesome icons are loading

---

## 📊 Test Checklist

Copy this checklist and mark as you test:

- [ ] Test 1: Checkout redirect works correctly
- [ ] Test 2: Order details display properly
- [ ] Test 3: Timeline shows with icons and colors
- [ ] Test 4: Auto-refresh works (10-second intervals)
- [ ] Test 5: Manual refresh button works
- [ ] Test 6: Navigation buttons work
- [ ] Test 7: Error handling for invalid orders
- [ ] Test 8: Responsive design on mobile
- [ ] Test 9: Video background displays
- [ ] Test 10: All statuses display correctly

---

## 🎯 Quick Test Script

For developers who want to quickly test:

1. **Create order:**
   - Add items to cart → Checkout
   - Note the order ID from URL

2. **Test status updates:**
   ```sql
   -- In your database:
   UPDATE orders SET status = 'confirmed' WHERE id = [order_id];
   -- Refresh page, should see "Order Confirmed" active
   
   UPDATE orders SET status = 'preparing' WHERE id = [order_id];
   -- Wait 10 seconds or refresh, should see "Preparing Your Meal" active
   ```

3. **Check browser console:**
   - Open DevTools (F12)
   - Look for any errors
   - Network tab should show polling requests every 10 seconds

---

## 📝 Notes for Testing

- **Order Status Values:** Make sure your database uses these exact values:
  - `confirmed`
  - `preparing` 
  - `delivery`
  - `delivered`
  
- **Database Setup:** Ensure you have test data:
  - At least one order in `orders` table
  - Order items in `order_items` table
  - Menu items in `menu_items` table (for item details)

- **Performance:** Auto-refresh only works for non-delivered orders to save resources

---

## ✨ Expected Improvements Summary

After testing, you should see these improvements compared to before:

1. ✅ **Fixed:** Checkout now redirects to correct tracking URL
2. ✅ **New:** Order summary card with total, date, and items
3. ✅ **New:** Real-time status updates every 10 seconds
4. ✅ **Enhanced:** Timeline with icons and better visual feedback
5. ✅ **New:** Auto-refresh indicator showing last check time
6. ✅ **Enhanced:** Better error handling and user feedback


