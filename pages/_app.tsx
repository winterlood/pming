import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

const gaScript = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-XEV7PJC28X');
`;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-XEV7PJC28X"
        ></script>

        <script
          dangerouslySetInnerHTML={{
            __html: gaScript,
          }}
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
