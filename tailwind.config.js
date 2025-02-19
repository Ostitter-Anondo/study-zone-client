import daisyui from 'daisyui';
import typography from "@tailwindcss/typography";

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
  plugins: [daisyui, typography],
  daisyui:{
    themes: ["nord", "dim"]
  }
}

