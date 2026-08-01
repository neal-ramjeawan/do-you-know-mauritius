/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Deep Indian Ocean at dusk — the app's home base
        depths: {
          950: '#050f16',
          900: '#0a1a26',
          800: '#0f2634',
          700: '#163445',
        },
        // Lagoon teal — the primary living accent
        lagoon: {
          400: '#4fd3c9',
          500: '#1fa8a3',
          600: '#158783',
          700: '#106866',
        },
        // Turmeric gold — sega, spice, correct answers, the dodo trail
        turmeric: {
          300: '#f0c65c',
          400: '#e8b93f',
          500: '#e3a72b',
          600: '#c28a1c',
        },
        // Sunset coral — used sparingly, incorrect states only
        coral: {
          400: '#f28a72',
          500: '#ef6f53',
          600: '#d85539',
        },
        // Shell — warm off-white for text on dark
        shell: {
          100: '#faf6ea',
          200: '#f3ead3',
          300: '#e8dab8',
        },
        basalt: '#141311',
      },
      fontFamily: {
        display: ['"Fraunces"', 'Georgia', 'serif'],
        body: ['"Manrope"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      backgroundImage: {
        'lagoon-fade': 'radial-gradient(120% 120% at 50% -10%, rgba(31,168,163,0.28) 0%, rgba(10,26,38,0) 60%)',
      },
    },
  },
  plugins: [],
}
