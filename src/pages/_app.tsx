import { AppProps } from "next/app";
import { FirebaseProvider } from "src/provider/firebase";


export default function App({ Component, pageProps }: AppProps) {

  return (
    <FirebaseProvider>
      <Component {...pageProps} />
    </FirebaseProvider>
  );
}
