import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cBlue: "#0056B3",
        cLightBlue: "#E3F2FD",
        cButtonStrokeBlue: "#E3F2FD",
        cButtonShadowBlue: "#AFD6EF",
        cYellow: "#FFD99A",
        cButtonBorderYellow: "#8a6529",
        cButtonHoverYellow: "#FDBD51",
      },
      screens: {
        landscape: { raw: "(orientation: landscape)" },
      },
      boxShadow: {
        cMapButtonShadow: "0px 4px 7px 0px #8BBADC",
        cConnectButtonShadow: "0px 2px 8.2px -2px #FAC56C",
        cConnectButtonShadowHover: "0px 2px 8.2px 3px #FAC56C",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light"],
    darkTheme: "dark",
  },
};
export default config;
