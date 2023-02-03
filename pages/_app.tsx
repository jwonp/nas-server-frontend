import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import Head from "next/head";
import { Provider } from "react-redux";
import store from "../redux/store";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <Head>
        <title>Clips NAS</title>
        <link rel="icon" href="/favicon.ico" />
        <meta charSet="UTF-8"></meta>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
};
export default App;
