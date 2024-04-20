import React from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { Button, Grid, Typography } from '@mui/material';
import { ImageListType as PhotoListType } from 'react-images-uploading';
import tw from 'twin.macro';

import GlobalContext from '../../../../context/GlobalContext';
import { GlobalReducerAction, GlobalReducerActionEnum } from '../../../../context/GlobalReducer';

import { PhotoUploadData } from '../types/PhotoUploaderData';

export const handlePhotoUpload = async (
  photoList: PhotoListType,
  photoUploadData: PhotoUploadData[] | undefined,
  dispatch: React.Dispatch<GlobalReducerAction>,
) => {
  photoList.forEach(async (photo, photoKey) => {
    await fetch('/api/photo-uploader/blob', {
      method: 'POST',
      headers: { 'content-type': photo.file?.type ?? 'application/octet-stream' },
      body: photo.file,
    }).then(async res => {
      if (res.status === 200) {
        const { url } = await res.json();

        if (photoUploadData) {
          await fetch('api/photo-uploader', {
            method: 'POST',
            body: JSON.stringify({ ...photoUploadData[photoKey], ...{ url: url } }),
          }).then(res => {
            if (res.status === 200) {
              dispatch({
                type: GlobalReducerActionEnum.SET_PHOTO_LIST,
                payload: { photoList: [] },
              });
              dispatch({
                type: GlobalReducerActionEnum.SET_PHOTO_UPLOAD_DATA,
                payload: { photoUploadData: [] },
              });
            }
          });
        }
      }
    });
  });
};

type PhotoUploaderActionButtonsProps = {
  isAbleToSubmitUpload: boolean;
  onImageRemoveAll: () => void;
};

export const PhotoUploaderActionButtons = ({
  isAbleToSubmitUpload,
  onImageRemoveAll,
}: PhotoUploaderActionButtonsProps) => {
  const router = useRouter();
  const {
    dispatch,
    state: { photoList, photoUploadData, selectedPhotoAlbum },
  } = React.useContext(GlobalContext);

  const hasEveryPhotosSelected = photoList?.every(photo => photo.checked);
  const hasSomePhotosSelected = photoList?.some(photo => photo.checked);

  return (
    !!photoList?.length && (
      <PhotoUploadActionButtonsContainer
        container
        sx={{ paddingTop: 2, paddingBottom: 2 }}
        $isPhotoAlbumSelected={!!selectedPhotoAlbum}
      >
        {!!selectedPhotoAlbum && (
          <Grid item>
            <Typography variant='h5'>
              Adding photo(s) to: <b>{selectedPhotoAlbum?.albumName}</b>
            </Typography>
          </Grid>
        )}
        <Grid item>
          <Button
            color='info'
            onClick={() =>
              dispatch({
                type: GlobalReducerActionEnum.SET_PHOTO_LIST,
                payload: {
                  photoList: photoList.map(photo => ({
                    ...photo,
                    ...{ checked: !hasEveryPhotosSelected },
                  })),
                },
              })
            }
            size='small'
            variant='outlined'
            tw='mr-2 normal-case'
          >
            {`${hasEveryPhotosSelected ? 'Unc' : 'C'}heck all photos`}
          </Button>
          <Button
            color='error'
            disabled={!hasSomePhotosSelected}
            onClick={() =>
              dispatch({
                type: GlobalReducerActionEnum.SET_MODAL_ITEM,
                payload: {
                  modalItem: {
                    isExitHidden: true,
                    isModalOpen: true,
                    handleSubmit: () =>
                      hasEveryPhotosSelected
                        ? onImageRemoveAll()
                        : dispatch({
                            type: GlobalReducerActionEnum.SET_PHOTO_LIST,
                            payload: {
                              photoList: photoList.filter(photo => !photo.checked),
                            },
                          }),
                    modalBody:
                      // (
                      //   <Grid container>
                      //     <Grid item xs={2} />
                      //     <Grid item xs={8}>
                      //       <Grid container justifyContent='center'>
                      //         <img src={image['dataURL']} width='120' />
                      //       </Grid>
                      //     </Grid>
                      //     <Grid item xs={2} />
                      //   </Grid>
                      // )
                      '',
                    modalTitle: 'Are you sure you want to remove the selected images?',
                    submitButtonColor: 'error',
                    submitButtonText: 'Remove',
                  },
                },
              })
            }
            size='small'
            variant='outlined'
            tw='mr-2 normal-case'
          >
            {`Remove ${hasEveryPhotosSelected ? 'all' : ''} photos`}
          </Button>
          <Button
            color='success'
            disabled={!isAbleToSubmitUpload}
            onClick={() =>
              dispatch({
                type: GlobalReducerActionEnum.SET_MODAL_ITEM,
                payload: {
                  modalItem: {
                    handleSubmit: async () =>
                      handlePhotoUpload(photoList, photoUploadData, dispatch),
                    isExitHidden: true,
                    isModalOpen: true,
                    modalBody: (
                      <Typography variant='body1'>
                        Submitting will post your new photos to drill-y!
                      </Typography>
                    ),
                    modalTitle: 'Confirm submit',
                    submitButtonLoadingDelay: 2000,
                    submitSuccessMessage: 'Photo upload complete!',
                  },
                },
              })
            }
            size='small'
            tw='normal-case'
            variant='outlined'
          >
            Upload new photos
          </Button>
        </Grid>
      </PhotoUploadActionButtonsContainer>
    )
  );
};

export const PhotoUploadActionButtonsContainer = styled(Grid)<{ $isPhotoAlbumSelected: boolean }>(
  ({ $isPhotoAlbumSelected }) => [
    tw`bg-white`,
    tw`sticky`,
    tw`top-12`,
    tw`z-[2]`,
    tw`justify-end`,
    $isPhotoAlbumSelected && tw`justify-between`,
  ],
);
