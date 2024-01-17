import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import tw from 'twin.macro';
import { Grid, Typography } from '@mui/material';

import GlobalContext from '../../../context/GlobalContext';
import { GlobalReducerActionEnum } from '../../../context/GlobalReducer';

import { PhotoCover } from '../Photos';
import PhotoUploader from '../../common/PhotoUploader';
import { Photos as PhotosType } from '../../../context/types';

type Props = {};

export const Photos = (props: Props) => {
  const router = useRouter();
  const {
    dispatch,
    state: { photos, albums },
  } = React.useContext(GlobalContext);

  const [photoListData, setPhotoListData] = React.useState<
    { albumName: string; photos: PhotosType[] | undefined }[] | undefined
  >(undefined);

  const [selectedAlbum, setSelectedAlbum] = React.useState<{
    albumName?: string;
    photos?: PhotosType[] | undefined;
  } | null>(null);

  React.useEffect(() => {
    setPhotoListData(
      albums?.map(album => ({
        albumName: album.albumName,
        photos: photos?.filter(photo => photo.albumName === album.albumName),
      })),
    );
  }, [albums]);

  React.useEffect(() => {
    if (!router.asPath.includes('?album=')) {
      setSelectedAlbum(null);
    }
  }, [router]);

  return (
    <Grid container tw='p-8'>
      <PhotoUploader />
      <Grid container>
        <Grid item xs={12}>
          <Typography variant='h3'>{selectedAlbum?.albumName ?? 'Albums'}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container columnSpacing={4} rowSpacing={6}>
            {selectedAlbum &&
              selectedAlbum.photos?.map(photoListItem => (
                <PhotoCover
                  key={photoListItem._id}
                  photoListItem={photoListItem}
                  photoSubtitle={photoListItem.bio}
                  photoTitle={photoListItem.title}
                  photoURL={photoListItem.url}
                  setSelectedAlbum={setSelectedAlbum}
                />
              ))}
            {!selectedAlbum &&
              photoListData?.map(
                photoListItem =>
                  !!photoListItem?.photos?.length && (
                    <PhotoCover
                      key={photoListItem.albumName}
                      photoListItem={photoListItem}
                      photoSubtitle={`${photoListItem.photos.length} photo${photoListItem.photos.length > 1 ? 's' : ''}`}
                      photoTitle={photoListItem.albumName}
                      photoURL={photoListItem.photos[0].url}
                      setSelectedAlbum={setSelectedAlbum}
                    />
                  ),
              )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export const PhotoAlbumCoverPhoto = styled(Image)([
  tw`border-2`,
  tw`border-gray-100`,
  tw`border-solid`,
  tw`cursor-pointer`,
  tw`hover:opacity-100`,
  tw`opacity-80`,
  tw`rounded-2xl`,
]);
