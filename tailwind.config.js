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
          dark: '#0a1f16',
          green: '#10b981',
          emerald: '#059669',
          accent: '#00ff87',
          line: 'rgba(255, 255, 255, 0.25)',
        },
        dark: {
          bg: '#0B0F19',
          card: '#131927',
          cardHover: '#1B2438',
          border: '#1F293D',
          borderLight: '#2D3B55',
          text: '#F3F4F6',
          muted: '#9CA3AF',
        },
        tactical: {
          primary: '#00F0FF',
          secondary: '#7000FF',
          accent: '#FF0055',
          warning: '#F59E0B',
          success: '#10B981'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      }
    },
  },
  plugins: [],
}
