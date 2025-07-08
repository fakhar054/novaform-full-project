import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  "https://ajbxscredobhqfksaqrk.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFqYnhzY3JlZG9iaHFma3NhcXJrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MTQ0Njc5OSwiZXhwIjoyMDY3MDIyNzk5fQ.j6nw62zCVFO588aqJsSoviv7qVuIjpnTIqFUon-nJVU"
);

export default supabaseAdmin;
