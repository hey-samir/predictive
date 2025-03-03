/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
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
        'app-background': 'rgb(var(--app-background) / <alpha-value>)',
        'app-card': 'rgb(var(--app-card) / <alpha-value>)',
        'app-text-primary': 'rgb(var(--app-text-primary) / <alpha-value>)',
        'app-text-secondary': 'rgb(var(--app-text-secondary) / <alpha-value>)',
        'app-purple': 'rgb(var(--app-purple) / <alpha-value>)',
        'app-purple-light': 'rgb(var(--app-purple-light) / <alpha-value>)',
        'app-purple-dark': 'rgb(var(--app-purple-dark) / <alpha-value>)',
        'app-success': 'rgb(var(--app-success) / <alpha-value>)',
        'app-error': 'rgb(var(--app-error) / <alpha-value>)',
        'app-warning': 'rgb(var(--app-warning) / <alpha-value>)',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
}