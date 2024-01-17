import React from 'react';
import styled from '@emotion/styled';
import { Button, Grid, Typography } from '@mui/material';
import { ImageListType as PhotoListType } from 'react-images-uploading';
import tw from 'twin.macro';

import GlobalContext from '../../../../context/GlobalContext';
import { GlobalReducerActionEnum } from '../../../../context/GlobalReducer';

import { PhotoUploadData } from '../types/PhotoUploaderData';

export const handlePhotoUpload = async (
  photoList: PhotoListType,
  photoUploadData: PhotoUploadData[],
  setPhotoList: React.Dispatch<React.SetStateAction<PhotoListType>>,
  setPhotoUploadData: React.Dispatch<React.SetStateAction<PhotoUploadData[]>>,
) => {
  photoList.forEach(async (photo, photoKey) => {
    await fetch('/api/photo-uploader/blob', {
      method: 'POST',
      headers: { 'content-type': photo.file?.type ?? 'application/octet-stream' },
      body: photo.file,
    }).then(async res => {
      if (res.status === 200) {
        const { url } = await res.json();

        await fetch('api/photo-uploader', {
          method: 'POST',
          body: JSON.stringify({ ...photoUploadData[photoKey], ...{ url: url } }),
        }).then(res => {
          if (res.status === 200) {
            setPhotoList([]);
            setPhotoUploadData([]);
          }
        });
      }
    });
  });
};

type PhotoUploaderActionButtonsProps = {
  isAbleToSubmitUpload: boolean;
  onImageRemoveAll: () => void;
  photoList: PhotoListType;
  photoUploadData: PhotoUploadData[];
  setPhotoList: React.Dispatch<React.SetStateAction<PhotoListType>>;
  setPhotoUploadData: React.Dispatch<React.SetStateAction<PhotoUploadData[]>>;
};

export const PhotoUploaderActionButtons = ({
  isAbleToSubmitUpload,
  onImageRemoveAll,
  photoList,
  photoUploadData,
  setPhotoList,
  setPhotoUploadData,
}: PhotoUploaderActionButtonsProps) => {
  const { dispatch } = React.useContext(GlobalContext);

  const hasEveryPhotosSelected = photoList.every(photo => photo.checked);
  const hasSomePhotosSelected = photoList.some(photo => photo.checked);

  return (
    !!photoList.length && (
      <PhotoUploadActionButtonsGrid
        container
        justifyContent='flex-end'
        sx={{ paddingTop: 2, paddingBottom: 2 }}
      >
        <Button
          color='info'
          onClick={() =>
            setPhotoList(
              photoList.map(photo => ({ ...photo, ...{ checked: !hasEveryPhotosSelected } })),
            )
          }
          size='small'
          variant='outlined'
          tw='mr-2'
        >
          {`${hasEveryPhotosSelected ? 'UN' : ''}CHECK ALL PHOTOS`}
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
                      : setPhotoList(photoList.filter(photo => !photo.checked)),
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
          tw='mr-2'
        >
          {`REMOVE ${hasEveryPhotosSelected ? 'ALL' : ''} PHOTOS`}
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
                    handlePhotoUpload(photoList, photoUploadData, setPhotoList, setPhotoUploadData),
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
          variant='outlined'
        >
          UPLOAD NEW PHOTOS
        </Button>
      </PhotoUploadActionButtonsGrid>
    )
  );
};

export const PhotoUploadActionButtonsGrid = styled(Grid)([
  tw`bg-white`,
  tw`sticky`,
  tw`top-12`,
  tw`z-[2]`,
]);
