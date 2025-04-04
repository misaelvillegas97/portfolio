/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
        secondary: '#3b82f6',
        accent: '#60a5fa',
        background: {
          light: '#ffffff',
          dark: '#0f172a'
        },
        text: {
          light: '#1e293b',
          dark: '#f8fafc'
        }
      },
      fontFamily: {
        heading: ['Inter', 'sans-serif'],
        body: ['SF Pro Display', 'sans-serif'],
        code: ['JetBrains Mono', 'monospace']
      },
      animation: {
        'gradient': 'gradient 8s linear infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      zIndex: {
        '-10': '-10',
      }
    },
  },
  plugins: [],
};