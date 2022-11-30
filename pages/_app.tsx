import '../styles/globals.css'
import { AppProps } from 'next/app'; //built in type props from Next.js

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
