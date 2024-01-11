/** @type {import('tailwindcss').Config} */
export default {
   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
   theme: {
      extend: {
         colors: {
            primary: '#1A257E',
            secondary: '#ffed4a',
            bg_primary: '#040D3F',
          },
      },
   },
   plugins: [],
}
