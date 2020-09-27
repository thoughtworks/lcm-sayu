import { theme } from "@chakra-ui/core";
import "./../assets/fonts/fonts.css";
const customTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    lightGreen: "#529593",
    lightGrey: "#728095",
    white: "#FFFFFF",
    black: "#000000",
  },
  fonts: {
    ...theme.fonts,
    heading: "AmaticSC-Bold",
    body: "AmaticSC-Regular",
  },
};

export { customTheme };
