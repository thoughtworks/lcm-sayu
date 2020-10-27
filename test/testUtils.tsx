import { ReactElement } from 'react'
import { render } from '@testing-library/react'
import { ThemeProvider } from '@chakra-ui/core'

const customRender = (ui: ReactElement, options = {}) =>
  render(<ThemeProvider>{ui}</ThemeProvider>, options)

export * from '@testing-library/react'
export { default as userEvent } from '@testing-library/user-event'
export { customRender as render }
