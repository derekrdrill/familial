import React from 'react';
import { Grid, Typography } from '@mui/material';

type QuickMenuGridProps = {};

const QuickMenuGrid = ({}: QuickMenuGridProps) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Grid container></Grid>
      </Grid>
      <Grid item xs={12}>
        {/* <QuickMenuItems quickMenuData={quickMenuData} setIsQuickMenuOpen={setIsQuickMenuOpen} /> */}
      </Grid>
    </Grid>
  );
};
