export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      gear_items: {
        Row: {
          id: string;
          name: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          created_at?: string;
        };
      };
      weather_rules: {
        Row: {
          id: string;
          gear_item_id: string;
          temp_min: number | null;
          temp_max: number | null;
          is_raining: boolean | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          gear_item_id: string;
          temp_min?: number | null;
          temp_max?: number | null;
          is_raining?: boolean | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          gear_item_id?: string;
          temp_min?: number | null;
          temp_max?: number | null;
          is_raining?: boolean | null;
          created_at?: string;
        };
      };
      user_settings: {
        Row: {
          id: string;
          city: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          city?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          city?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}
