import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#E0CCAD',
        red: '#8C1D17',
        brown: '#6A3C11',
        sage: '#70805B',
        dark: '#1C0A05',
        'dark-mid': '#2D1408',
        'off-white': '#FAF7F2',
        warm: '#D4B896',
        'warm-mid': '#C8AA80',
        cappuccino: '#C4956A',
        'cappuccino-mid': '#B8845A',
        accent: '#D05A3A',
      },
      fontFamily: {
        fraunces: ['var(--font-fraunces)', 'serif'],
        lora: ['var(--font-lora)', 'Georgia', 'serif'],
        nunito: ['var(--font-nunito)', 'sans-serif'],
      },
      animation: {
        marquee: 'marquee 24s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
