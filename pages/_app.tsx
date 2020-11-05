import { AppProps } from 'next/app'
import Head from 'next/head'

import { CSSReset, ThemeProvider } from '@chakra-ui/core'
import { Provider } from 'next-auth/client'

import 'public/fonts/fonts.css'
import 'public/style.global.css'

import { customTheme } from 'src/theme/CustomTheme'

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <Provider session={pageProps.session}>
      <Head>
        <title>SAYU</title>
      </Head>
      <main className="content">
        <ThemeProvider theme={customTheme}>
          <CSSReset />

          <Component {...pageProps} />
        </ThemeProvider>
      </main>
    </Provider>
  )
}

export default MyApp
