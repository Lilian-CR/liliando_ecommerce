export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#577B59',
        mutedGray: '#595959',
        lightBorder: '#a6a6a6',
        contrastHover: '#ededed',
      },

      screens: {
        sm: "640px",
        md: "768px",
        lg: "1061px", 
        xl: "1280px",
        "2xl": "1536px",
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ]
};
