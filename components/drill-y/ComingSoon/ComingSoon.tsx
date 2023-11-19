import React from 'react';
import styled from 'styled-components';
import { Grid, Typography } from '@mui/material';

const ComingSoon = () => (
  <Grid container justifyContent='center'>
    <Typography textAlign='center' sx={{ typography: { xs: 'h3', md: 'h1' } }}>
      ⚠️ Nothing to see here.... yet ⚠️
    </Typography>
    <Grid container justifyContent='center'>
      <ComingSoonImage src='/bitmojiPainting.png' />
    </Grid>
    <Grid container justifyContent='center'>
      <Typography sx={{ typography: { xs: 'h4', md: 'h3' } }}>Rest assured...</Typography>
    </Grid>
    <ComingSoonTextContainer container justifyContent='center'>
      <Typography sx={{ typography: { xs: 'h5', md: 'h4' } }} variant='h4'>
        Some very important people are working hard to deploy this site 🚀
      </Typography>
    </ComingSoonTextContainer>
  </Grid>
);

export default ComingSoon;

export const ComingSoonImage = styled.img({
  height: 400,
  width: 400,
});

export const ComingSoonTextContainer = styled(Grid)({
  padding: 24,
});
