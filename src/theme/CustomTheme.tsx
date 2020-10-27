import { theme } from '@chakra-ui/core'

const customTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    lightGreen: '#529593',
    lightGrey: '#728095',
    white: '#FFFFFF',
    black: '#000000',
  },
  fonts: {
    ...theme.fonts,
    heading: 'Roboto-Bold',
    body: 'Roboto-Regular',
  },
}

export { customTheme }
