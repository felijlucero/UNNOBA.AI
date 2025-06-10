/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    // Desactivar plugins que pueden causar márgenes automáticos
    preflight: true,
    container: false,
  },
};
