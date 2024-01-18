import Registry from '@/components/registry';
import { GA_TRACKING_ID } from '@/utils/gaUtils';
import { AppProps } from 'next/app';
import { ReactElement } from 'react';
import useGAPageView from '@/hooks/useGAPageView';
import '@/assets/css/reset.css';
import '@/assets/css/global.css';
import Script from 'next/script';
import Head from 'next/head';
import Toast from '@/components/Toast';

const App = ({ Component, pageProps }: AppProps): ReactElement => {
  useGAPageView();

  return (
    <>
      {/* Google tag (gtag.js) */}
      <Script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} />
      <Script id="GA">
        {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', "${GA_TRACKING_ID}");`}
      </Script>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover" />
      </Head>
      <Registry session={pageProps.session}>
        <Component {...pageProps} />

        <Toast />
      </Registry>
    </>
  );
};

export default App;
