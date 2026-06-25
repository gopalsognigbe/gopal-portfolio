/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0D0F1A',
        surface: '#141727',
        border: '#1E2438',
        accent: '#F59E0B',
        'accent-2': '#818CF8',
        body: '#F8FAFC',
        muted: '#64748B',
      },
      fontFamily: {
        sans: ['Space Grotesk', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      letterSpacing: {
        widest2: '0.15em',
      },
    },
  },
  plugins: [],
}
