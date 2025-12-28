-- =====================================================
-- Add user_id to orders table
-- =====================================================
-- This will:
-- 1. Add user_id column to orders table
-- 2. Add foreign key constraint to users table
-- 3. Add index for better query performance
-- =====================================================

-- Step 1: Add the user_id column (nullable - allows existing orders to remain NULL)
ALTER TABLE orders 
ADD COLUMN user_id INT(11) NULL AFTER id;

-- Step 2: Add foreign key constraint (references users.id - same as user_profiles)
ALTER TABLE orders
ADD CONSTRAINT fk_orders_user 
FOREIGN KEY (user_id) REFERENCES users(id) 
ON DELETE SET NULL;

-- Step 3: Add index for better query performance
CREATE INDEX idx_orders_user_id ON orders(user_id);

-- =====================================================
-- Verify it worked:
-- =====================================================
-- Run these to check:
-- DESCRIBE orders;
-- SHOW CREATE TABLE orders;
-- =====================================================


