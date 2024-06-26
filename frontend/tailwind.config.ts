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
        "cBlue": "#0056B3",
        "cLightBlue": "#E3F2FD",
        "cButtonStrokeBlue": "#E3F2FD",
        "cButtonShadowBlue": "#AFD6EF",
        "cYellow": "#FFD99A",
        "cButtonBorderYellow": "#BA6A20",
        "cButtonHoverYellow": "#FDBD51"
      },
    },
  },
  plugins: [],
};
export default config;
