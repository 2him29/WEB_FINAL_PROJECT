# 📊 Database Addition Suggestions
## Two New Restaurants with Complete Menus

---

## 📋 **Database Structure Analysis**

### **Restaurants Table** (Current)
- ✅ **Fields:** `id`, `name`, `description`, `category`, `image`, `address`, `phone`, `rating`, `created_at`
- ⚠️ **Current Issue:** Existing restaurants have `address = NULL` and `phone = NULL`
- 📝 **Current Data:** 3 restaurants (Asian, Fast Food, Italian)

### **Menu Items Table** (Current)
- ✅ **Fields:** `id`, `restaurant_id`, `name`, `description`, `price`, `image`, `category`, `created_at`
- ⚠️ **Current Issue:** All items have `category = 'Main'` - should diversify
- 📝 **Current Data:** 9 items (3 per restaurant)

---

## 🍽️ **SUGGESTION 1: Mediterranean Restaurant**

### **Restaurant Data:**
```sql
INSERT INTO `restaurants` (`name`, `description`, `category`, `image`, `address`, `phone`, `rating`, `created_at`) VALUES
('Mediterranean Delight', 'Authentic Mediterranean cuisine with fresh ingredients and traditional recipes. Experience the flavors of Greece, Italy, and the Middle East.', 'Mediterranean', 'images/mediterranean.jpg', '123 Olive Street, Downtown', '+213-23-456-789', 4.6, NOW());
```

**Restaurant ID will be:** 4 (auto-increment)

### **Menu Items** (Restaurant ID: 4):
```sql
-- Main Dishes
INSERT INTO `menu_items` (`restaurant_id`, `name`, `description`, `price`, `image`, `category`, `created_at`) VALUES
(4, 'Grilled Chicken Shawarma', 'Tender marinated chicken with garlic sauce, pickles, and fresh vegetables wrapped in warm pita bread.', 15.50, 'images/shawarma.jpg', 'Main', NOW()),

(4, 'Lamb Kebab Plate', 'Seasoned lamb skewers served with basmati rice, grilled vegetables, and tzatziki sauce.', 18.00, 'images/lamb_kebab.jpg', 'Main', NOW()),

(4, 'Mediterranean Salad Bowl', 'Fresh mixed greens, feta cheese, olives, cherry tomatoes, cucumber, and balsamic vinaigrette.', 12.00, 'images/mediterranean_salad.jpg', 'Main', NOW()),

-- Appetizers
(4, 'Hummus & Pita', 'Creamy chickpea dip served with warm pita bread and olive oil drizzle.', 8.50, 'images/hummus.jpg', 'Appetizer', NOW()),

(4, 'Falafel Platter', 'Crispy chickpea fritters served with tahini sauce, pickled vegetables, and fresh herbs.', 9.00, 'images/falafel.jpg', 'Appetizer', NOW()),

(4, 'Stuffed Grape Leaves', 'Delicate grape leaves filled with rice, herbs, and spices, drizzled with lemon olive oil.', 7.50, 'images/grape_leaves.jpg', 'Appetizer', NOW()),

-- Desserts
(4, 'Baklava', 'Sweet pastry made of layers of filo filled with chopped nuts and honey syrup.', 6.50, 'images/baklava.jpg', 'Dessert', NOW()),

(4, 'Turkish Delight', 'Traditional confectionery with rosewater and pistachios, dusted with powdered sugar.', 5.00, 'images/turkish_delight.jpg', 'Dessert', NOW());
```

**Total Menu Items:** 8 items (3 Main, 3 Appetizer, 2 Dessert)

---

## 🍜 **SUGGESTION 2: Vietnamese Restaurant**

### **Restaurant Data:**
```sql
INSERT INTO `restaurants` (`name`, `description`, `category`, `image`, `address`, `phone`, `rating`, `created_at`) VALUES
('Pho Garden', 'Traditional Vietnamese cuisine featuring fresh herbs, aromatic broths, and authentic flavors. Known for our famous pho and spring rolls.', 'Vietnamese', 'images/pho_garden.jpg', '456 Bamboo Avenue, City Center', '+213-23-789-012', 4.8, NOW());
```

**Restaurant ID will be:** 5 (auto-increment)

### **Menu Items** (Restaurant ID: 5):
```sql
-- Main Dishes
INSERT INTO `menu_items` (`restaurant_id`, `name`, `description`, `price`, `image`, `category`, `created_at`) VALUES
(5, 'Beef Pho', 'Traditional Vietnamese noodle soup with tender beef slices, rice noodles, fresh herbs, and aromatic beef broth.', 14.00, 'images/beef_pho.jpg', 'Main', NOW()),

(5, 'Chicken Pho', 'Classic pho with poached chicken, rice noodles, bean sprouts, basil, and lime in savory chicken broth.', 13.00, 'images/chicken_pho.jpg', 'Main', NOW()),

(5, 'Bun Cha (Grilled Pork)', 'Grilled marinated pork served over vermicelli noodles with fresh herbs, lettuce, and nuoc cham sauce.', 15.00, 'images/bun_cha.jpg', 'Main', NOW()),

(5, 'Lemongrass Chicken Bowl', 'Grilled lemongrass-marinated chicken over jasmine rice with pickled vegetables and fresh herbs.', 13.50, 'images/lemongrass_chicken.jpg', 'Main', NOW()),

-- Appetizers
(5, 'Fresh Spring Rolls (2 pieces)', 'Rice paper rolls filled with shrimp, pork, fresh herbs, and vermicelli, served with peanut sauce.', 7.50, 'images/spring_rolls.jpg', 'Appetizer', NOW()),

(5, 'Crispy Spring Rolls (4 pieces)', 'Deep-fried rolls with ground pork, vegetables, and glass noodles, served with fish sauce dip.', 8.00, 'images/crispy_rolls.jpg', 'Appetizer', NOW()),

(5, 'Vietnamese Chicken Wings', 'Marinated chicken wings glazed with fish sauce and served with lime and chili dipping sauce.', 9.50, 'images/vietnamese_wings.jpg', 'Appetizer', NOW()),

-- Beverages
(5, 'Vietnamese Iced Coffee', 'Strong Vietnamese coffee with sweetened condensed milk, served over ice.', 4.50, 'images/vietnamese_coffee.jpg', 'Beverage', NOW()),

(5, 'Fresh Coconut Water', 'Chilled fresh coconut water served in the shell with a straw.', 5.00, 'images/coconut_water.jpg', 'Beverage', NOW());
```

**Total Menu Items:** 9 items (4 Main, 3 Appetizer, 2 Beverage)

---

## 📝 **Summary**

### **Restaurants to Add:**
1. **Mediterranean Delight** (Category: Mediterranean) - 8 menu items
2. **Pho Garden** (Category: Vietnamese) - 9 menu items

### **Total Additions:**
- **2 Restaurants** (with complete info: address, phone)
- **17 Menu Items** (diverse categories: Main, Appetizer, Dessert, Beverage)

---

## 🎨 **Image Recommendations**

You'll need to add these image files to `frontend/restaurant_UI/public/images/`:

### **Restaurant Images:**
- `mediterranean.jpg` (for Mediterranean Delight)
- `pho_garden.jpg` (for Pho Garden)

### **Menu Item Images:**
**Mediterranean:**
- `shawarma.jpg`, `lamb_kebab.jpg`, `mediterranean_salad.jpg`
- `hummus.jpg`, `falafel.jpg`, `grape_leaves.jpg`
- `baklava.jpg`, `turkish_delight.jpg`

**Vietnamese:**
- `beef_pho.jpg`, `chicken_pho.jpg`, `bun_cha.jpg`, `lemongrass_chicken.jpg`
- `spring_rolls.jpg`, `crispy_rolls.jpg`, `vietnamese_wings.jpg`
- `vietnamese_coffee.jpg`, `coconut_water.jpg`

**Note:** You can use placeholder images or download free stock photos from sites like Unsplash, Pexels, or create your own.

---

## ✅ **Improvements Over Current Data:**

1. ✅ **Complete Information:** Both restaurants include address and phone
2. ✅ **Diverse Categories:** Menu items use different categories (Main, Appetizer, Dessert, Beverage)
3. ✅ **Realistic Pricing:** Prices range from $4.50 to $18.00
4. ✅ **Detailed Descriptions:** Each item has an appealing description
5. ✅ **Variety:** Different cuisines (Mediterranean, Vietnamese) not already covered

---

## 🚀 **Ready to Implement?**

Once you approve, I can:
1. Generate the complete SQL INSERT statements
2. Create a SQL file you can run directly
3. Or help you add them manually through your admin panel

**What do you think of these suggestions? Would you like me to:**
- Change any restaurant types?
- Modify menu items or prices?
- Add more items?
- Proceed with generating the SQL?



