import React from 'react';
import tw from 'twin.macro';
import styled from '@emotion/styled';
import { Grid, Typography } from '@mui/material';

const ComingSoon = () => (
  <>
    <Grid item xs={12}>
      <Typography sx={{ typography: { xs: 'h3', md: 'h1' } }} textAlign='center' variant='h1'>
        ⚠️ Nothing to see here.... yet ⚠️
      </Typography>
    </Grid>
    <Grid item xs={12}>
      <Grid container justifyContent='center'>
        <ComingSoonImage src='/bitmojiPainting.png' />
      </Grid>
    </Grid>
    <Grid item xs={12}>
      <Typography sx={{ typography: { xs: 'h4', md: 'h3' } }} textAlign='center' variant='h2'>
        Rest assured...
      </Typography>
    </Grid>
    <ComingSoonTextContainer item xs={12}>
      <Typography sx={{ typography: { xs: 'h5', md: 'h4' } }} textAlign='center' variant='h3'>
        Some very important people are working hard to deploy this site 🚀
      </Typography>
    </ComingSoonTextContainer>
  </>
);

export default ComingSoon;

export const ComingSoonImage = styled.img([tw`h-96`, tw`w-96`]);
export const ComingSoonTextContainer = styled(Grid)([tw`pt-6`]);
