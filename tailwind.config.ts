import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#0A1628",
          "navy-800": "#0F2040",
          "navy-700": "#152A52",
          gold: "#C9A84C",
          "gold-400": "#D4B96A",
          "gold-300": "#DFCA88",
          cream: "#F8F5F0",
          "cream-200": "#F0EBE3",
          slate: "#64748B",
          "slate-400": "#94A3B8",
        },
      },
      fontFamily: {
        display: ["var(--font-playfair)", ...fontFamily.serif],
        sans: ["var(--font-inter)", ...fontFamily.sans],
      },
      backgroundImage: {
        "gold-shimmer":
          "linear-gradient(90deg, #C9A84C 0%, #DFD080 50%, #C9A84C 100%)",
        "hero-gradient":
          "linear-gradient(180deg, rgba(10,22,40,0.7) 0%, rgba(10,22,40,0.3) 60%, rgba(10,22,40,0.85) 100%)",
        "card-gradient":
          "linear-gradient(180deg, transparent 50%, rgba(10,22,40,0.95) 100%)",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulse_gold: {
          "0%,100%": { boxShadow: "0 0 0 0 rgba(201,168,76,0.4)" },
          "50%": { boxShadow: "0 0 0 8px rgba(201,168,76,0)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        shimmer: "shimmer 2.5s linear infinite",
        fadeInUp: "fadeInUp 0.6s ease-out forwards",
        pulse_gold: "pulse_gold 2s ease-in-out infinite",
        float: "float 3s ease-in-out infinite",
      },
      boxShadow: {
        card: "0 4px 24px rgba(10,22,40,0.08)",
        "card-lg": "0 8px 48px rgba(10,22,40,0.14)",
        gold: "0 4px 20px rgba(201,168,76,0.35)",
      },
      borderRadius: {
        DEFAULT: "0.5rem",
        lg: "0.75rem",
        xl: "1rem",
        "2xl": "1.5rem",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
