import React from 'react';
import { useRouter } from 'next/router';
import { Grid, Typography } from '@mui/material';

import GlobalContext from '../../../../../context/GlobalContext';

import { PhotoCover } from '../PhotoCover/PhotoCover';

type Props = {};

const PhotoAlbums = (props: Props) => {
  const router = useRouter();

  const {
    dispatch,
    state: { albums, isDarkMode },
  } = React.useContext(GlobalContext);

  return (
    !router.query.albumID && (
      <Grid container>
        {albums?.map(
          album =>
            !!album?.photos?.length && (
              <Grid key={album.albumName} item xs={6} sm={4} md={3} lg={2}>
                <Grid container tw='h-fit mb-1'>
                  <PhotoCover
                    photoListItem={album}
                    photoURL={album.albumCoverURL ?? album.photos[0].url}
                  />
                </Grid>
                <Typography color={isDarkMode ? 'white' : 'inherit'} variant='subtitle1'>
                  {album.albumName}
                </Typography>
                <Typography
                  color={isDarkMode ? 'white' : 'inherit'}
                  variant='subtitle2'
                >{`${album.photos.length} photo${album.photos.length > 1 ? 's' : ''}`}</Typography>
              </Grid>
            ),
        )}
      </Grid>
    )
  );
};

export { PhotoAlbums };
