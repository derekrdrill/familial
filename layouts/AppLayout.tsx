import React from 'react';
import { NextComponentType, NextPageContext } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useUser } from '@clerk/nextjs';

import { Global as GlobalStyles } from '@emotion/react';
import styled from '@emotion/styled';
import tw, { GlobalStyles as GlobalStylesTwinMacro } from 'twin.macro';

import { Grid, TextField, Typography } from '@mui/material';
import DiningTwoToneIcon from '@mui/icons-material/DiningTwoTone';
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import PhotoSizeSelectActualTwoToneIcon from '@mui/icons-material/PhotoSizeSelectActualTwoTone';
import SearchIcon from '@mui/icons-material/Search';

import GlobalContext from '../context/GlobalContext';
import {
  GlobalReducerAction,
  GlobalReducerActionEnum,
} from '../context/GlobalReducer';

import Alert from '../components/common/Alert/Alert';
import Body from '../components/common/Body/Body';
import Header from '../components/common/Header/Header';
import MenuIcon from '../components/common/MenuIcon/MenuIcon';
import Modal from '../components/common/Modal/Modal';
import Overlay from '../components/common/Overlay/Overlay';
import Sidebar from '../components/common/Sidebar/Sidebar';
import UserProfile from '../components/familial/UserProfile/UserProfile';

export const getUserData = async (
  user,
  dispatch: React.Dispatch<GlobalReducerAction>,
) => {
  const { id, firstName, lastName, username, primaryPhoneNumber } = user.user;

  if (id && firstName && lastName && username && primaryPhoneNumber) {
    const params = new URLSearchParams({
      userID: id,
      firstName: firstName,
      lastName: lastName,
      userName: username,
      phoneNumber: primaryPhoneNumber.toString(),
    });

    await fetch(`/api/user/get?${params}`).then(async res => {
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

  const [isSidebarOpen, setIsSidebarOpen] = React.useState<boolean>(false);
  const [isUserSidebarOpen, setIsUserSidebarOpen] =
    React.useState<boolean>(false);

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
      <Overlay isSidebarOpen={isSidebarOpen || isUserSidebarOpen} />
      <Header
        isUserSidebarOpen={isUserSidebarOpen}
        setIsUserSidebarOpen={setIsUserSidebarOpen}
      />
      <MenuIcon
        isMenuIconActive={isSidebarOpen}
        setIsMenuIconActive={setIsSidebarOpen}
      />
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
            <SidebarMenuLink href='/'>
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
        zIndex={10}
      >
        <UserProfile
          isUserSidebarOpen={isUserSidebarOpen}
          setIsUserSidebarOpen={setIsUserSidebarOpen}
        />
      </Sidebar>
      <Alert />
      <Modal />
      <Body>
        <Component {...pageProps} />
      </Body>
    </>
  );
};

export default AppLayout;

export const SidebarMenuText = styled(Typography)<{ $isDarkMode?: boolean }>(
  ({ $isDarkMode }) => [
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
  ],
);

export const SidebarMenuLink = styled(Link)({
  textDecoration: 'none',
});
