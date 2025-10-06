# Bike Commute Weather App - Setup Instructions

## Database Setup

This app requires a Supabase database to store gear items and weather rules.

### Step 1: Run the Migration

1. Go to your Supabase project dashboard: https://0ec90b57d6e95fcbda19832f.supabase.co
2. Click on "SQL Editor" in the left sidebar
3. Click "New Query"
4. Copy the contents of `migration.sql` and paste it into the query editor
5. Click "Run" to execute the migration

This will create the necessary tables and insert your default gear items:

- Short
- Regular socks
- Winter socks
- Jersey
- Arm warmer
- Leg warmer
- Northface jacket

### Step 2: Configure Your Gear Rules

After running the migration, open the app and navigate to the Settings page to configure when each piece of gear should be recommended based on:

- Temperature range (min and max in °C)
- Weather condition (raining or dry)

### Example Rules

Here are some suggested rules to get you started:

**Winter socks:**

- Min temp: 0°C, Max temp: 10°C

**Regular socks:**

- Min temp: 10°C, Max temp: 35°C

**Northface jacket:**

- Max temp: 5°C (for cold weather)
- OR: When raining (regardless of temperature)

**Leg warmer:**

- Min temp: 5°C, Max temp: 15°C

**Arm warmer:**

- Min temp: 10°C, Max temp: 18°C

**Short:**

- Min temp: 15°C

**Jersey:**

- Min temp: 5°C

## Using the App

1. **Dashboard**: Shows current weather in your configured city and recommends gear based on your rules
2. **Settings**: Configure your city and set up temperature/weather rules for each gear item

The app fetches real-time weather data from Open-Meteo (no API key required) for your selected city.
