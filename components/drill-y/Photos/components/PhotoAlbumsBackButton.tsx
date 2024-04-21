import React from 'react';
import { useRouter } from 'next/router';
import 'twin.macro';
import { Button, Grid } from '@mui/material';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';

export const PhotoAlbumsBackButton = () => {
  const router = useRouter();
  const isPhotoAlbumOpened = !!router.query.albumID;

  return (
    isPhotoAlbumOpened && (
      <Grid container tw='md:mx-8 mt-6'>
        <Button
          onClick={() => {
            router.push('/photos');
          }}
          startIcon={<KeyboardDoubleArrowLeftIcon />}
          tw='normal-case'
          variant='text'
        >
          Back to Photo Albums
        </Button>
      </Grid>
    )
  );
};
