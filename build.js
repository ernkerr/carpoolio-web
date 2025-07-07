const fs = require("fs");
const path = require("path");

// Get required environment variables
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

// Ensure we have the required environment variables
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error(
    "Missing required environment variables SUPABASE_URL and/or SUPABASE_ANON_KEY"
  );
  process.exit(1);
}

// Read the template file
const resetPasswordPath = path.join(__dirname, "ResetPassword", "index.html");
console.log(`Reading file from: ${resetPasswordPath}`);

try {
  let content = fs.readFileSync(resetPasswordPath, "utf8");
  console.log("Successfully read file");

  // Replace the placeholders with actual values
  content = content.replace('"__SUPABASE_URL__"', `"${SUPABASE_URL}"`);
  content = content.replace(
    '"__SUPABASE_ANON_KEY__"',
    `"${SUPABASE_ANON_KEY}"`
  );
  console.log("Replaced placeholders");

  // Write back the file
  fs.writeFileSync(resetPasswordPath, content);
  console.log("Successfully wrote file");
} catch (error) {
  console.error("Error processing file:", error);
  process.exit(1);
}
