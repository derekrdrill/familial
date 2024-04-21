import React from 'react';
import styled from '@emotion/styled';
import tw from 'twin.macro';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Button, CircularProgress, Grid, TextField, Typography } from '@mui/material';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteForever from '@mui/icons-material/DeleteForever';

import GlobalContext from '../../../../context/GlobalContext';
import { Photos } from '../../../../context/types';
import { GlobalReducerActionEnum } from '../../../../context/GlobalReducer';

type PhotoCoverProps = {
  photoListItem: {
    _id?: string;
    albumName?: string;
    photos?: Photos[] | undefined;
    title?: string;
    url?: string;
  };
  photoURL: string;
};

export const PhotoCover = ({ photoListItem, photoURL }: PhotoCoverProps) => {
  const router = useRouter();

  const {
    dispatch,
    state: { photosView },
  } = React.useContext(GlobalContext);

  const [isPhotoLoading, setIsPhotoLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    dispatch({ type: GlobalReducerActionEnum.SET_PHOTOS_VIEW, payload: { photosView: 'grid' } });
  }, []);

  return (
    <PhotoCoverRoot
      onClick={() => {
        router.push({
          pathname: router.query.albumID
            ? `/photos/${router.query.albumID}`
            : `/photos/${photoListItem._id}`,
          ...(router.query.albumID && { query: { p: photoListItem._id } }),
        });
      }}
    >
      {isPhotoLoading && <CircularProgress tw='z-10 relative top-14 left-5' />}
      <div tw='relative mx-2 translate-y-10 z-10'>
        <PhotoCoverImageControlButton
          color='inherit'
          onClick={e => {
            e.stopPropagation();
            dispatch({
              type: GlobalReducerActionEnum.SET_MODAL_ITEM,
              payload: {
                modalItem: {
                  handleSubmit: async () => {
                    if (!!router.query.albumID) {
                      await fetch('/api/photo/delete', {
                        method: 'DELETE',
                        body: JSON.stringify(photoListItem),
                      })
                        .then(async res => {
                          const newPhotos = await res.json();

                          dispatch({
                            type: GlobalReducerActionEnum.SET_PHOTOS,
                            payload: { photos: newPhotos },
                          });
                        })
                        .then(() => router.reload())
                        .catch(e => {
                          console.log(e);
                        });
                    } else {
                      await fetch('/api/album/delete', {
                        method: 'DELETE',
                        body: photoListItem.albumName,
                      })
                        .then(async res => {
                          const newAlbums = await res.json();

                          dispatch({
                            type: GlobalReducerActionEnum.SET_ALBUMS,
                            payload: { albums: newAlbums },
                          });
                        })
                        .then(() => router.reload())
                        .catch(e => {
                          console.log(e);
                        });
                    }
                  },
                  isExitHidden: true,
                  isModalOpen: true,
                  modalBody: (
                    <>
                      <Typography variant='h6' component='p'>
                        {`Are you sure you want to delete ${router.query.albumID ? `this photo from the ${photoListItem.albumName}` : `the ${photoListItem.albumName}`} album?`}
                      </Typography>
                      {router.query.albumID ? (
                        <Grid container>
                          <Grid item xs={1} />
                          <Grid item xs={10}>
                            <Grid container justifyContent='center'>
                              <img src={photoListItem.url} width='120' />
                            </Grid>
                          </Grid>
                          <Grid item xs={1} />
                        </Grid>
                      ) : (
                        <Typography tw='mt-2' component='p' variant='body1'>
                          Removing the album will delete all photos in the album
                        </Typography>
                      )}
                    </>
                  ),
                  modalTitle: '',
                  submitButtonColor: 'error',
                  submitButtonText: 'Delete',
                  submitSuccessMessage: `${router.query.albumID ? 'The photo' : photoListItem.albumName} has been deleted`,
                },
              },
            });
          }}
          variant='outlined'
          $isDelete
        >
          <DeleteForever />
        </PhotoCoverImageControlButton>
        <PhotoCoverImageControlButton
          color='inherit'
          onClick={e => {
            e.stopPropagation();
            dispatch({
              type: GlobalReducerActionEnum.SET_MODAL_ITEM,
              payload: {
                modalItem: {
                  handleSubmit: async () => {
                    if (!!router.query.albumID) {
                      await fetch('/api/photo/delete', {
                        method: 'DELETE',
                        body: JSON.stringify(photoListItem),
                      })
                        .then(async res => {
                          router.reload();
                        })
                        .catch(e => {
                          console.log(e);
                        });
                    } else {
                      const newAlbumName = (document.getElementById('album') as HTMLInputElement)
                        ?.value;

                      await fetch('/api/album/update', {
                        method: 'PUT',
                        body: JSON.stringify({
                          currentAlbumName: photoListItem.albumName,
                          newAlbumName: newAlbumName,
                        }),
                      })
                        .then(async () => {
                          router.reload();
                        })
                        .catch(e => {
                          console.log(e);
                        });
                    }
                  },
                  isExitHidden: true,
                  isModalOpen: true,
                  modalBody: (
                    <>
                      <Typography component='h1' variant='h6'>
                        Update the title
                      </Typography>
                      <TextField
                        id='album'
                        defaultValue={
                          router.query.albumID ? photoListItem.title : photoListItem.albumName
                        }
                        fullWidth
                      />
                    </>
                  ),
                  modalTitle: '',
                  submitButtonColor: 'info',
                  submitButtonText: 'Update',
                  // submitSuccessMessage: `${router.query.albumID ? 'The photo' : photoListItem.albumName} has been updated`,
                },
              },
            });
          }}
          variant='outlined'
          $isEdit
        >
          <EditTwoToneIcon />
        </PhotoCoverImageControlButton>
      </div>
      <PhotoCoverImage
        alt='album-cover'
        height={0}
        onLoad={() => setIsPhotoLoading(false)}
        sizes='100vw'
        src={photoURL}
        width={0}
        $isLoading={isPhotoLoading}
        $photosView={photosView}
      />
    </PhotoCoverRoot>
  );
};

export const PhotoCoverRoot = styled.div([
  tw`p-2`,
  tw`w-full`,
  tw`cursor-pointer`,
  {
    ':hover': {
      button: [tw`visible`],
    },
    button: [tw`invisible`],
  },
]);

export const PhotoCoverImage = styled(Image)<{
  $isLoading: boolean;
  $photosView?: 'grid' | 'list';
}>(({ $isLoading, $photosView }) => [
  tw`cursor-pointer`,
  tw`rounded-2xl`,
  !$isLoading && tw`border-2`,
  !$isLoading && tw`border-gray-100`,
  !$isLoading && tw`border-solid`,
  $photosView === 'grid' && tw`h-40`,
  $photosView === 'grid' && tw`md:h-48`,
  $photosView === 'grid' && tw`object-cover`,
  $photosView === 'grid' && tw`w-full`,
  $photosView === 'list' && tw`h-full`,
  $photosView === 'list' && tw`w-fit`,
  $photosView === 'list' && tw`inline-block`,
]);

export const PhotoCoverImageControlButton = styled(Button)<{
  $isDelete?: boolean;
  $isEdit?: boolean;
}>(({ $isDelete, $isEdit }) => [
  {
    maxWidth: '30px',
    maxHeight: '30px',
    minWidth: '30px',
    minHeight: '30px',
  },
  $isDelete && tw`text-red-600`,
  $isDelete && tw`bg-red-200`,
  $isDelete && tw`hover:bg-red-300`,
  $isEdit && tw`text-blue-500`,
  $isEdit && tw`bg-blue-200`,
  $isEdit && tw`hover:bg-blue-300`,
]);


