import { theme } from "@chakra-ui/core";
import "./../assets/fonts/fonts.css";
const customTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    lightGreen: "#00AFA2",
    darkGreen:"#03877D",
    lightGrey:"#728095",
    white: "#FFFFFF",
    black: "#000000",
    lightPurple: "#616EE4",
  },
  fonts: {
    ...theme.fonts,
    heading: "Roboto-Bold",
    body: "Roboto-Regular",
  },
};

export { customTheme };
