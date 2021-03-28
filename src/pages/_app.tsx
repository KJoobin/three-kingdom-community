import { AppProps } from "next/app";
import { Head } from "next/document";

import { FirebaseProvider } from "../provider/firebase";

export default function App({ Component, pageProps }: AppProps) {

  return <FirebaseProvider>
    <Head>
      <title>모바일 삼국지 전략판 유틸 기능</title>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      <script data-ad-client="ca-pub-3235703528769525" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
    </Head>
    <Component {...pageProps} />
  </FirebaseProvider>;
}
