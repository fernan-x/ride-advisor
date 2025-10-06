import { supabase } from "./supabase";

export async function initializeDatabase() {
  // Create tables
  const { error: gearError } = await supabase.rpc("exec_sql", {
    sql: `
      -- Create gear_items table
      CREATE TABLE IF NOT EXISTS gear_items (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        name text NOT NULL UNIQUE,
        created_at timestamptz DEFAULT now()
      );

      -- Create weather_rules table
      CREATE TABLE IF NOT EXISTS weather_rules (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        gear_item_id uuid REFERENCES gear_items(id) ON DELETE CASCADE,
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

      -- Create policies for public access (no auth required)
      DROP POLICY IF EXISTS "Allow public read access to gear_items" ON gear_items;
      CREATE POLICY "Allow public read access to gear_items"
        ON gear_items FOR SELECT
        TO anon
        USING (true);

      DROP POLICY IF EXISTS "Allow public insert to gear_items" ON gear_items;
      CREATE POLICY "Allow public insert to gear_items"
        ON gear_items FOR INSERT
        TO anon
        WITH CHECK (true);

      DROP POLICY IF EXISTS "Allow public update to gear_items" ON gear_items;
      CREATE POLICY "Allow public update to gear_items"
        ON gear_items FOR UPDATE
        TO anon
        USING (true)
        WITH CHECK (true);

      DROP POLICY IF EXISTS "Allow public delete from gear_items" ON gear_items;
      CREATE POLICY "Allow public delete from gear_items"
        ON gear_items FOR DELETE
        TO anon
        USING (true);

      DROP POLICY IF EXISTS "Allow public read access to weather_rules" ON weather_rules;
      CREATE POLICY "Allow public read access to weather_rules"
        ON weather_rules FOR SELECT
        TO anon
        USING (true);

      DROP POLICY IF EXISTS "Allow public insert to weather_rules" ON weather_rules;
      CREATE POLICY "Allow public insert to weather_rules"
        ON weather_rules FOR INSERT
        TO anon
        WITH CHECK (true);

      DROP POLICY IF EXISTS "Allow public update to weather_rules" ON weather_rules;
      CREATE POLICY "Allow public update to weather_rules"
        ON weather_rules FOR UPDATE
        TO anon
        USING (true)
        WITH CHECK (true);

      DROP POLICY IF EXISTS "Allow public delete from weather_rules" ON weather_rules;
      CREATE POLICY "Allow public delete from weather_rules"
        ON weather_rules FOR DELETE
        TO anon
        USING (true);

      DROP POLICY IF EXISTS "Allow public read access to user_settings" ON user_settings;
      CREATE POLICY "Allow public read access to user_settings"
        ON user_settings FOR SELECT
        TO anon
        USING (true);

      DROP POLICY IF EXISTS "Allow public insert to user_settings" ON user_settings;
      CREATE POLICY "Allow public insert to user_settings"
        ON user_settings FOR INSERT
        TO anon
        WITH CHECK (true);

      DROP POLICY IF EXISTS "Allow public update to user_settings" ON user_settings;
      CREATE POLICY "Allow public update to user_settings"
        ON user_settings FOR UPDATE
        TO anon
        USING (true)
        WITH CHECK (true);
    `,
  });

  if (gearError) {
    console.log(
      "Tables may already exist or RPC not available, will use client initialization",
    );
  }

  // Insert default gear items if they don't exist
  const defaultGear = [
    "Short",
    "Regular socks",
    "Winter socks",
    "Jersey",
    "Arm warmer",
    "Leg warmer",
    "Northface jacket",
  ];

  for (const gearName of defaultGear) {
    const { error } = await supabase
      .from("gear_items")
      .upsert(
        { name: gearName },
        { onConflict: "name", ignoreDuplicates: true },
      );

    if (error) {
      console.error("Error inserting gear:", error);
    }
  }

  // Insert default settings if none exist
  const { data: settings } = await supabase
    .from("user_settings")
    .select("id")
    .maybeSingle();

  if (!settings) {
    await supabase.from("user_settings").insert({ city: "Nantes" });
  }
}
