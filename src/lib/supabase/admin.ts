import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let _client: SupabaseClient | null = null;

/**
 * Lazy-initialized Supabase client for API routes & server-side code.
 * Only creates the client on first call (runtime), not at module load (build time).
 */
export function getSupabase(): SupabaseClient {
  if (!_client) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) {
      throw new Error("Supabase env vars not configured");
    }
    _client = createClient(url, key);
  }
  return _client;
}
