import React from 'react';
import Image from 'next/image';
import { NextRouter, useRouter } from 'next/router';
import styled from '@emotion/styled';
import tw from 'twin.macro';
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import AddAPhotoTwoToneIcon from '@mui/icons-material/AddAPhotoTwoTone';
import AppsIcon from '@mui/icons-material/Apps';
import ListIcon from '@mui/icons-material/List';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PhotoSizeSelectActualTwoToneIcon from '@mui/icons-material/PhotoSizeSelectActualTwoTone';
import ImageUploading, { ImageListType as PhotoListType } from 'react-images-uploading';

import GlobalContext from '../../../context/GlobalContext';
import { GlobalReducerAction, GlobalReducerActionEnum } from '../../../context/GlobalReducer';

import { PhotoCover } from '../Photos';
import PhotoAlbumsBackButton from './components/PhotoAlbumsBackButton';
import PhotoUploader from '../../common/PhotoUploader';
import { Photos as PhotosType } from '../../../context/types';

const handlePhotoUploadingChange = (
  photoListData: PhotoListType,
  dispatch: React.Dispatch<GlobalReducerAction>,
) =>
  dispatch({
    type: GlobalReducerActionEnum.SET_PHOTO_LIST,
    payload: {
      photoList: photoListData,
    },
  });

export const handleSetSelectedAlbums = (
  photos: PhotosType[] | undefined,
  router: NextRouter,
  dispatch: React.Dispatch<GlobalReducerAction>,
) => {
  if (router.asPath.includes('?album=')) {
    dispatch({
      type: GlobalReducerActionEnum.SET_SELECTED_PHOTO_ALBUM,
      payload: {
        selectedPhotoAlbum: {
          albumName: router.query.album as string,
          photos: photos?.filter(photo => photo.albumName === router.query.album),
        },
      },
    });
  } else {
    dispatch({
      type: GlobalReducerActionEnum.SET_SELECTED_PHOTO_ALBUM,
      payload: {
        selectedPhotoAlbum: undefined,
      },
    });
  }
};

export const Photos = () => {
  const router = useRouter();

  const {
    dispatch,
    state: { photos, albums, photoList, photoUploadData, selectedPhotoAlbum },
  } = React.useContext(GlobalContext);

  const [photoListData, setPhotoListData] = React.useState<
    { albumName: string; photos: PhotosType[] | undefined }[] | undefined
  >(undefined);
  const [photosView, setPhotosView] = React.useState<'grid' | 'list'>('grid');

  React.useEffect(() => {
    setPhotoListData(
      albums?.map(album => ({
        albumName: album.albumName,
        photos: photos?.filter(photo => photo.albumName === album.albumName),
      })),
    );

    handleSetSelectedAlbums(photos, router, dispatch);

    if (!photoUploadData) {
      dispatch({ type: GlobalReducerActionEnum.SET_PHOTO_LIST, payload: { photoList: [] } });
      dispatch({
        type: GlobalReducerActionEnum.SET_PHOTO_UPLOAD_DATA,
        payload: { photoUploadData: [] },
      });
    }
  }, [albums]);

  React.useEffect(() => {
    handleSetSelectedAlbums(photos, router, dispatch);

    dispatch({ type: GlobalReducerActionEnum.SET_PHOTO_LIST, payload: { photoList: [] } });
    dispatch({
      type: GlobalReducerActionEnum.SET_PHOTO_UPLOAD_DATA,
      payload: { photoUploadData: [] },
    });
  }, [router]);

  React.useEffect(() => {
    if (
      photoUploadData?.length &&
      selectedPhotoAlbum?.albumName &&
      photoUploadData.every(photoUpload => !photoUpload.albumName)
    ) {
      dispatch({
        type: GlobalReducerActionEnum.SET_PHOTO_UPLOAD_DATA,
        payload: {
          photoUploadData: photoUploadData?.map(photoUpload => ({
            ...photoUpload,
            ...{ albumName: selectedPhotoAlbum?.albumName },
          })),
        },
      });
    }
  }, [photoUploadData]);

  React.useEffect(() => {
    if (!selectedPhotoAlbum) {
      setPhotosView('grid');
    }
  }, [selectedPhotoAlbum]);

  return (
    <Grid container tw='p-8'>
      <PhotoAlbumsBackButton />
      <PhotoUploader />
      <PhotosMainContainer container>
        <Grid item xs={12} tw='pb-10'>
          <Grid container justifyContent='space-between'>
            <Grid item>
              <Typography variant='h5'>
                {selectedPhotoAlbum?.albumName ?? 'Photo Albums'}
              </Typography>
              {selectedPhotoAlbum?.photos?.length && (
                <Typography variant='subtitle1'>{`${selectedPhotoAlbum?.photos?.length} photos`}</Typography>
              )}
            </Grid>
            <Grid item>
              <Grid container justifyContent='space-between' spacing={1}>
                {!selectedPhotoAlbum && (
                  <Button
                    color='info'
                    onClick={() => {
                      dispatch({
                        type: GlobalReducerActionEnum.SET_MODAL_ITEM,
                        payload: {
                          modalItem: {
                            handleSubmit: async () => {
                              const newAlbumName = (
                                document.getElementById('album') as HTMLInputElement
                              )?.value;

                              await fetch('api/album', {
                                method: 'POST',
                                body: newAlbumName,
                              })
                                .then(async res => {
                                  const newAlbums = await res.json();

                                  dispatch({
                                    type: GlobalReducerActionEnum.SET_ALBUMS,
                                    payload: { albums: newAlbums },
                                  });
                                })
                                .catch(e => {
                                  console.log(e);
                                });
                            },
                            isExitHidden: true,
                            isModalOpen: true,
                            modalBody: (
                              <TextField
                                id='album'
                                fullWidth
                                placeholder='Enter album name'
                                size='small'
                                variant='outlined'
                              />
                            ),
                            modalTitle: 'Add new album',
                            submitSuccessMessage: `New album has been added!`,
                          },
                        },
                      });
                    }}
                    startIcon={<PhotoSizeSelectActualTwoToneIcon />}
                    tw='mt-2 normal-case'
                    variant='text'
                  >
                    Add album
                  </Button>
                )}
                {selectedPhotoAlbum && (
                  <Grid item>
                    <Grid container spacing={1} justifyContent='flex-end'>
                      <Grid item xs={7} md={6}>
                        <PhotosViewButton
                          fullWidth
                          onClick={() => setPhotosView('grid')}
                          startIcon={<AppsIcon />}
                          $isActive={photosView === 'grid'}
                        >
                          Grid
                        </PhotosViewButton>
                      </Grid>
                      <Grid item xs={7} md={6}>
                        <PhotosViewButton
                          fullWidth
                          onClick={() => setPhotosView('list')}
                          startIcon={<ListIcon />}
                          $isActive={photosView === 'list'}
                        >
                          List
                        </PhotosViewButton>
                      </Grid>
                    </Grid>
                  </Grid>
                )}
                <Grid item>
                  <IconButton>
                    <MoreVertIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <PhotosContainer
            columnSpacing={photosView === 'grid' ? 2 : 0}
            container
            rowSpacing={3}
            tw='pl-4'
            $isCentered={selectedPhotoAlbum && photosView === 'list'}
          >
            {selectedPhotoAlbum && (
              <>
                {photoList && (
                  <ImageUploading
                    multiple
                    onChange={photoListData => handlePhotoUploadingChange(photoListData, dispatch)}
                    value={photoList}
                  >
                    {({ onImageUpload }) => (
                      <Grid
                        item
                        onClick={onImageUpload}
                        xs={photosView === 'list' ? 12 : 6}
                        sm={photosView === 'list' ? 12 : 4}
                        md={photosView === 'list' ? 10 : 3}
                        lg={photosView === 'list' ? 8 : 2}
                        xl={photosView === 'list' ? 6 : 1}
                      >
                        <PhotoAlbumsAddTextContainer
                          container
                          $photosView={photosView}
                          justifyContent={photosView === 'list' ? 'center' : 'flex-start'}
                        >
                          <Typography
                            variant='subtitle2'
                            textAlign={photosView === 'list' ? 'center' : 'start'}
                          >
                            Add to album <AddAPhotoTwoToneIcon />
                          </Typography>
                        </PhotoAlbumsAddTextContainer>
                      </Grid>
                    )}
                  </ImageUploading>
                )}
                {selectedPhotoAlbum.photos?.map(photoListItem => (
                  <Grid
                    item
                    xs={photosView === 'list' ? 12 : 6}
                    sm={photosView === 'list' ? 12 : 4}
                    md={photosView === 'list' ? 12 : 3}
                    lg={photosView === 'list' ? 12 : 2}
                    xl={photosView === 'list' ? 12 : 1}
                    tw='flex justify-center'
                  >
                    <PhotoCover
                      key={photoListItem._id}
                      photoListItem={photoListItem}
                      photoURL={photoListItem.url}
                      photosView={photosView}
                    />
                  </Grid>
                ))}
              </>
            )}
            {!selectedPhotoAlbum &&
              photoListData?.map(
                photoListItem =>
                  !!photoListItem?.photos?.length && (
                    <Grid item xs={6} sm={4} md={3} lg={2} xl={1}>
                      <Grid container style={{ height: '80%' }}>
                        <PhotoCover
                          key={photoListItem.albumName}
                          photoListItem={photoListItem}
                          photoTitle={photoListItem.albumName}
                          photoURL={photoListItem.photos[0].url}
                          photosView={!selectedPhotoAlbum ? 'grid' : photosView}
                        />
                      </Grid>

                      <Typography variant='subtitle1'>{photoListItem.albumName}</Typography>
                      <Typography variant='subtitle2'>{`${photoListItem.photos.length} photo${photoListItem.photos.length > 1 ? 's' : ''}`}</Typography>
                    </Grid>
                  ),
              )}
          </PhotosContainer>
        </Grid>
      </PhotosMainContainer>
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

export const PhotosMainContainer = styled(Grid)([tw`bg-gray-100`, tw`p-4`, tw`rounded-2xl`]);

export const PhotoAlbumsAddTextContainer = styled(Grid)<{ $photosView: 'grid' | 'list' }>(
  ({ $photosView }) => [
    tw`bg-gray-200`,
    tw`cursor-pointer`,
    tw`h-full`,
    tw`hover:opacity-80`,
    tw`rounded-2xl`,
    $photosView === 'grid' && tw`pt-3`,
    $photosView === 'grid' && tw`pl-3`,
    $photosView === 'list' && tw`pt-6`,
    $photosView === 'list' && tw`pb-6`,
  ],
);

export const PhotosViewButton = styled(Button)<{
  $isActive: boolean;
}>(({ $isActive }) => [
  tw`hover:bg-gray-200`,
  tw`bg-gray-300`,
  tw`opacity-60`,
  tw`text-gray-800`,
  tw`normal-case`,
  $isActive && tw`bg-purple-600`,
  $isActive && tw`hover:bg-purple-500`,
  $isActive && tw`hover:text-purple-200`,
  $isActive && tw`text-purple-200`,
]);

export const PhotosContainer = styled(Grid)<{ $isCentered: boolean | undefined }>(
  ({ $isCentered }) => [$isCentered && tw`justify-center`],
);

