/*
  # Initial Schema Setup

  1. New Tables
    - profiles: Extended user information
    - wishlists: User wishlists
    - wishlist_items: Items within wishlists
    - contributions: User contributions to items
    - activities: Activity feed events

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated and public access

  3. Functions
    - Add helper functions for calculating totals
    - Create view for wishlist items with stats
    - Add trigger for contribution tracking
*/

-- Create profiles table to store extended user info
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  username TEXT UNIQUE,
  full_name TEXT,
  bio TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  
  CONSTRAINT username_length CHECK (char_length(username) >= 3 AND char_length(username) <= 30)
);

-- Create wishlists table
CREATE TABLE IF NOT EXISTS wishlists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  is_public BOOLEAN DEFAULT true NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Create wishlist_items table
CREATE TABLE IF NOT EXISTS wishlist_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wishlist_id UUID REFERENCES wishlists(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  image_url TEXT,
  product_url TEXT,
  is_fulfilled BOOLEAN DEFAULT false NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Create contributions table
CREATE TABLE IF NOT EXISTS contributions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  item_id UUID REFERENCES wishlist_items(id) ON DELETE CASCADE NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  message TEXT,
  is_anonymous BOOLEAN DEFAULT false NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Create activities table for activity feed
CREATE TABLE IF NOT EXISTS activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL, -- contribution, fulfillment, thanks
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  target_id UUID NOT NULL, -- item_id or wishlist_id
  target_type TEXT NOT NULL, -- item or wishlist
  message TEXT,
  amount DECIMAL(10, 2),
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlist_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE contributions ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own profile"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Wishlists policies
CREATE POLICY "Users can view their own wishlists"
  ON wishlists
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Public wishlists are viewable by everyone"
  ON wishlists
  FOR SELECT
  USING (is_public = true);

CREATE POLICY "Users can create their own wishlists"
  ON wishlists
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own wishlists"
  ON wishlists
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own wishlists"
  ON wishlists
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Wishlist items policies
CREATE POLICY "Users can view their own wishlist items"
  ON wishlist_items
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM wishlists
      WHERE wishlists.id = wishlist_items.wishlist_id
      AND wishlists.user_id = auth.uid()
    )
  );

CREATE POLICY "Public wishlist items are viewable by everyone"
  ON wishlist_items
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM wishlists
      WHERE wishlists.id = wishlist_items.wishlist_id
      AND wishlists.is_public = true
    )
  );

CREATE POLICY "Users can insert items into their own wishlists"
  ON wishlist_items
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM wishlists
      WHERE wishlists.id = wishlist_items.wishlist_id
      AND wishlists.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update items in their own wishlists"
  ON wishlist_items
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM wishlists
      WHERE wishlists.id = wishlist_items.wishlist_id
      AND wishlists.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete items from their own wishlists"
  ON wishlist_items
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM wishlists
      WHERE wishlists.id = wishlist_items.wishlist_id
      AND wishlists.user_id = auth.uid()
    )
  );

-- Contributions policies
CREATE POLICY "Users can view contributions to public wishlists"
  ON contributions
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM wishlist_items
      JOIN wishlists ON wishlist_items.wishlist_id = wishlists.id
      WHERE wishlist_items.id = contributions.item_id
      AND wishlists.is_public = true
    )
  );

CREATE POLICY "Users can view contributions to their own wishlists"
  ON contributions
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM wishlist_items
      JOIN wishlists ON wishlist_items.wishlist_id = wishlists.id
      WHERE wishlist_items.id = contributions.item_id
      AND wishlists.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create contributions"
  ON contributions
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Activities policies
CREATE POLICY "Users can view public activities"
  ON activities
  FOR SELECT
  USING (
    target_type = 'wishlist' AND
    EXISTS (
      SELECT 1 FROM wishlists
      WHERE wishlists.id::text = activities.target_id::text
      AND wishlists.is_public = true
    )
    OR
    target_type = 'item' AND
    EXISTS (
      SELECT 1 FROM wishlist_items
      JOIN wishlists ON wishlist_items.wishlist_id = wishlists.id
      WHERE wishlist_items.id::text = activities.target_id::text
      AND wishlists.is_public = true
    )
  );

CREATE POLICY "Users can view activities on their own wishlists"
  ON activities
  FOR SELECT
  TO authenticated
  USING (
    target_type = 'wishlist' AND
    EXISTS (
      SELECT 1 FROM wishlists
      WHERE wishlists.id::text = activities.target_id::text
      AND wishlists.user_id = auth.uid()
    )
    OR
    target_type = 'item' AND
    EXISTS (
      SELECT 1 FROM wishlist_items
      JOIN wishlists ON wishlist_items.wishlist_id = wishlists.id
      WHERE wishlist_items.id::text = activities.target_id::text
      AND wishlists.user_id = auth.uid()
    )
  );

CREATE POLICY "System can create activities"
  ON activities
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create functions to calculate item totals
CREATE OR REPLACE FUNCTION get_item_fulfilled_amount(item_id UUID)
RETURNS DECIMAL AS $$
  SELECT COALESCE(SUM(amount), 0)
  FROM contributions
  WHERE contributions.item_id = $1;
$$ LANGUAGE SQL STABLE;

-- Create functions to calculate wishlist totals
CREATE OR REPLACE FUNCTION get_wishlist_total_price(wishlist_id UUID)
RETURNS DECIMAL AS $$
  SELECT COALESCE(SUM(price), 0)
  FROM wishlist_items
  WHERE wishlist_items.wishlist_id = $1;
$$ LANGUAGE SQL STABLE;

CREATE OR REPLACE FUNCTION get_wishlist_fulfilled_price(wishlist_id UUID)
RETURNS DECIMAL AS $$
  SELECT COALESCE(SUM(get_item_fulfilled_amount(id)), 0)
  FROM wishlist_items
  WHERE wishlist_items.wishlist_id = $1;
$$ LANGUAGE SQL STABLE;

-- Create view for wishlist items with calculated fields
CREATE OR REPLACE VIEW wishlist_items_with_stats AS
SELECT
  wi.*,
  get_item_fulfilled_amount(wi.id) AS fulfilled_amount,
  (SELECT COUNT(*) FROM contributions WHERE item_id = wi.id) AS contributors_count
FROM wishlist_items wi;

-- Create trigger to update wishlist_items.is_fulfilled when contributions change
CREATE OR REPLACE FUNCTION update_item_fulfillment_status()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE wishlist_items
  SET 
    is_fulfilled = (get_item_fulfilled_amount(id) >= price),
    updated_at = now()
  WHERE id = NEW.item_id;
  
  -- Create activity record
  INSERT INTO activities (type, user_id, target_id, target_type, message, amount)
  VALUES ('contribution', NEW.user_id, NEW.item_id, 'item', 'contributed to an item', NEW.amount);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER after_contribution_insert
  AFTER INSERT ON contributions
  FOR EACH ROW
  EXECUTE PROCEDURE update_item_fulfillment_status();