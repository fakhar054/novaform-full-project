import { supabase } from "./client";

// export const logActivity = async (
//   user_id: number | null,
//   email: string | null,
//   action_type: string
// ) => {
//   const { error } = await supabase.from("activity_logs").insert([
//     {
//       user_id,
//       email,
//       action_type,
//     },
//   ]);

//   if (error) {
//     console.error(" Failed to log activity:", error.message);
//   } else {
//     console.log("Activity logged:", action_type);
//   }
// };
