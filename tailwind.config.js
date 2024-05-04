const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
  },
  plugins: [
    plugin(function({ addUtilities }){
      const newUtilities = {
        ".no-scrollbar::-webkit-scrollbar" : {
          display: "none"
        },
      
        /* Hide scrollbar for IE, Edge and Firefox */
        ".no-scrollbar" : {
          "-ms-overflow-style" : "none",  /* IE and Edge */
          "scrollbar-width" : "none"  /* Firefox */
        }
      };

      addUtilities(newUtilities)
    })
  ],
}