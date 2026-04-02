import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#F8F7F4',
          blue: '#F0F4FF',
        },
        rose: {
          soft: '#F9A8D4',
          light: '#FDF2F8',
        },
        peach: {
          soft: '#FDBA74',
          light: '#FFF7ED',
        },
        mint: {
          soft: '#6EE7B7',
          light: '#ECFDF5',
        },
        lavender: {
          soft: '#C4B5FD',
          light: '#F5F3FF',
        },
        // Theme-aware CSS variable tokens (switch with data-gender attribute)
        th: {
          primary: 'var(--th-primary)',
          dark: 'var(--th-primary-dark)',
          darker: 'var(--th-primary-darker)',
          dim: 'var(--th-primary-dim)',
          light: 'var(--th-light)',
          accent: 'var(--th-accent)',
          'accent-dark': 'var(--th-accent-dark)',
        },
      },
      fontFamily: {
        sans: ['var(--font-assistant)', 'var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        soft: '0 2px 12px 0 rgba(0,0,0,0.07)',
        card: '0 4px 24px 0 rgba(0,0,0,0.08)',
        // theme-aware glow — used inline with CSS variable
        glow: '0 0 0 3px var(--th-shadow, rgba(249,168,212,0.3))',
      },
      minHeight: {
        touch: '44px',
      },
      minWidth: {
        touch: '44px',
      },
    },
  },
  plugins: [],
};

export default config;
