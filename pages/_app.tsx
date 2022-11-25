import '../styles/globals.css';
import type { AppProps } from 'next/app';

import Head from 'next/head';
import { Alegreya, Montserrat } from '@next/font/google';
import { ThemeProvider } from 'next-themes';

import Header from '../components/Header';

const alegreya = Alegreya({ subsets: ['latin'] });
const montserrat = Montserrat({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <style jsx global>
        {`
          :root {
            --font-alegreya: ${alegreya.style.fontFamily};
            --font-montserrat: ${montserrat.style.fontFamily};
          }
        `}
      </style>
      <Head>
        <title>Task Planner Webapp</title>
      </Head>
      <Header />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
