import { ChakraProvider } from "@chakra-ui/react";
import { wrapper } from "store";

import theme from "../theme";
import { AppProps } from "next/app";
import Head from "next/head";
import NextNProgress from "nextjs-progressbar";

import { PusherProvider } from "use-pusher";

function MyApp({ Component, pageProps }: AppProps) {
  const pusherConfig = {
    clientKey: process.env.NEXT_PUBLIC_PUSHER_KEY,
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
    authEndpoint: "/api/pusher/auth",
  };
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
        />
      </Head>
      <PusherProvider {...pusherConfig}>
        <ChakraProvider resetCSS theme={theme}>
          <NextNProgress color={theme.colors.green[500]} />
          <Component {...pageProps} />
        </ChakraProvider>
      </PusherProvider>
    </>
  );
}

export default wrapper.withRedux(MyApp);
