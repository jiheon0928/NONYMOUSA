/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        text: {
          basic_Black: "#222222",
          basic_White: "#FFFFFF",
          deep_Grey: "#555555",
          light_Grey: "#222222B3",
          highright_red: "#FF5C00",
          link_Blue: "#0066CC",
          error_Red: "#D32F2F",
          success_Green: "#388E3C",
        },
        border: {
          default: "rgba(34,34,34,0.1)",
        },
        background: {
          subtle: "rgba(34,34,34,0.03)",
        },
      },
    },
  },
  plugins: [],
};
