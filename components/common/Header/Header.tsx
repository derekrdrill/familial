import * as React from 'react';
import Link from 'next/link';
import { Grid, IconButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EventNoteTwoToneIcon from '@mui/icons-material/EventNoteTwoTone';
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import PhotoSizeSelectActualTwoToneIcon from '@mui/icons-material/PhotoSizeSelectActualTwoTone';
import SearchIcon from '@mui/icons-material/Search';

import {
  HeaderLogo,
  HeaderMenuButton,
  HeaderMenuLink,
  HeaderRoot,
  HeaderSearchField,
  HeaderTop,
} from './style';

const Header = () => {
  const [isSearchIconShown, setIsSearchIconShown] = React.useState<boolean>(true);
  const [searchField, setSearchField] = React.useState<string>('');

  return (
    <HeaderRoot>
      <HeaderTop container>
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
                  <HeaderLogo src='/favicon.ico' />
                </Link>
              </Grid>
            </Grid>
            <Grid xs={isSearchIconShown ? 10 : 12} display={{ xs: 'none', md: 'inline-block' }}>
              <HeaderSearchField
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
                    <SearchIcon color='disabled' />
                  ) : (
                    <IconButton>
                      <ArrowBackIcon />
                    </IconButton>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={1} display={{ xs: 'none', lg: 'inline-block' }} />
        <Grid item xs={4} display={{ xs: 'none', md: 'inline-block' }}>
          <Grid container justifyContent='space-around'>
            <HeaderMenuLink href='/'>
              <HeaderMenuButton>
                <HomeTwoToneIcon />
              </HeaderMenuButton>
            </HeaderMenuLink>
            <HeaderMenuLink href='/photo-uploader'>
              <HeaderMenuButton>
                <PhotoSizeSelectActualTwoToneIcon />
              </HeaderMenuButton>
            </HeaderMenuLink>
            <HeaderMenuLink href='/'>
              <HeaderMenuButton>
                <EventNoteTwoToneIcon />
              </HeaderMenuButton>
            </HeaderMenuLink>
          </Grid>
        </Grid>
        <Grid item xs={1} display={{ xs: 'none', md: 'inline-block' }} />
        <Grid item xs={4} md={3}>
          <Grid container justifyContent='flex-end'>
            <IconButton>
              <AccountCircleIcon />
            </IconButton>
          </Grid>
        </Grid>
      </HeaderTop>
    </HeaderRoot>
  );
};

export default Header;
