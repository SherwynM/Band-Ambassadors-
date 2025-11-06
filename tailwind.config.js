/** @type {import('tailwindcss').Config} */
module.exports = {
  
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // make sure Tailwind scans all your files
    
  ],
  theme: {
    extend: {
      
      screens: {
        // Define a custom breakpoint for the navigation bar
        'xlNav': '865px',
      },
      colors: {
        "band-yellow": "#e99a08",
        "band-black": "#000000",
        "band-white": "#FFFFFF",
        "band-gray": "#1a1a1a",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      boxShadow: {
        "glow-yellow": "0 0 20px rgba(255, 215, 0, 0.3)",
      },
      backgroundImage: {
        "gradient-text":
          "linear-gradient(135deg, #FFD700, #FFFFFF)", // for text gradients
        "hero-bg":
          "radial-gradient(ellipse at center, rgba(255, 215, 0, 0.1) 0%, transparent 70%)",
      },
    },
  },
  plugins: [],
};
