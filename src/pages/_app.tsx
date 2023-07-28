import { ChakraProvider, createStandaloneToast } from "@chakra-ui/react";
import { ErrorBoundary } from "react-error-boundary";
import type { AppProps } from "next/app";

const { ToastContainer } = createStandaloneToast();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary fallback={<p>Something went wrong</p>}>
      <ChakraProvider>
        <Component {...pageProps} />
        <ToastContainer />
      </ChakraProvider>
    </ErrorBoundary>
  );
}
