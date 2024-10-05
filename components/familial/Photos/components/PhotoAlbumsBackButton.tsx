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
      <Grid container tw='mb-2 mx-2 md:mx-10 lg:mt-6'>
        <Button
          onClick={() => {
            router.push('/photos');
          }}
          startIcon={<KeyboardDoubleArrowLeftIcon />}
          tw='normal-case px-1'
          variant='text'
        >
          Back to Photo Albums
        </Button>
      </Grid>
    )
  );
};
