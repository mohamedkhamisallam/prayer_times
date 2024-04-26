/** @type {import('tailwindcss').Config} */

export default {
  // prefix: 'tw-',
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: { listStyleImage: {
        checkmark: 'url("./src/assets/dhhr-prayer-mosque.png")',
      },},
    },
    plugins: [],
    
  }