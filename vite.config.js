import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // si usás "homepage" en package.json (p. ej. https://nubila.ar o /repo/),
  // seteá base: '/repo/' o la URL base correcta
  base: process.env.BASE_URL || "/"
});
