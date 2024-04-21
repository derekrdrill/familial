import * as React from 'react';
import { AppProps } from 'next/app';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import GlobalProvider from '../context/GlobalProvider';
import AppLayout from '../layouts/AppLayout';

const App = ({ Component, pageProps }: AppProps) => (
  <React.StrictMode>
    <GlobalProvider>
      <AppLayout Component={Component} pageProps={pageProps} />
    </GlobalProvider>
  </React.StrictMode>
);

export default App;