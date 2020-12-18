import { AppProps } from 'next/app'
import Head from 'next/head'

import { CSSReset, ChakraProvider } from '@chakra-ui/react'
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
        <ChakraProvider theme={customTheme}>
          <CSSReset />

          <Component {...pageProps} />
        </ChakraProvider>
      </main>
    </Provider>
  )
}

export default MyApp
