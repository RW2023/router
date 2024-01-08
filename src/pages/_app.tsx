// pages/_app.js or app/pages/_app.js
import type { AppProps } from 'next/app';
import Head from 'next/head';

export const metadata = {
  title: ' Run Book',
  description: 'An app to manage hospital runs for drivers',
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
