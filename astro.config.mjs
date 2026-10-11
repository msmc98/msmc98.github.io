// @ts-check
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
const env = loadEnv(process.env.NODE_ENV || 'development', process.cwd(), 'PUBLIC_');

// https://astro.build/config
export default defineConfig({
  site: env.PUBLIC_SITE_URL || undefined,
  base: env.PUBLIC_BASE_PATH || '/',
});
