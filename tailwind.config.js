/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@tremor/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        app: {
          background: '#1e2638',
          card: '#2a3548',
          purple: '#8A3FFC',
        },
        primary: {
          DEFAULT: '#8A3FFC', // Purple
          50: '#FCE4FF',
          100: '#F3B7FF',
          200: '#E48AFF',
          300: '#D65DFF',
          400: '#C730FF',
          500: '#9C27B0',
          600: '#7B1FA2',
          700: '#6A1B9A',
          800: '#4A148C',
          900: '#38006B',
        },
        secondary: {
          DEFAULT: '#03A9F4', // Blue
          50: '#D6F0FF',
          100: '#B3E5FC',
          200: '#81D4FA',
          300: '#4FC3F7',
          400: '#29B6F6',
          500: '#03A9F4',
          600: '#039BE5',
          700: '#0288D1',
          800: '#0277BD',
          900: '#01579B',
        },
        accent: {
          DEFAULT: '#FF5722', // Orange
          50: '#FFF3E0',
          100: '#FFE0B2',
          200: '#FFCC80',
          300: '#FFB74D',
          400: '#FFA726',
          500: '#FF5722',
          600: '#F4511E',
          700: '#E64A19',
          800: '#D84315',
          900: '#BF360C',
        },
        gray: {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#EEEEEE',
          300: '#E0E0E0',
          400: '#BDBDBD',
          500: '#9E9E9E',
          600: '#757575',
          700: '#616161',
          800: '#424242',
          900: '#212121',
        },
        green: {
          50: '#E8F5E9',
          100: '#C8E6C9',
          200: '#A5D6A7',
          300: '#81C784',
          400: '#66BB6A',
          500: '#4CAF50',
          600: '#43A047',
          700: '#388E3C',
          800: '#2E7D32',
          900: '#1B5E20',
        },
        tremor: {
          brand: {
            faint: '#FCE4FF',
            muted: '#F3B7FF',
            subtle: '#E48AFF',
            DEFAULT: '#9C27B0',
            emphasis: '#7B1FA2',
            inverted: '#FFFFFF',
          },
          background: {
            muted: '#F9FAFB',
            subtle: '#F3F4F6',
            DEFAULT: '#FFFFFF',
            emphasis: '#374151',
          },
          border: {
            DEFAULT: '#E5E7EB',
          },
          ring: {
            DEFAULT: '#E5E7EB',
          },
          content: {
            subtle: '#9CA3AF',
            DEFAULT: '#6B7280',
            emphasis: '#374151',
            strong: '#111827',
            inverted: '#FFFFFF',
          },
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        // Tremor specific shadow
        'tremor-input': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'tremor-card': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'tremor-dropdown': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      },
      borderRadius: {
        'tremor-small': '0.375rem',
        'tremor-default': '0.5rem',
        'tremor-full': '9999px',
      },
    },
  },
  safelist: [
    {
      pattern: /^(bg|text|border|ring)-(.*)-(50|100|200|300|400|500|600|700|800|900)/,
      variants: ['hover', 'focus', 'dark'],
    },
  ],
  plugins: [],
};