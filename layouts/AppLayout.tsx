import React from 'react';
import { NextComponentType, NextPageContext } from 'next';
import { useRouter } from 'next/router';
import { GlobalStyles as GlobalStylesTwinMacro } from 'twin.macro';
import { Global as GlobalStyles } from '@emotion/react';

import GlobalContext from '../context/GlobalContext';

import Alert from '../components/common/Alert/Alert';
import Body from '../components/common/Body/Body';
import Header from '../components/common/Header/Header';
import MenuIcon from '../components/common/MenuIcon/MenuIcon';
import Modal from '../components/common/Modal/Modal';
import Overlay from '../components/common/Overlay/Overlay';
import Sidebar from '../components/common/Sidebar/Sidebar';

type AppProps = {
  Component: NextComponentType<NextPageContext, any, any>;
  pageProps: any;
};

const AppLayout = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  const {
    state: { isDarkMode },
  } = React.useContext(GlobalContext);

  const [isSidebarOpen, setIsSidebarOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    setIsSidebarOpen(false);
  }, [router]);

  return (
    <>
      <GlobalStylesTwinMacro />
      <GlobalStyles
        styles={{
          body: {
            backgroundColor: isDarkMode ? 'black' : ' inherit',
          },
        }}
      />
      <Overlay isSidebarOpen={isSidebarOpen} />
      <Header />
      <MenuIcon isMenuIconActive={isSidebarOpen} setIsMenuIconActive={setIsSidebarOpen} />
      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      <Alert />
      <Modal />
      <Body>
        <Component {...pageProps} />
      </Body>
    </>
  );
};

export default AppLayout;
