import { ChakraProvider, createStandaloneToast } from "@chakra-ui/react";
import type { AppProps } from "next/app";

const { ToastContainer } = createStandaloneToast();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
      <ToastContainer />
    </ChakraProvider>
  );
}
