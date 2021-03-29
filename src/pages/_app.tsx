import { AppProps } from "next/app";
import Head from "next/head";


export default function App({ Component, pageProps }: AppProps) {

  return (
    <>
      <Head>
        <title>모바일 삼국지 전략판 유틸 기능</title>
        <script data-ad-client="ca-pub-3235703528769525" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
        <meta name="google-site-verification" content="BpKt2jxZjZiGovOmRQWQIWPtaejyVNROK2U0Q7cH2h0" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
