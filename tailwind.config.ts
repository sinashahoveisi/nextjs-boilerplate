import type {Config} from 'tailwindcss';

const config: Config = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/constants/**/*.{js,ts,jsx,tsx,mdx}',
    './src/containers/**/*.{js,ts,jsx,tsx,mdx}',
    './src/layout/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  darkMode: ['selector'],
  theme: {
    container: {
      center: true,
      padding: '1rem',
      screens: {
        sm: '100%',
        md: '100%',
        lg: '1224px',
        xl: '1400px',
        '2xl': '1536px'
      }
    },
    extend: {
      fontSize: {
        xxs: '0.625rem',
        normal: ['0.935rem', {lineHeight: '1.3rem'}],
        h6: ['1.35rem', {lineHeight: '2rem'}],
        h5: ['1.4rem', {lineHeight: '2.25rem'}],
        h4: ['1.45rem', {lineHeight: '2.5rem'}],
        h3: ['1.5rem', {lineHeight: '1'}],
        h2: ['1.6rem', {lineHeight: '1'}],
        h1: ['1.7rem', {lineHeight: '1'}],
        big: ['2.5rem', {lineHeight: '1'}],
        veryBig: ['6rem', {lineHeight: '1'}],
        huge: ['8rem', {lineHeight: '1'}]
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        primary: {
          DEFAULT: 'var(--color-primary)',
          dark: 'var(--color-primary-dark)'
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)',
          dark: 'var(--color-secondary-dark)'
        },
        pen: {
          DEFAULT: 'var(--color-pen)',
          light: 'var(--color-pen-light)',
          dark: 'var(--color-pen-dark)'
        },
        body: {
          DEFAULT: 'var(--color-body)',
          dark: 'var(--color-body-dark)'
        }
      },
      fontFamily: {
        body: [
          'var(--font-main)',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'Noto Sans',
          'sans-serif',
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Segoe UI Symbol',
          'Noto Color Emoji'
        ]
      }
    }
  }
};
export default config;
