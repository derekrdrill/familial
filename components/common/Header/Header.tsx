import * as React from 'react';
import { useRouter } from 'next/router';
import { Grid } from '@mui/material';

import { HeaderLogo, HeaderMenuText, HeaderRoot, HeaderSearchIcon, HeaderTop } from './style';

import Link from 'next/link';

const Header = () => {
  const router = useRouter();

  return (
    <HeaderRoot>
      <HeaderTop
        container
        justifyContent='space-around'
        sx={{ paddingLeft: { xs: '15px', sm: '20px' }, paddingRight: { xs: '15px', sm: '20px' } }}
      >
        <Grid item xs={4} lg={1} xl={2} sx={{ paddingTop: '40px' }} />
        <Grid item xs={4} lg={1} xl={2}>
          <Grid container display={{ lg: 'none' }}>
            <Grid item xs={12}>
              <Grid container justifyContent='center'>
                <Link href='/'>
                  <HeaderLogo src='/donutsImg.png' />
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={1} xl={2} display={{ xs: 'none', lg: 'inline-block' }} />
      </HeaderTop>
      <Grid
        container
        sx={{ paddingLeft: { xs: '15px', sm: '20px' }, paddingRight: { xs: '15px', sm: '20px' } }}
      >
        <Grid item xs={12}>
          <Grid container justifyContent={{ xs: 'space-around', lg: 'space-between' }}>
            <Grid item display={{ xs: 'none', lg: 'inline-flex' }}>
              <Link href='/'>{/* <HeaderLogo src='/donutsImg.png' /> */}</Link>
            </Grid>
            <Grid item>
              <Grid
                columnSpacing={10}
                container
                justifyContent='space-around'
                sx={{ marginTop: 1.5 }}
              ></Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </HeaderRoot>
  );
};

export default Header;
