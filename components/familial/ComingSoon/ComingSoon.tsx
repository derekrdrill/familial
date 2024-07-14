import React from 'react';
import tw from 'twin.macro';
import styled from '@emotion/styled';
import { Grid, Typography } from '@mui/material';

import GlobalContext from '../../../context/GlobalContext';
import { DrillyTypography } from '../../../styles/globals';

export const ComingSoon = () => {
  const {
    state: { isDarkMode },
  } = React.useContext(GlobalContext);
  return (
    <>
      <Grid item xs={12}>
        <DrillyTypography
          sx={{ typography: { xs: 'h3', md: 'h1' } }}
          textAlign='center'
          variant='h1'
          $isDarkMode={isDarkMode}
        >
          ⚠️ Nothing to see here.... yet ⚠️
        </DrillyTypography>
      </Grid>
      <Grid item xs={12}>
        <Grid container justifyContent='center'>
          <ComingSoonImage src='/bitmojiPainting.png' />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <DrillyTypography
          sx={{ typography: { xs: 'h4', md: 'h3' } }}
          textAlign='center'
          variant='h2'
          $isDarkMode={isDarkMode}
        >
          Rest assured...
        </DrillyTypography>
      </Grid>
      <ComingSoonTextContainer item xs={12}>
        <DrillyTypography
          sx={{ typography: { xs: 'h5', md: 'h4' } }}
          textAlign='center'
          variant='h3'
          $isDarkMode={isDarkMode}
        >
          Some very important people are working hard to deploy this site 🚀
        </DrillyTypography>
      </ComingSoonTextContainer>
    </>
  );
};

export const ComingSoonImage = styled.img([tw`h-96`, tw`w-96`]);
export const ComingSoonTextContainer = styled(Grid)([tw`pt-6`]);
