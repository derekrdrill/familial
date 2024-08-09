import React from 'react';
import { Grid, Typography } from '@mui/material';

import GlobalContext from '../../context/GlobalContext';

import PhotosLayout from '../../layouts/PhotosLayout';
import { PhotoCover } from '../../components/familial/Photos';

import conn from '../../data/connection';
import { Albums as AlbumsData, Photos as PhotosData } from '../../data/models';
import { Albums, Photos } from '../../types';
import { GlobalReducerActionEnum } from '../../context/GlobalReducer';

type PhotosIndexProps = {
  albumsData: Albums[];
  photosData: Photos[];
};

const PhotosIndex = ({ albumsData, photosData }: PhotosIndexProps) => {
  const {
    dispatch,
    state: { isDarkMode },
  } = React.useContext(GlobalContext);
  React.useEffect(() => {
    dispatch({
      type: GlobalReducerActionEnum.SET_SELECTED_PHOTO_ALBUM,
      payload: { selectedPhotoAlbum: undefined },
    });
  }, []);

  return (
    <PhotosLayout
      albumsData={albumsData}
      photosData={photosData}
      photosLayoutTitle='Photo albums'
    >
      <Grid container>
        {albumsData?.map(
          album =>
            !!album?.photos?.length && (
              <Grid key={album.albumName} item xs={6} sm={4} md={3} lg={2}>
                <Grid container style={{ height: '80%' }} tw='mb-1'>
                  <PhotoCover
                    photoListItem={album}
                    photoURL={album.photos[0].url}
                  />
                </Grid>
                <Typography
                  color={isDarkMode ? 'white' : 'inherit'}
                  variant='subtitle1'
                >
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
    </PhotosLayout>
  );
};

export default PhotosIndex;

export const getServerSideProps = async () => {
  try {
    await conn();
    const albums = await AlbumsData.find().sort({ albumName: 1 });
    const photos = await PhotosData.find().sort({ uploadedAt: -1 });

    const albumsMapped = albums.map(album => ({
      _id: album._id.toString(),
      albumName: album.albumName,
      photos: photos.filter(photo => photo.albumName === album.albumName),
    }));

    return {
      props: {
        albumsData: JSON.parse(JSON.stringify(albumsMapped)),
        photosData: JSON.parse(JSON.stringify(photos)),
      },
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
};
