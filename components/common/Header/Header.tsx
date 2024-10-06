import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import tw from 'twin.macro';
import { Badge, Grid } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DiningTwoToneIcon from '@mui/icons-material/DiningTwoTone';
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PhotoLibraryTwoToneIcon from '@mui/icons-material/PhotoLibraryTwoTone';
// import SearchIcon from '@mui/icons-material/Search';

import GlobalContext from '../../../context/GlobalContext';
import DarkMode from '../DarkMode/DarkMode';
import { Notification } from '../../../types';
// import { DrillyTextField } from '../../../styles/globals';

import {
  HeaderLogo,
  HeaderMenuButton,
  HeaderMenuLink,
  HeaderProfileButton,
  HeaderRoot,
  HeaderSearchFieldIconButton,
  HeaderTop,
} from './style';

type HeaderType = {
  isNotificationsSidebarOpen: boolean;
  isUserSidebarOpen: boolean;
  notifications?: Notification[];
  setIsNotificationsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsUserSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header = ({
  isNotificationsSidebarOpen,
  isUserSidebarOpen,
  notifications,
  setIsNotificationsSidebarOpen,
  setIsUserSidebarOpen,
}: HeaderType) => {
  const {
    state: { isDarkMode, user },
  } = React.useContext(GlobalContext);

  const [isSearchIconShown, setIsSearchIconShown] = React.useState<boolean>(true);
  const [searchField, setSearchField] = React.useState<string>('');

  return (
    <HeaderRoot $isDarkMode={isDarkMode}>
      <HeaderTop container $isDarkMode={isDarkMode}>
        <Grid item xs={4} display={{ xs: 'inline-block', md: 'none' }} />
        <Grid item xs={4} lg={3}>
          <Grid container>
            <Grid
              item
              xs={12}
              md={2}
              display={{
                xs: 'inline-block',
                md: isSearchIconShown ? 'inline-block' : 'none',
              }}
            >
              <Grid container justifyContent={{ xs: 'center', md: 'flex-start' }}>
                <Link href='/'>
                  <Grid container>
                    <HeaderLogo src={isDarkMode ? '/logoMobileDarkMode.png' : '/logoMobile.png'} />
                  </Grid>
                </Link>
              </Grid>
            </Grid>
            {/* <Grid
              item
              xs={isSearchIconShown ? 10 : 12}
              display={{ xs: 'none', md: 'inline-block' }}
            >
              <DrillyTextField
                color='secondary'
                fullWidth
                onBlur={() => setIsSearchIconShown(true)}
                onChange={e => setSearchField(e.currentTarget.value)}
                onFocus={() => setIsSearchIconShown(false)}
                placeholder='Search familial'
                size='small'
                value={searchField}
                variant='outlined'
                InputProps={{
                  startAdornment: isSearchIconShown ? (
                    <HeaderSearchFieldIconButton $isDarkMode={isDarkMode}>
                      <SearchIcon />
                    </HeaderSearchFieldIconButton>
                  ) : (
                    <HeaderSearchFieldIconButton $isDarkMode={isDarkMode}>
                      <ArrowBackIcon />
                    </HeaderSearchFieldIconButton>
                  ),
                }}
                $isDarkMode={isDarkMode}
                $isRounded
              />
            </Grid> */}
          </Grid>
        </Grid>
        <Grid item xs={1} display={{ xs: 'none', lg: 'inline-block' }} />
        <Grid item xs={4} display={{ xs: 'none', md: 'inline-block' }}>
          <Grid container justifyContent='space-around'>
            <HeaderMenuLink href='/' $isDarkMode={isDarkMode}>
              <HeaderMenuButton $isDarkMode={isDarkMode}>
                <HomeTwoToneIcon />
              </HeaderMenuButton>
            </HeaderMenuLink>
            <HeaderMenuLink href='/photos' $isDarkMode={isDarkMode}>
              <HeaderMenuButton $isDarkMode={isDarkMode}>
                <PhotoLibraryTwoToneIcon />
              </HeaderMenuButton>
            </HeaderMenuLink>
            <HeaderMenuLink href='/recipes' $isDarkMode={isDarkMode}>
              <HeaderMenuButton $isDarkMode={isDarkMode}>
                <DiningTwoToneIcon />
              </HeaderMenuButton>
            </HeaderMenuLink>
          </Grid>
        </Grid>
        <Grid item xs={1} display={{ xs: 'none', md: 'inline-block' }} />
        <Grid item xs={4} md={3}>
          <Grid container justifyContent='flex-end'>
            <HeaderProfileButton
              onClick={() => setIsNotificationsSidebarOpen(!isNotificationsSidebarOpen)}
              $isDarkMode={isDarkMode}
            >
              <Badge badgeContent={notifications?.length} color='error'>
                <NotificationsIcon tw='h-8 w-8' />
              </Badge>
            </HeaderProfileButton>
            <DarkMode darkModeContainerStyles={tw`hidden md:flex`} />
            <HeaderProfileButton
              onClick={() => setIsUserSidebarOpen(!isUserSidebarOpen)}
              $isDarkMode={isDarkMode}
            >
              {user?.avatarURL && (
                <Image
                  alt={user?.avatarURL}
                  height={0}
                  sizes='100vw'
                  src={user.avatarURL}
                  tw='h-8 object-cover rounded-3xl w-8'
                  width={0}
                />
              )}
              {!user?.avatarURL && <AccountCircleIcon tw='h-8 w-8' />}
            </HeaderProfileButton>
          </Grid>
        </Grid>
      </HeaderTop>
    </HeaderRoot>
  );
};

export default Header;
