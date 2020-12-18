import React, { ReactElement } from 'react'
import { render } from '@testing-library/react'
import { ThemeProvider } from '@chakra-ui/react'
import { customTheme } from 'src/theme/CustomTheme'

const customRender = (ui: ReactElement, options = {}) =>
  render(<ThemeProvider theme={customTheme}>{ui}</ThemeProvider>, options)

const clearMocks = () => {
  jest.clearAllMocks()
  jest.restoreAllMocks()
}

export * from '@testing-library/react'
export { default as userEvent } from '@testing-library/user-event'
export { customRender as render, clearMocks }
