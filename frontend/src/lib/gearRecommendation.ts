import { supabase } from "./supabase";
import type { WeatherData } from "./weather";

export interface GearItem {
  id: string;
  name: string;
}

export interface WeatherRule {
  id: string;
  gear_item_id: string;
  temp_min: number | null;
  temp_max: number | null;
  is_raining: boolean | null;
}

export interface GearWithRules extends GearItem {
  rules: WeatherRule[];
}

export async function getRecommendedGear(
  weather: WeatherData,
): Promise<GearItem[]> {
  // Fetch all gear items with their rules
  const { data: gearItems, error: gearError } = await supabase
    .from("gear_items")
    .select("*");

  if (gearError) {
    console.error("Error fetching gear items:", gearError);
    return [];
  }

  const { data: rules, error: rulesError } = await supabase
    .from("weather_rules")
    .select("*");

  if (rulesError) {
    console.error("Error fetching weather rules:", rulesError);
    return [];
  }

  // Group rules by gear item
  const gearWithRules: GearWithRules[] = (gearItems || []).map((gear) => ({
    ...gear,
    rules: (rules || []).filter((rule) => rule.gear_item_id === gear.id),
  }));

  // Filter gear based on weather conditions
  const recommended = gearWithRules.filter((gear) => {
    // If no rules, don't recommend
    if (gear.rules.length === 0) {
      return false;
    }

    // Check if any rule matches current weather
    return gear.rules.some((rule) => {
      // Check temperature range
      const tempMatch =
        (rule.temp_min === null || weather.temperature >= rule.temp_min) &&
        (rule.temp_max === null || weather.temperature <= rule.temp_max);

      // Check rain condition
      const rainMatch =
        rule.is_raining === null || rule.is_raining === weather.isRaining;

      return tempMatch && rainMatch;
    });
  });

  return recommended.map(({ id, name }) => ({ id, name }));
}

export async function getAllGear(): Promise<GearItem[]> {
  const { data, error } = await supabase
    .from("gear_items")
    .select("*")
    .order("name");

  if (error) {
    console.error("Error fetching gear:", error);
    return [];
  }

  return data || [];
}

export async function getGearRules(gearItemId: string): Promise<WeatherRule[]> {
  const { data, error } = await supabase
    .from("weather_rules")
    .select("*")
    .eq("gear_item_id", gearItemId);

  if (error) {
    console.error("Error fetching rules:", error);
    return [];
  }

  return data || [];
}

export async function saveGearRule(rule: {
  gear_item_id: string;
  temp_min: number | null;
  temp_max: number | null;
  is_raining: boolean | null;
}): Promise<boolean> {
  const { error } = await supabase.from("weather_rules").insert(rule);

  if (error) {
    console.error("Error saving rule:", error);
    return false;
  }

  return true;
}

export async function deleteGearRule(ruleId: string): Promise<boolean> {
  const { error } = await supabase
    .from("weather_rules")
    .delete()
    .eq("id", ruleId);

  if (error) {
    console.error("Error deleting rule:", error);
    return false;
  }

  return true;
}

export async function getUserCity(): Promise<string> {
  const { data, error } = await supabase
    .from("user_settings")
    .select("city")
    .maybeSingle();

  if (error) {
    console.error("Error fetching city:", error);
    return "Nantes";
  }

  return data?.city || "Nantes";
}

export async function updateUserCity(city: string): Promise<boolean> {
  // First, try to get existing settings
  const { data: existing } = await supabase
    .from("user_settings")
    .select("id")
    .maybeSingle();

  if (existing) {
    // Update existing
    const { error } = await supabase
      .from("user_settings")
      .update({ city, updated_at: new Date().toISOString() })
      .eq("id", existing.id);

    if (error) {
      console.error("Error updating city:", error);
      return false;
    }
  } else {
    // Insert new
    const { error } = await supabase.from("user_settings").insert({ city });

    if (error) {
      console.error("Error inserting city:", error);
      return false;
    }
  }

  return true;
}
