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

  console.log("Injecting SUPABASE_URL:", SUPABASE_URL);
  console.log(
    "Injecting SUPABASE_ANON_KEY:",
    SUPABASE_ANON_KEY ? SUPABASE_ANON_KEY.slice(0, 6) + "..." : undefined
  );

  // Debug: print lines containing the placeholders before replacement
  const lines = content.split("\n");
  const urlLineBefore = lines.find((line) => line.includes("__SUPABASE_URL__"));
  const keyLineBefore = lines.find((line) =>
    line.includes("__SUPABASE_ANON_KEY__")
  );
  console.log("Line with SUPABASE_URL before:", urlLineBefore);
  console.log("Line with SUPABASE_ANON_KEY before:", keyLineBefore);

  // Replace all occurrences of the placeholders with actual values
  content = content.replaceAll('"__SUPABASE_URL__"', `"${SUPABASE_URL}"`);
  content = content.replaceAll(
    '"__SUPABASE_ANON_KEY__"',
    `"${SUPABASE_ANON_KEY}"`
  );

  // Debug: print lines containing the placeholders after replacement
  const linesAfter = content.split("\n");
  const urlLineAfter = linesAfter.find((line) => line.includes(SUPABASE_URL));
  const keyLineAfter = linesAfter.find((line) =>
    line.includes(SUPABASE_ANON_KEY.slice(0, 6))
  );
  console.log("Line with SUPABASE_URL after:", urlLineAfter);
  console.log("Line with SUPABASE_ANON_KEY after:", keyLineAfter);

  // Check if replacement was successful
  if (
    content.includes("__SUPABASE_URL__") ||
    content.includes("__SUPABASE_ANON_KEY__")
  ) {
    console.error(
      "Failed to replace all placeholders in ResetPassword/index.html"
    );
    process.exit(1);
  }

  // Write back the file
  fs.writeFileSync(resetPasswordPath, content);
  console.log("Successfully wrote file");
} catch (error) {
  console.error("Error processing file:", error);
  process.exit(1);
}
