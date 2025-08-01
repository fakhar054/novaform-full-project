// src/utils/activityLogger.js
import { supabase } from "./client";

async function logActivity({
  userId,
  username,
  email,
  actionType,
  location,
  risk,
}) {
  const { error } = await supabase.from("activity_logs").insert([
    {
      user_id: userId,
      username,
      email,
      action_type: actionType,
      location,
      risk,
    },
  ]);

  if (error) {
    console.error("Error logging activity:", error);
  }
}
export default logActivity;
