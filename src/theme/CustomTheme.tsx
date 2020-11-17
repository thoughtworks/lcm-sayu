import { theme } from '@chakra-ui/core'

const customTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    lightGreen: '#00AFA2',
    darkGreen: '#03877D',
    lightGrey: '#728095',
    grey: '#525C6C',
    white: '#FFFFFF',
    black: '#000000',
    lightPurple: '#616EE4',
  },
  fonts: {
    ...theme.fonts,
    heading: 'Roboto Bold',
    body: 'Roboto Regular',
  },
}

export { customTheme }
