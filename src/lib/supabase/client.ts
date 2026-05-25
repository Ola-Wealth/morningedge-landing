import { createBrowserClient } from "@supabase/ssr";

/**
 * Use this in Client Components ("use client")
 * e.g. form submissions, real-time subscriptions
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  );
}
