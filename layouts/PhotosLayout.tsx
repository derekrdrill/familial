import React from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import tw from 'twin.macro';
import { Button, Grid, TextField, Typography } from '@mui/material';
import AppsIcon from '@mui/icons-material/Apps';
import ListIcon from '@mui/icons-material/List';
import PhotoSizeSelectActualTwoToneIcon from '@mui/icons-material/PhotoSizeSelectActualTwoTone';

import GlobalContext from '../context/GlobalContext';

import PhotoUploader from '../components/common/PhotoUploader';
import { PhotoAlbumsBackButton, PhotoViewer } from '../components/drill-y/Photos';
import { Albums, Photos } from '../context/types';
import { GlobalReducerActionEnum } from '../context/GlobalReducer';

type PhotosLayoutProps = {
  albumsData: Albums[];
  children: React.ReactNode;
  photosData: Photos[];
  photosLayoutTitle: string;
  photoAlbumLength?: number;
};

const PhotosLayout = ({
  albumsData,
  children,
  photoAlbumLength,
  photosData,
  photosLayoutTitle,
}: PhotosLayoutProps) => {
  const router = useRouter();

  const {
    dispatch,
    state: { photosView },
  } = React.useContext(GlobalContext);

  React.useEffect(() => {
    dispatch({ type: GlobalReducerActionEnum.SET_ALBUMS, payload: { albums: albumsData } });
  }, [albumsData]);

  React.useEffect(() => {
    dispatch({ type: GlobalReducerActionEnum.SET_PHOTOS, payload: { photos: photosData } });
  }, [photosData]);

  return (
    <>
      <PhotoUploader />
      <PhotoViewer
        isPhotoViewerOpen={!!router.query.p}
        photoTitle={photosData?.find(photo => photo._id === router.query.p)?.title}
        photoURL={photosData?.find(photo => photo._id === router.query.p)?.url}
      />
      <PhotoAlbumsBackButton />
      <PhotosMainContainer>
        <Grid item xs={12}>
          <Grid container justifyContent='space-between'>
            <Grid item>
              <Typography variant='h5'>{photosLayoutTitle}</Typography>
              {photoAlbumLength && (
                <Typography variant='subtitle1'>{`${photoAlbumLength} photo${photoAlbumLength === 1 ? '' : 's'}`}</Typography>
              )}
            </Grid>
            {!photoAlbumLength && (
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

                          await fetch('/api/album/add', {
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
                        submitSuccessMessage: (
                          <>
                            <Typography component='h1' variant='subtitle1'>
                              New album added!
                            </Typography>
                            <Typography component='h2' variant='subtitle2'>
                              Album will not appear here until photos are added
                            </Typography>
                          </>
                        ),
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
            {photoAlbumLength && (
              <Grid item>
                <Grid container spacing={1} justifyContent='flex-end'>
                  <Grid item xs={7} md={6}>
                    <PhotosViewButton
                      fullWidth
                      onClick={() =>
                        dispatch({
                          type: GlobalReducerActionEnum.SET_PHOTOS_VIEW,
                          payload: { photosView: 'grid' },
                        })
                      }
                      startIcon={<AppsIcon />}
                      $isActive={photosView === 'grid'}
                    >
                      Grid
                    </PhotosViewButton>
                  </Grid>
                  <Grid item xs={7} md={6}>
                    <PhotosViewButton
                      fullWidth
                      onClick={() =>
                        dispatch({
                          type: GlobalReducerActionEnum.SET_PHOTOS_VIEW,
                          payload: { photosView: 'list' },
                        })
                      }
                      startIcon={<ListIcon />}
                      $isActive={photosView === 'list'}
                    >
                      List
                    </PhotosViewButton>
                  </Grid>
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>
        {children}
      </PhotosMainContainer>
    </>
  );
};

export default PhotosLayout;

export const PhotosMainContainer = styled(Grid)([
  tw`bg-gray-100`,
  tw`mx-2`,
  tw`md:mx-8`,
  tw`p-4`,
  tw`rounded-2xl`,
  tw`w-full`,
]);

export const PhotosViewButton = styled(Button)<{
  $isActive?: boolean;
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
