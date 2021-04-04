import { AppProps } from "next/app";
import Head from "next/head";
import { FirebaseProvider } from "src/provider/firebase";


export default function App({ Component, pageProps }: AppProps) {

  return (
    <>
      <Head>
        <title>모바일 삼국지 전략판 유틸 기능</title>
      </Head>
      <FirebaseProvider>
        <Component {...pageProps} />
      </FirebaseProvider>
    </>
  );
}
