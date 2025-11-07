import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://isvtklrayzdpvyfnxwic.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlzdnRrbHJheXpkcHZ5Zm54d2ljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI1MTEzOTEsImV4cCI6MjA3ODA4NzM5MX0.97iMF7rDJopfXxfMIb-6KJD0CffLHSOwifXWEqNqwwE";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
