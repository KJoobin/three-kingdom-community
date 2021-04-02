import { AppProps } from "next/app";
import Head from "next/head";


export default function App({ Component, pageProps }: AppProps) {

  return (
    <>
      <Head>
        <title>모바일 삼국지 전략판 유틸 기능</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
