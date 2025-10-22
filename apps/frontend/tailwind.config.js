/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        aqua: '#81D8D0'
      },
      backgroundImage: {
        clouds: 'radial-gradient(ellipse at top, rgba(255,255,255,0.2), transparent), radial-gradient(ellipse at bottom, rgba(255,255,255,0.15), transparent)'
      },
      boxShadow: {
        glass: '0 10px 30px rgba(0,0,0,0.25)'
      },
      backdropBlur: {
        xs: '2px'
      }
    },
  },
  plugins: [],
}
