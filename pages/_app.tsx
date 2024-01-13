import * as React from 'react';
import { GlobalStyles } from 'twin.macro';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import GlobalProvider from '../context/GlobalProvider';

import Alert from '../components/common/Alert/Alert';
import Body from '../components/common/Body/Body';
import Header from '../components/common/Header/Header';
import MenuIcon from '../components/common/MenuIcon/MenuIcon';
import Modal from '../components/common/Modal/Modal';
import Overlay from '../components/common/Overlay/Overlay';
import Sidebar from '../components/common/Sidebar/Sidebar';

const App = ({ Component, pageProps }) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false);
  const [isRetailOpen, setIsRetailOpen] = React.useState<boolean>(false);

  return (
    <React.StrictMode>
      <GlobalProvider>
        <GlobalStyles />
        <Overlay isSidebarOpen={isSidebarOpen} isQuickViewOpen={isMenuOpen} />
        {/* <Header /> */}
        {/* <MenuIcon isMenuIconActive={isSidebarOpen} setIsMenuIconActive={setIsSidebarOpen} /> */}
        {/* <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} /> */}
        <Alert />
        <Modal />
        <Body>
          <Component {...pageProps} />
        </Body>
      </GlobalProvider>
    </React.StrictMode>
  );
};

export default App;

// export const getInitialProps = async () => {
//   try {
//     console.log('CONNECTING TO MONGO');
//     await conn();
//     console.log('CONNECTED TO MONGO');

//     console.log('FETCHING DOCUMENTS');
//     const albums = await Albums.find();
//     console.log('FETCHED DOCUMENTS');

//     return {
//       props: {
//         albums: JSON.parse(JSON.stringify(albums)),
//       },
//     };
//   } catch (error) {
//     console.log(error);
//     return {
//       notFound: true,
//     };
//   }
// };
