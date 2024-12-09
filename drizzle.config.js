import { defineConfig } from "drizzle-kit";
 
export default defineConfig({
  schema: "./config/schema.js",
  out: "./drizzle",
  dialect: 'postgresql',
  dbCredentials: {
    url: "postgresql://neondb_owner:av6zHT5YpJqA@ep-muddy-thunder-a5i2qgon.us-east-2.aws.neon.tech/neondb?sslmode=require",
  }
});
