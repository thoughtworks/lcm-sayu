import { AppProps } from 'next/app'
import Head from 'next/head'

import { CSSReset, ThemeProvider } from '@chakra-ui/core'

import 'public/fonts/fonts.css'
import 'public/style.global.css'

import { customTheme } from 'src/theme/CustomTheme'

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => (
  <>
    <Head>
      <title>SAYU</title>
    </Head>
    <main className="content">
      <ThemeProvider theme={customTheme}>
        <CSSReset />
        <Component {...pageProps} />
      </ThemeProvider>
    </main>
  </>
)

export default MyApp
