/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: { kanit: ['Kanit', 'sans-serif'] },
      colors: {
        void: '#0C0C0C',
        mist: '#D7E2EA',
        signal: '#25C4E4',
        alert: '#FFB339',
        // Light "paper" palette, used from Selected Work to the end of the case studies.
        paper: '#e6e3dc',
        raised: '#f4f1eb',
        ink: '#202422',
        'ink-soft': '#555b57',
        teal: '#126879',
        rust: '#8a5200',
      },
      boxShadow: {
        card: '0 1px 0 rgba(255,255,255,0.7) inset, 0 1px 2px rgba(32,36,34,0.08), 0 8px 22px -14px rgba(32,36,34,0.22)',
        'card-lift': '0 1px 0 rgba(255,255,255,0.7) inset, 0 2px 4px rgba(32,36,34,0.1), 0 16px 30px -14px rgba(32,36,34,0.32)',
      },
    },
  },
  plugins: [],
}
