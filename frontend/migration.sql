/*
  # Bike Commute Weather App Schema

  1. New Tables
    - `gear_items`
      - `id` (uuid, primary key)
      - `name` (text, unique) - Name of the gear item
      - `created_at` (timestamptz)

    - `weather_rules`
      - `id` (uuid, primary key)
      - `gear_item_id` (uuid, foreign key to gear_items)
      - `temp_min` (numeric, nullable) - Minimum temperature for this gear
      - `temp_max` (numeric, nullable) - Maximum temperature for this gear
      - `is_raining` (boolean, nullable) - Whether this gear is for rain
      - `created_at` (timestamptz)

    - `user_settings`
      - `id` (uuid, primary key)
      - `city` (text) - User's city for weather lookup
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for public access (no authentication required for this app)
*/

-- Create gear_items table
CREATE TABLE IF NOT EXISTS gear_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  created_at timestamptz DEFAULT now()
);

-- Create weather_rules table
CREATE TABLE IF NOT EXISTS weather_rules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  gear_item_id uuid REFERENCES gear_items(id) ON DELETE CASCADE NOT NULL,
  temp_min numeric,
  temp_max numeric,
  is_raining boolean,
  created_at timestamptz DEFAULT now()
);

-- Create user_settings table
CREATE TABLE IF NOT EXISTS user_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  city text DEFAULT 'Nantes' NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE gear_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE weather_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;

-- Create policies for public access
CREATE POLICY IF NOT EXISTS "Allow public read access to gear_items"
  ON gear_items FOR SELECT
  TO anon
  USING (true);

CREATE POLICY IF NOT EXISTS "Allow public insert to gear_items"
  ON gear_items FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY IF NOT EXISTS "Allow public update to gear_items"
  ON gear_items FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

CREATE POLICY IF NOT EXISTS "Allow public delete from gear_items"
  ON gear_items FOR DELETE
  TO anon
  USING (true);

CREATE POLICY IF NOT EXISTS "Allow public read access to weather_rules"
  ON weather_rules FOR SELECT
  TO anon
  USING (true);

CREATE POLICY IF NOT EXISTS "Allow public insert to weather_rules"
  ON weather_rules FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY IF NOT EXISTS "Allow public update to weather_rules"
  ON weather_rules FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

CREATE POLICY IF NOT EXISTS "Allow public delete from weather_rules"
  ON weather_rules FOR DELETE
  TO anon
  USING (true);

CREATE POLICY IF NOT EXISTS "Allow public read access to user_settings"
  ON user_settings FOR SELECT
  TO anon
  USING (true);

CREATE POLICY IF NOT EXISTS "Allow public insert to user_settings"
  ON user_settings FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY IF NOT EXISTS "Allow public update to user_settings"
  ON user_settings FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

-- Insert default gear items
INSERT INTO gear_items (name) VALUES
  ('Short'),
  ('Regular socks'),
  ('Winter socks'),
  ('Jersey'),
  ('Arm warmer'),
  ('Leg warmer'),
  ('Northface jacket')
ON CONFLICT (name) DO NOTHING;

-- Insert default settings
INSERT INTO user_settings (city)
SELECT 'Nantes'
WHERE NOT EXISTS (SELECT 1 FROM user_settings LIMIT 1);
