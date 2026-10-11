/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pitch: {
          dark: '#1b5e20',
          green: '#1F9D55',
          light: '#2D7D46',
          bg: '#E8F5EE',
          line: 'rgba(255, 255, 255, 0.75)',
        },
        brand: {
          50: '#F0FBF5',
          100: '#E8F5EE',
          200: '#C7EAD6',
          500: '#1F9D55',
          600: '#188245',
          700: '#126435',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          ground: '#F7F9F8',
          subtle: '#F1F5F3',
          border: '#E2E8F0',
          borderDark: '#CBD5E1',
          text: '#0F172A',
          muted: '#64748B',
        },
        tactical: {
          primary: '#1F9D55',
          warning: '#D97706',
          warningBg: '#FEF3C7',
          danger: '#DC2626',
          dangerBg: '#FEE2E2',
          success: '#16A34A',
          successBg: '#DCFCE7'
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      }
    },
  },
  plugins: [],
}

