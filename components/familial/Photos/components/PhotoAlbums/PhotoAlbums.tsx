import React from 'react';
import { useRouter } from 'next/router';
import { Grid, Typography } from '@mui/material';

import GlobalContext from '../../../../../context/GlobalContext';

import { PhotoCover } from '../PhotoCover/PhotoCover';
import { DrillyTypography } from '../../../../../styles/globals';

type Props = {};

const PhotoAlbums = (props: Props) => {
  const router = useRouter();

  const {
    dispatch,
    state: { albums, isDarkMode },
  } = React.useContext(GlobalContext);

  return (
    !router.query.albumID && (
      <Grid container rowGap={1}>
        {albums?.map(
          (album, albumKey) =>
            !!album?.photos?.length && (
              <Grid key={album.albumName} item xs={6} sm={4} md={3} lg={2}>
                <Grid container tw='h-fit mb-1'>
                  <PhotoCover
                    photoAlbumKey={albumKey}
                    photoListItem={album}
                    photoURL={album.albumCoverURL ?? album.photos[0].url}
                  />
                </Grid>
                <div tw='ml-1'>
                  <DrillyTypography variant='subtitle1' $isDarkMode={isDarkMode}>
                    {album.albumName}
                  </DrillyTypography>
                  <DrillyTypography
                    variant='subtitle2'
                    $isDarkMode={isDarkMode}
                  >{`${album.photos.length} photo${album.photos.length > 1 ? 's' : ''}`}</DrillyTypography>
                </div>
              </Grid>
            ),
        )}
      </Grid>
    )
  );
};

export { PhotoAlbums };
