import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#080505",
        "background-subtle": "#0e0808",
        foreground: "#f5f2f2",
        card: "#120a0a",
        "card-hover": "#1a0f0f",
        primary: {
          DEFAULT: "#ef3b3b",
          foreground: "#ffffff",
          glow: "rgba(239, 59, 59, 0.45)",
          dark: "#a81616",
        },
        muted: {
          DEFAULT: "#1f1313",
          foreground: "#a59999",
        },
        accent: {
          DEFAULT: "#ff5a4e",
          foreground: "#ffffff",
        },
        border: "rgba(239, 59, 59, 0.22)",
        "border-glow": "rgba(239, 59, 59, 0.45)",
      },
      fontFamily: {
        mono: ["'JetBrains Mono'", "monospace"],
        display: ["'Oswald'", "sans-serif"],
        sans: ["'Space Grotesk'", "sans-serif"],
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "1", filter: "drop-shadow(0 0 15px rgba(239,59,59,0.7))" },
          "50%": { opacity: "0.6", filter: "drop-shadow(0 0 5px rgba(239,59,59,0.3))" },
        },
      },
      animation: {
        marquee: "marquee 28s linear infinite",
        "pulse-glow": "pulse-glow 2.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
