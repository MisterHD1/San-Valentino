import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        love: {
          DEFAULT: "hsl(var(--love))",
          foreground: "hsl(var(--love-foreground))",
        },
        lilac: {
          DEFAULT: "hsl(var(--lilac))",
          foreground: "hsl(var(--lilac-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        romantic: ['Caveat', 'cursive'],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "float-up": {
          "0%": { 
            transform: "translateY(100vh) translateX(0) rotate(0deg)",
            opacity: "0"
          },
          "10%": { opacity: "1" },
          "90%": { opacity: "1" },
          "100%": { 
            transform: "translateY(-100px) translateX(var(--drift)) rotate(var(--rotation))",
            opacity: "0"
          },
        },
        "pulse-soft": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.1)" },
        },
        "heart-burst": {
          "0%": { 
            transform: "scale(0) rotate(0deg)",
            opacity: "1"
          },
          "50%": { 
            transform: "scale(1.2) rotate(10deg)",
            opacity: "1"
          },
          "100%": { 
            transform: "scale(0) rotate(-10deg)",
            opacity: "0"
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float-up": "float-up var(--duration) linear infinite",
        "pulse-soft": "pulse-soft 2s ease-in-out infinite",
        "heart-burst": "heart-burst 0.6s ease-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
