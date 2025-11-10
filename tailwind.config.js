/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './app/**/*.{js,ts,jsx,tsx,mdx}',
      './components/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
      extend: {
        colors: {
          background: 'var(--background)',
          foreground: 'var(--foreground)',
          primary: {
            DEFAULT: '#5aabe3',
            dark: '#1F77B7',
          },
          secondary: {
            DEFAULT: '#1c1c1e',
          },
          // New elevated surface colors for cards/panels using CSS RGB vars for alpha support
          surface: 'rgb(var(--surface) / <alpha-value>)',
          surfaceAlt: 'rgb(var(--surface-alt) / <alpha-value>)',
          accent: 'var(--accent)',
          success: '#30D158',
          warning: '#FFD60A',
          danger: '#FF453A',
          info: '#5AC8FA',
        },
        fontFamily: {
          sans: ['-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
        },
        boxShadow: {
          'ios': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 2px 8px 0 rgba(0, 0, 0, 0.05)',
          'ios-md': '0 4px 12px 0 rgba(0, 0, 0, 0.15), 0 2px 6px 0 rgba(0, 0, 0, 0.1)',
          'ios-lg': '0 10px 25px 0 rgba(0, 0, 0, 0.2), 0 5px 15px 0 rgba(0, 0, 0, 0.15)',
        },
        transitionTimingFunction: {
          'ios': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        },
        lineClamp: {
          7: '7',
          8: '8',
        },
      },
    },
    plugins: [],
  }