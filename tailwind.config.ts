import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./modules/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: "#1c1c24",
        ash: "#2B2B2B",
        main: "#FAF2B1",
        blu: "#1EC49E",
        purp: "#F4E5F6",
        orang: "#FAF2B1",
      }
    },
  },
  plugins: [],
};
export default config;
