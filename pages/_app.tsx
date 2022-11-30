import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { QueryClient, QueryClientProvider } from "react-query";

export default function App({ Component, pageProps }: AppProps) {
  // const queryClient = new QueryClient({
  //   defaultOptions: {
  //     queries: {
  //       retry: 0,
  //       useErrorBoundary: true,
  //     },
  //     mutations: {
  //       useErrorBoundary: true,
  //     },
  //   },
  // });
  return (
    // <QueryClientProvider client={queryClient}>
    <Layout>
      <Component {...pageProps} />
    </Layout>
    // </QueryClientProvider>
  );
}
