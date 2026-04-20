/* ============================================
   Pro-Star KSA — Supabase Client
   ============================================ */

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://ippgmdkrbguulmzzeerl.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlwcGdtZGtyYmd1dWxtenplZXJsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY2MzQwMTgsImV4cCI6MjA5MjIxMDAxOH0.AIuKzMKblwL9AoKVV4kjC3_rgYpPN8wSZj6Z8s-zm0M';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
