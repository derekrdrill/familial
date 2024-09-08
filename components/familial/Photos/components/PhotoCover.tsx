import React from 'react';
import styled from '@emotion/styled';
import tw from 'twin.macro';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Button, CircularProgress, Grid, TextField, Typography } from '@mui/material';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteForever from '@mui/icons-material/DeleteForever';

import GlobalContext from '../../../../context/GlobalContext';
import { Photos } from '../../../../types';
import { GlobalReducerActionEnum } from '../../../../context/GlobalReducer';

type PhotoCoverProps = {
  photoListItem: {
    _id?: string;
    authorId?: string;
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
    state: { albums, photosView, user },
  } = React.useContext(GlobalContext);

  const [isPhotoLoading, setIsPhotoLoading] = React.useState<boolean>(true);
  const [isUserAuthor, setIsUserAuthor] = React.useState<boolean>(false);

  React.useEffect(() => {
    dispatch({
      type: GlobalReducerActionEnum.SET_PHOTOS_VIEW,
      payload: { photosView: 'grid' },
    });
  }, []);

  React.useEffect(() => {
    if (user?.userID) {
      setIsUserAuthor(user?.userID === photoListItem.authorId);
    }
  }, [user]);

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
      $isUserAuthor={isUserAuthor}
    >
      {isPhotoLoading && <CircularProgress tw='z-10 relative top-14 left-5' />}
      <PhotoCoverImageControlButtonDiv>
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
          $isUserAuthor={isUserAuthor}
          $isLoading={isPhotoLoading}
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
                      const newPhotoTitle = (document.getElementById('album') as HTMLInputElement)
                        ?.value;

                      await fetch('/api/photo/update', {
                        method: 'PUT',
                        body: JSON.stringify({
                          photoID: photoListItem._id,
                          newPhotoTitle: newPhotoTitle,
                        }),
                      }).catch(e => {
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
                        .then(async res => {
                          const albumResponse = await res.json();
                          const newAlbums = albums?.map((album, albumKey) => ({
                            ...album,
                            ...{ albumName: albumResponse[albumKey].albumName },
                          }));

                          dispatch({
                            type: GlobalReducerActionEnum.SET_ALBUMS,
                            payload: {
                              albums: newAlbums,
                            },
                          });
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
          $isUserAuthor={isUserAuthor}
          $isLoading={isPhotoLoading}
        >
          <EditTwoToneIcon />
        </PhotoCoverImageControlButton>
      </PhotoCoverImageControlButtonDiv>
      <PhotoCoverImage
        alt='album-cover'
        height={0}
        onLoad={() => setIsPhotoLoading(false)}
        sizes='100vw'
        src={photoURL}
        width={0}
        $isAlbumsPage={!router.pathname.includes('[albumID]')}
        $isLoading={isPhotoLoading}
        $photosView={photosView}
      />
    </PhotoCoverRoot>
  );
};

export const PhotoCoverRoot = styled.div<{ $isLoading?: boolean; $isUserAuthor?: boolean }>(
  ({ $isLoading, $isUserAuthor }) => [
    tw`sm:pl-2`,
    tw`py-2`,
    tw`w-full`,
    tw`cursor-pointer`,
    {
      ':hover': {
        button: $isUserAuthor && !$isLoading && [tw`visible`],
      },
      button: [tw`invisible`],
    },
  ],
);

export const PhotoCoverImage = styled(Image)<{
  $isAlbumsPage?: boolean;
  $isLoading: boolean;
  $photosView?: 'grid' | 'list';
}>(({ $isAlbumsPage, $isLoading, $photosView }) => [
  !$isAlbumsPage && $photosView === 'grid' && tw`h-full`,
  !$isAlbumsPage && $photosView === 'grid' && tw`sm:h-96`,
  !$isAlbumsPage && $photosView === 'grid' && tw`lg:h-60`,
  !$isAlbumsPage && $photosView === 'grid' && tw`xl:h-48`,
  $isAlbumsPage && $photosView === 'grid' && tw`h-40`,
  $isAlbumsPage && $photosView === 'grid' && tw`md:h-48`,
  $photosView === 'grid' && tw`-mt-9`,
  $photosView === 'grid' && tw`object-cover`,
  $photosView === 'grid' && tw`w-full`,
  $photosView === 'list' && tw`h-full`,
  $photosView === 'list' && tw`w-fit`,
  $photosView === 'list' && tw`inline-block`,
  $photosView === 'list' && tw`-translate-y-10`,
  tw`cursor-pointer`,
  tw`rounded-2xl`,
  {
    overflowClipMargin: 'unset',
  },
]);

export const PhotoCoverImageControlButtonDiv = styled.div([tw`relative`, tw`mx-2`, tw`z-10`]);

export const PhotoCoverImageControlButton = styled(Button)<{
  $isDelete?: boolean;
  $isEdit?: boolean;
  $isLoading?: boolean;
  $isUserAuthor?: boolean;
}>(({ $isDelete, $isEdit, $isLoading, $isUserAuthor }) => [
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
  ($isLoading || $isUserAuthor) && tw`invisible`,
]);


