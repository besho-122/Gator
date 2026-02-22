import { defineConfig } from "drizzle-kit";
import { readConfig } from "./src/config"; 
const savedConfig = readConfig();
export default defineConfig({
  schema: "src/db/schema.ts",
  out: "src/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url:savedConfig.dbUrl,
  },
});