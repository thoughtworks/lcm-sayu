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
    blue: "#616EE4",
  },
  fonts: {
    ...theme.fonts,
    heading: "Roboto-Bold",
    body: "Roboto-Regular",
  },
};

export { customTheme };
