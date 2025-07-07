const fs = require("fs");
const path = require("path");

// These would come from environment variables in production
const SUPABASE_URL =
  process.env.SUPABASE_URL || "https://chpjrievgxrxswmbgjyl.supabase.co";
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || "your-anon-key";

// Read the template file
const resetPasswordPath = path.join(__dirname, "ResetPassword", "index.html");
let content = fs.readFileSync(resetPasswordPath, "utf8");

// Replace the placeholders with actual values
content = content.replace("__SUPABASE_URL__", SUPABASE_URL);
content = content.replace("__SUPABASE_ANON_KEY__", SUPABASE_ANON_KEY);

// Write back the file
fs.writeFileSync(resetPasswordPath, content);
