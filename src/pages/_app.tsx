import '../styles/globals.css';
import { type AppType } from 'next/app';
import { type Session } from 'next-auth';
import Head from 'next/head';
import { Alegreya, Montserrat } from '@next/font/google';
import { ThemeProvider } from 'next-themes';
import { SSRProvider } from '@react-aria/ssr';
import { SessionProvider } from 'next-auth/react';

import Header from '../components/Header';
import { trpc } from '../utils/trpc';

const alegreya = Alegreya({ subsets: ['latin'] });
const montserrat = Montserrat({ subsets: ['latin'] });

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <SSRProvider>
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
      </SSRProvider>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
