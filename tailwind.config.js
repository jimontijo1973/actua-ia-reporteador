/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Paleta de marca — Pantone 326 C / 300 C / 266 C
        aqua: {
          DEFAULT: '#00B2A9',
          300: '#4BD8CF',
          400: '#19C8BE',
          500: '#00B2A9',
          600: '#00938C',
        },
        azul: {
          DEFAULT: '#005EB8',
          300: '#5AA6E8',
          400: '#2E85D6',
          500: '#005EB8',
          600: '#004A93',
        },
        morado: {
          DEFAULT: '#753BBD',
          300: '#B18BE0',
          400: '#9463D0',
          500: '#753BBD',
          600: '#5C2C97',
        },
        noche: {
          900: '#04121f',
          800: '#08203a',
          700: '#0d2b4b',
          600: '#14385e',
        },
      },
      fontFamily: {
        display: ['Montserrat', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
};
