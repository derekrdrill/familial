import React from 'react';
import { useRouter } from 'next/router';
import 'twin.macro';

import { Button, Grid } from '@mui/material';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';

type PhotoAlbumsBackButtonProps = {};

const PhotoAlbumsBackButton = ({}: PhotoAlbumsBackButtonProps) => {
  const router = useRouter();
  const isPhotoAlbumOpened = !!router.query.album;

  return (
    isPhotoAlbumOpened && (
      <Grid container>
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

export default PhotoAlbumsBackButton;
