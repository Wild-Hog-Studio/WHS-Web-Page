import 'dotenv/config';
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel/serverless'; 
export default defineConfig({
  devToolbar: {
    enabled: false
  },
  adapter: vercel(), 
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [react()]
});