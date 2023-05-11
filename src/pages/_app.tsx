import { AppProps } from "next/app";
import Head from "next/head";
import "../styles/global.css";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    };

    handleRouteChange();

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
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

      <Component {...pageProps} />
    </>
  );
}
