import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import Head from "next/head";
import { SWRConfig } from "swr";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig>
      <Head>
        <title>Clips NAS</title>
        <link rel="icon" href="/favicon.ico" />
        <meta charSet="UTF-8"></meta>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SWRConfig>
  );
}
