import  { Config } from "tailwindcss";
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        openSans: ["Open Sans", "sans-serif"],
        sourceSans: ["Source Sans 3", "sans-serif"], 
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        buttonOrange: "#FC7C13",
      },
      backgroundImage: {
        "custom-radial": "radial-gradient(circle, #2bb102, #0B2F01 80%)",
        "input-gradient": "(circle, #2bb102, #0B2F01 80%)",
        'footer-bg': "url('/footerbg.png')",
        'spinning-bg': "url('/spinnigbg.png')",
      },
      animation: {
        "infinite-scroll": "infinite-scroll 25s linear infinite",
      },
      keyframes: {
        "infinite-scroll": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
}satisfies Config;
