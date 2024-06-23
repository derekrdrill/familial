import * as React from 'react';
import Link from 'next/link';
import { Grid } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DiningTwoToneIcon from '@mui/icons-material/DiningTwoTone';
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import PhotoLibraryTwoToneIcon from '@mui/icons-material/PhotoLibraryTwoTone';
// import SearchIcon from '@mui/icons-material/Search';

import GlobalContext from '../../../context/GlobalContext';

import DarkMode from '../DarkMode/DarkMode';
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
  isUserSidebarOpen: boolean;
  setIsUserSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header = ({ isUserSidebarOpen, setIsUserSidebarOpen }: HeaderType) => {
  const {
    state: { isDarkMode },
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
              display={{ xs: 'inline-block', md: isSearchIconShown ? 'inline-block' : 'none' }}
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
                placeholder='Search drill-y'
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
            <HeaderMenuLink href='/' $isDarkMode={isDarkMode}>
              <HeaderMenuButton $isDarkMode={isDarkMode}>
                <DiningTwoToneIcon />
              </HeaderMenuButton>
            </HeaderMenuLink>
          </Grid>
        </Grid>
        <Grid item xs={1} display={{ xs: 'none', md: 'inline-block' }} />
        <Grid item xs={4} md={3}>
          <Grid container justifyContent='flex-end'>
            <DarkMode />
            <HeaderProfileButton
              onClick={() => setIsUserSidebarOpen(!isUserSidebarOpen)}
              $isDarkMode={isDarkMode}
            >
              <AccountCircleIcon />
            </HeaderProfileButton>
          </Grid>
        </Grid>
      </HeaderTop>
    </HeaderRoot>
  );
};

export default Header;
