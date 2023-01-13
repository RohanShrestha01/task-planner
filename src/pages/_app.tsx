import '../styles/globals.css';
import type { AppProps } from 'next/app';

import { useState } from 'react';
import Head from 'next/head';
import { Alegreya, Montserrat } from '@next/font/google';
import { ThemeProvider } from 'next-themes';
import { SSRProvider } from '@react-aria/ssr';
import { SessionProvider } from 'next-auth/react';
import {
  QueryClient,
  QueryClientProvider,
  Hydrate,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import Header from '../components/Header';
import { ToastProvider } from '../contexts/ToastContext';
import ToastNotification from '../components/ToastNotification';

const alegreya = Alegreya({ subsets: ['latin'] });
const montserrat = Montserrat({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <SessionProvider session={pageProps.session}>
          <SSRProvider>
            <ThemeProvider attribute="class">
              <ToastProvider>
                <style jsx global>
                  {`
                    :root {
                      --font-alegreya: ${alegreya.style.fontFamily};
                      --font-montserrat: ${montserrat.style.fontFamily};
                    }
                  `}
                </style>
                <Head>
                  <link
                    rel="icon"
                    type="image/x-icon"
                    media="(prefers-color-scheme: dark)"
                    href="favicon.ico"
                  />
                  <link
                    rel="icon"
                    type="image/x-icon"
                    media="(prefers-color-scheme: light)"
                    href="favicon-black.ico"
                  />
                  <title>Task Planner Webapp</title>
                </Head>
                <Header />
                <Component {...pageProps} />
                <ToastNotification />
                <ReactQueryDevtools initialIsOpen={false} />
              </ToastProvider>
            </ThemeProvider>
          </SSRProvider>
        </SessionProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}
