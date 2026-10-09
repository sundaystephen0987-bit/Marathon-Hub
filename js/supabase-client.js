import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { SUPABASE_URL, SUPABASE_PUBLIC_KEY } from "./supabase-config.js";

// One shared connection used by every page.
export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLIC_KEY);
