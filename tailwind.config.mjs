import tailwindcssAnimate from 'tailwindcss-animate'
import typography from '@tailwindcss/typography'

const rem = (px) => ({ [px]: `${px / 16}rem` })

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  darkMode: ['selector', '[data-theme="dark"]'],
  plugins: [tailwindcssAnimate],
  prefix: '',
  safelist: [
    'lg:col-span-4',
    'lg:col-span-6',
    'lg:col-span-8',
    'lg:col-span-12',
    'border-border',
    'bg-card',
    'border-error',
    'bg-error/30',
    'border-success',
    'bg-success/30',
    'border-warning',
    'bg-warning/30',
    'md:pl-28',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        // '2xl': '2rem',
        DEFAULT: '1rem',
        // lg: '2rem',
        // md: '2rem',
        // sm: '2rem',
        // xl: '2rem',
      },
      screens: {
        '2xl': '160rem',
        // '2xl': '86rem',
        // lg: '64rem',
        // md: '48rem',
        // sm: '40rem',
        // xl: '80rem',
      },
    },
    extend: {
      // animation: {
      //   'accordion-down': 'accordion-down 0.2s ease-out',
      //   'accordion-up': 'accordion-up 0.2s ease-out',
      // },
      // borderRadius: {
      //   lg: 'var(--radius)',
      //   md: 'calc(var(--radius) - 2px)',
      //   sm: 'calc(var(--radius) - 4px)',
      // },
      colors: {
        // 'beige-dark': 'var(--beige-dark)',
        dark: 'var(--dark)',
        beige: {
          light: 'var(--beige-light)',
          dark: 'var(--beige-dark)',
          'very-dark': 'var(--beige-very-dark)',
        },
        orange: {
          DEFAULT: 'var(--orange)',
          light: 'var(--orange-light)',
        },
      },
      fontSize: {
        ...rem(12),
        ...rem(14),
        ...rem(15),
        ...rem(16),
        ...rem(18),
        ...rem(22),
        ...rem(24),
        ...rem(26),
        ...rem(28),
        ...rem(32),
        ...rem(36),
        ...rem(40),
        ...rem(44),
        ...rem(48),
        ...rem(56),
        ...rem(64),
        ...rem(72),
        ...rem(80),
        ...rem(120),
      },
      // colors: {
      //   accent: {
      //     DEFAULT: 'hsl(var(--accent))',
      //     foreground: 'hsl(var(--accent-foreground))',
      //   },
      //   background: 'hsl(var(--background))',
      //   border: 'hsla(var(--border))',
      //   card: {
      //     DEFAULT: 'hsl(var(--card))',
      //     foreground: 'hsl(var(--card-foreground))',
      //   },
      //   destructive: {
      //     DEFAULT: 'hsl(var(--destructive))',
      //     foreground: 'hsl(var(--destructive-foreground))',
      //   },
      //   foreground: 'hsl(var(--foreground))',
      //   input: 'hsl(var(--input))',
      //   muted: {
      //     DEFAULT: 'hsl(var(--muted))',
      //     foreground: 'hsl(var(--muted-foreground))',
      //   },
      //   popover: {
      //     DEFAULT: 'hsl(var(--popover))',
      //     foreground: 'hsl(var(--popover-foreground))',
      //   },
      //   primary: {
      //     DEFAULT: 'hsl(var(--primary))',
      //     foreground: 'hsl(var(--primary-foreground))',
      //   },
      //   ring: 'hsl(var(--ring))',
      //   secondary: {
      //     DEFAULT: 'hsl(var(--secondary))',
      //     foreground: 'hsl(var(--secondary-foreground))',
      //   },
      //   success: 'hsl(var(--success))',
      //   error: 'hsl(var(--error))',
      //   warning: 'hsl(var(--warning))',
      // },
      fontFamily: {
        caption: ['var(--font-caption)'],
        sans: ['var(--font-sans)'],
      },
      spacing: {
        18: '4.5rem',
      },
      // keyframes: {
      //   'accordion-down': {
      //     from: { height: '0' },
      //     to: { height: 'var(--radix-accordion-content-height)' },
      //   },
      //   'accordion-up': {
      //     from: { height: 'var(--radix-accordion-content-height)' },
      //     to: { height: '0' },
      //   },
      // },
      // typography: () => ({
      //   DEFAULT: {
      //     css: [
      //       {
      //         // '--tw-prose-body': 'var(--text)',
      //         // '--tw-prose-headings': 'var(--text)',
      //         h1: {
      //           fontWeight: 'medium',
      //           marginBottom: '0.25em',
      //         },
      //       },
      //     ],
      //   },
      //   base: {
      //     css: [
      //       {
      //         // h1: {
      //         //   fontSize: '2.5rem',
      //         // },
      //         // h2: {
      //         //   fontSize: '1.25rem',
      //         //   fontWeight: 600,
      //         // },
      //       },
      //     ],
      //   },
      //   md: {
      //     css: [
      //       {
      //         // h1: {
      //         //   fontSize: '3.5rem',
      //         // },
      //         // h2: {
      //         //   fontSize: '1.5rem',
      //         // },
      //       },
      //     ],
      //   },
      // }),
    },
  },
}

export default config
