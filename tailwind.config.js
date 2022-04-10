module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      minWidth: {
        "vp1/4": "25vw",
      },
      minHeight: {
        "vp1/4": "25vh",
      },
      maxHeight: {
        "vp11/12": "92vh",
        "per11/12": "92%",
      },
      colors: {
        "color-1": "#102F42",
        "color-2": "#134053",
      },
      width: {
        "1/2": "50vw",
        "1/2%": "50%",
      },
      height: {
        "vp1/2": "50vh",
        "vp1/4": "25vh",
        "vp11/12": "92vh",
        "vp-actual-img": "30vh",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
