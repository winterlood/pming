import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import favicon from "public/favicon.ico";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>프밍</title>
        <link rel="shortcut icon" href={favicon.src} type="image/x-icon" />
        {/*  eslint-disable-next-line @next/next/next-script-for-ga */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-XEV7PJC28X"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     
     gtag('config', 'G-XEV7PJC28X');`,
          }}
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
