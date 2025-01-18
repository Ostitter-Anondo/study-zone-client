import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "300ch",
          },
        },
      },
    },
  },
  plugins: [daisyui],
  daisyui:{
    themes: ["dim"]
  }
}

