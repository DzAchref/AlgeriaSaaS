import type { Config } from "tailwindcss";
const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "../../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: { 500: '#10b981', 600: '#059669', 900: '#064e3b' },
      },
    },
  },
  plugins: [],
};
export default config;
