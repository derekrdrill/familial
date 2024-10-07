import React from 'react';
import { NextComponentType, NextPageContext } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useUser } from '@clerk/nextjs';

import { Global as GlobalStyles } from '@emotion/react';
import styled from '@emotion/styled';
import tw, { GlobalStyles as GlobalStylesTwinMacro } from 'twin.macro';

import { Button, Grid, TextField, Typography } from '@mui/material';
import DiningTwoToneIcon from '@mui/icons-material/DiningTwoTone';
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import PhotoSizeSelectActualTwoToneIcon from '@mui/icons-material/PhotoSizeSelectActualTwoTone';
import SearchIcon from '@mui/icons-material/Search';

import GlobalContext from '../context/GlobalContext';
import { GlobalReducerAction, GlobalReducerActionEnum } from '../context/GlobalReducer';

import Alert from '../components/common/Alert/Alert';
import Body from '../components/common/Body/Body';
import Header from '../components/common/Header/Header';
import MenuIcon from '../components/common/MenuIcon/MenuIcon';
import Modal from '../components/common/Modal/Modal';
import Notifications from '../components/familial/Notifications/Notifications';
import Overlay from '../components/common/Overlay/Overlay';
import Sidebar from '../components/common/Sidebar/Sidebar';
import UserProfile from '../components/familial/UserProfile';
import { FullPageLoader } from '../components/common/Loaders';

import { Notification } from '../types';

const getNotifications = async ({
  setNotifications,
  userId,
}: {
  setNotifications: React.Dispatch<React.SetStateAction<Notification[] | undefined>>;
  userId: string;
}) => {
  fetch(`/api/notifications/get/${userId}`).then(async res => {
    const notifications = await res.json();
    setNotifications(notifications);
  });
};

export const getUserData = async (user, dispatch: React.Dispatch<GlobalReducerAction>) => {
  const { id, firstName, lastName, primaryPhoneNumber } = user.user;

  if (id && firstName && lastName && primaryPhoneNumber) {
    await fetch(`/api/user/get/${id}`).then(async res => {
      const user = await res.json();

      dispatch({
        type: GlobalReducerActionEnum.SET_USER,
        payload: { user: user },
      });
    });
  }
};

type AppProps = {
  Component: NextComponentType<NextPageContext, any, any>;
  pageProps: any;
};

const AppLayout = ({ Component, pageProps }: AppProps) => {
  const authUser = useUser();
  const router = useRouter();

  const {
    dispatch,
    state: { isDarkMode, user },
  } = React.useContext(GlobalContext);

  const [isRouteChangeLoading, setIsRouteChangeLoading] = React.useState<boolean>(false);
  const [isUserInfoLoading, setIsUserInfoLoading] = React.useState<boolean>(true);
  const [isSidebarOpen, setIsSidebarOpen] = React.useState<boolean>(false);
  const [isNotificationsSidebarOpen, setIsNotificationsSidebarOpen] =
    React.useState<boolean>(false);
  const [isUserSidebarOpen, setIsUserSidebarOpen] = React.useState<boolean>(false);
  const [notifications, setNotifications] = React.useState<Notification[]>();

  React.useEffect(() => {
    router.events.on('routeChangeStart', () => {
      dispatch({ type: GlobalReducerActionEnum.SET_PHOTO_LIST, payload: { photoList: [] } });
      setIsRouteChangeLoading(true);
    });
    router.events.on('routeChangeComplete', () => {
      setTimeout(() => {
        setIsRouteChangeLoading(false);
      }, 250);
    });
  }, []);

  React.useEffect(() => {
    if (user) {
      setIsUserInfoLoading(false);
    }
  }, [user]);

  React.useEffect(() => {
    setIsSidebarOpen(false);

    dispatch({
      type: GlobalReducerActionEnum.SET_DARK_MODE,
      payload: { isDarkMode: !!localStorage.getItem('isDarkMode') },
    });
  }, [router]);

  React.useEffect(() => {
    if (authUser.isLoaded && authUser.isSignedIn && !user) {
      getUserData(authUser, dispatch);
    }
  }, [authUser, user]);

  React.useEffect(() => {
    if (user) {
      getNotifications({ setNotifications, userId: user.userID });
    }
  }, [router, user]);

  React.useEffect(() => {
    if (!notifications?.length) {
      setIsNotificationsSidebarOpen(false);
    }
  }, [notifications]);

  return (
    <>
      <GlobalStylesTwinMacro />
      <GlobalStyles
        styles={{
          body: {
            backgroundColor: isDarkMode ? '#282c34' : ' inherit',
            height:
              isNotificationsSidebarOpen ||
              isSidebarOpen ||
              isUserSidebarOpen ||
              isRouteChangeLoading
                ? '100vh'
                : '100%',
            overflowY:
              isNotificationsSidebarOpen ||
              isSidebarOpen ||
              isUserSidebarOpen ||
              isRouteChangeLoading
                ? 'hidden'
                : 'auto',
          },
        }}
      />
      <Overlay
        isSidebarOpen={
          isNotificationsSidebarOpen ||
          isRouteChangeLoading ||
          isSidebarOpen ||
          isUserInfoLoading ||
          isUserSidebarOpen
        }
        opacity={isRouteChangeLoading ? 0.9 : 0.6}
        zIndex={2001}
      />
      <FullPageLoader isLoading={isRouteChangeLoading || isUserInfoLoading} />
      <Header
        isNotificationsSidebarOpen={isNotificationsSidebarOpen}
        isUserSidebarOpen={isUserSidebarOpen}
        notifications={notifications}
        setIsUserSidebarOpen={setIsUserSidebarOpen}
        setIsNotificationsSidebarOpen={setIsNotificationsSidebarOpen}
      />
      <MenuIcon isMenuIconActive={isSidebarOpen} setIsMenuIconActive={setIsSidebarOpen} />
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        padding='150px 30px'
        setIsSidebarOpen={setIsSidebarOpen}
        side='left'
      >
        <Grid container rowSpacing={6}>
          <TextField
            color='secondary'
            fullWidth
            placeholder='Search familial'
            InputProps={{ startAdornment: <SearchIcon color='disabled' /> }}
          />
          <Grid item xs={12}>
            <SidebarMenuLink href='/'>
              <SidebarMenuText variant='h4' $isDarkMode={isDarkMode}>
                <Grid container justifyContent='space-between'>
                  Home
                  <HomeTwoToneIcon />
                </Grid>
              </SidebarMenuText>
            </SidebarMenuLink>
          </Grid>
          <Grid item xs={12}>
            <SidebarMenuLink href='/photos'>
              <SidebarMenuText variant='h4' $isDarkMode={isDarkMode}>
                <Grid container justifyContent='space-between'>
                  Photos
                  <PhotoSizeSelectActualTwoToneIcon />
                </Grid>
              </SidebarMenuText>
            </SidebarMenuLink>
          </Grid>
          <Grid item xs={12}>
            <SidebarMenuLink href='/recipes'>
              <SidebarMenuText variant='h4' $isDarkMode={isDarkMode}>
                <Grid container justifyContent='space-between'>
                  Recipes
                  <DiningTwoToneIcon />
                </Grid>
              </SidebarMenuText>
            </SidebarMenuLink>
          </Grid>
        </Grid>
      </Sidebar>
      <Sidebar
        isSidebarOpen={isUserSidebarOpen}
        setIsSidebarOpen={setIsUserSidebarOpen}
        padding='0px'
        side='right'
        zIndex={2001}
      >
        <UserProfile
          isUserSidebarOpen={isUserSidebarOpen}
          setIsUserSidebarOpen={setIsUserSidebarOpen}
        />
      </Sidebar>
      <Sidebar
        isSidebarOpen={isNotificationsSidebarOpen}
        setIsSidebarOpen={setIsNotificationsSidebarOpen}
        side='right'
        zIndex={2001}
      >
        <div tw='max-h-[99%] overflow-auto'>
          <Button
            color='secondary'
            onClick={() => setIsNotificationsSidebarOpen(!isNotificationsSidebarOpen)}
            size='small'
            tw='m-1'
            variant='outlined'
          >
            <Typography variant='h5'>&#10539;</Typography>
          </Button>
          <Notifications
            notifications={notifications}
            setIsNotificationsSidebarOpen={setIsNotificationsSidebarOpen}
            setNotifications={setNotifications}
          />
        </div>
      </Sidebar>
      <Alert />
      <Modal />
      <Body>{!isUserInfoLoading && <Component {...pageProps} />}</Body>
    </>
  );
};

export default AppLayout;

export const SidebarMenuText = styled(Typography)<{ $isDarkMode?: boolean }>(({ $isDarkMode }) => [
  !$isDarkMode && tw`bg-gradient-to-r from-black to-black`,
  !$isDarkMode && tw`text-black`,
  $isDarkMode && tw`bg-gradient-to-r from-white to-white`,
  $isDarkMode && tw`text-white`,
  tw`bg-left-bottom`,
  tw`bg-no-repeat`,
  tw`cursor-pointer`,
  tw`delay-75`,
  tw`ease-in-out`,
  tw`transition-all`,
  tw`hover:bg-left-bottom`,
  {
    '&:hover': {
      backgroundSize: '100% 0.1em',
    },
    backgroundSize: '0% 0.1em',
    fontFamily: `'Josefin Sans', sans-serif !important`,
  },
]);

export const SidebarMenuLink = styled(Link)({
  textDecoration: 'none',
});
