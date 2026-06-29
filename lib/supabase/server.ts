import { createClient } from "@supabase/supabase-js";
import type { Episode } from "@/lib/types";
import {
  getSupabasePublishableKey,
  getSupabaseSecretKey,
  getSupabaseUrl,
} from "@/lib/supabase/env";

export function createPublishableSupabaseClient() {
  return createClient(getSupabaseUrl(), getSupabasePublishableKey());
}

export function createSecretSupabaseClient() {
  return createClient(getSupabaseUrl(), getSupabaseSecretKey(), {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

export type EpisodesDatabase = {
  public: {
    Tables: {
      episodes: {
        Row: Episode;
        Insert: Omit<Episode, "id" | "created_at" | "updated_at"> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Episode>;
      };
    };
  };
};
