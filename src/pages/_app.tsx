import { AppProps } from "next/app";
import Head from "next/head";
import "../styles/global.css";
import { ThemeProvider } from "next-themes";
import { GlobalStorage } from "../components/globalStorage";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>Page title</title>
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider enableSystem={true} attribute="class">
        <GlobalStorage>
          <Component {...pageProps} />
        </GlobalStorage>
      </ThemeProvider>
    </>
  );
}
