import React from 'react';
import styled from '@emotion/styled';
import { Button, Grid, Typography } from '@mui/material';
import { ImageListType as PhotoListType } from 'react-images-uploading';
import tw, { TwStyle } from 'twin.macro';

import GlobalContext from '../../../../context/GlobalContext';
import { GlobalReducerAction, GlobalReducerActionEnum } from '../../../../context/GlobalReducer';

import { DrillyTypography } from '../../../../styles/globals';
import { PhotoUploadData } from '../types/PhotoUploaderData';

export const handlePhotoUpload = async (
  photoList: PhotoListType,
  photoUploadData: PhotoUploadData[] | undefined,
  dispatch: React.Dispatch<GlobalReducerAction>,
) => {
  photoList.forEach(async (photo, photoKey) => {
    await fetch('/api/photo-uploader/blob', {
      method: 'POST',
      headers: {
        'content-type': photo.file?.type ?? 'application/octet-stream',
      },
      body: photo.file,
    }).then(async res => {
      if (res.status === 200) {
        const { url } = await res.json();

        if (photoUploadData) {
          await fetch('/api/photo-uploader', {
            method: 'POST',
            body: JSON.stringify({
              ...photoUploadData[photoKey],
              ...{ url: url },
            }),
          }).then(async res => {
            const photos = await res.json();

            if (res.status === 200) {
              dispatch({
                type: GlobalReducerActionEnum.SET_PHOTO_LIST,
                payload: { photoList: [] },
              });
              dispatch({
                type: GlobalReducerActionEnum.SET_PHOTO_UPLOAD_DATA,
                payload: { photoUploadData: [] },
              });
              dispatch({
                type: GlobalReducerActionEnum.SET_PHOTOS,
                payload: { photos: photos },
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
  const {
    dispatch,
    state: { isDarkMode, photoList, photoUploadData, selectedPhotoAlbum, photos },
  } = React.useContext(GlobalContext);

  const hasEveryPhotosSelected = photoList?.every(photo => photo.checked);
  const hasSomePhotosSelected = photoList?.some(photo => photo.checked);

  return (
    !!photoList?.length && (
      <PhotoUploadActionButtonsContainer
        container
        $isDarkMode={isDarkMode}
        $isPhotoAlbumSelected={!!selectedPhotoAlbum}
      >
        {!!selectedPhotoAlbum && (
          <Grid item tw='mb-2 lg:mb-0'>
            <DrillyTypography variant='h5' $isDarkMode={isDarkMode}>
              Adding photo(s) to: <b>{selectedPhotoAlbum?.albumName}</b>
            </DrillyTypography>
          </Grid>
        )}
        <Grid item>
          <PhotoUploadActionButton
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
            $bgColor={tw`bg-info hover:bg-info`}
            $borderColor={tw`border-info hover:border-info`}
            $textColor={tw`text-info`}
          >
            {`${hasEveryPhotosSelected ? 'Unc' : 'C'}heck all photos`}
          </PhotoUploadActionButton>
          <PhotoUploadActionButton
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
            $bgColor={tw`bg-error hover:bg-error`}
            $borderColor={tw`border-error hover:border-error`}
            $textColor={tw`text-error`}
            $isDisabled={!hasSomePhotosSelected}
          >
            {`Remove ${hasEveryPhotosSelected ? 'all' : ''} photos`}
          </PhotoUploadActionButton>
          <PhotoUploadActionButton
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
                        Submitting will post your new photos to familial!
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
            $bgColor={
              isDarkMode
                ? tw`bg-success-dark-mode hover:bg-success-dark-mode`
                : tw`bg-success hover:bg-success`
            }
            $borderColor={
              isDarkMode
                ? tw`border-success-dark-mode hover:border-success-dark-mode`
                : tw`border-success hover:border-success`
            }
            $isDisabled={!isAbleToSubmitUpload}
            $textColor={isDarkMode ? tw`text-success-dark-mode` : tw`text-success`}
          >
            Upload photos
          </PhotoUploadActionButton>
        </Grid>
      </PhotoUploadActionButtonsContainer>
    )
  );
};

export const PhotoUploadActionButtonsContainer = styled(Grid)<{
  $isDarkMode?: boolean;
  $isPhotoAlbumSelected: boolean;
}>(({ $isDarkMode, $isPhotoAlbumSelected }) => [
  tw`!sticky`,
  tw`justify-end`,
  tw`mt-4`,
  tw`pb-4`,
  tw`pt-4`,
  tw`px-6`,
  tw`top-20`,
  tw`z-10`,
  tw`lg:mt-8`,
  tw`lg:mx-0`,
  tw`lg:pt-2`,
  tw`lg:px-8`,
  tw`lg:top-[70px]`,
  !$isDarkMode && tw`bg-white`,
  $isDarkMode && tw`bg-black`,
  $isPhotoAlbumSelected && tw`justify-center`,
  $isPhotoAlbumSelected && tw`lg:justify-between`,
]);

export const PhotoUploadActionButton = styled(Button)<{
  $bgColor: TwStyle;
  $borderColor: TwStyle;
  $isDisabled?: boolean;
  $textColor: TwStyle;
}>(({ $bgColor, $borderColor, $isDisabled, $textColor }) => [
  $isDisabled && tw`!bg-gray-B6B6B6`,
  $isDisabled && tw`!border-gray-B6B6B6`,
  $isDisabled && tw`!text-gray-B6B6B6`,
  $isDisabled && tw`pointer-events-none`,
  tw`!bg-opacity-20`,
  tw`shadow-none`,
  tw`hover:!bg-opacity-30`,
  tw`hover:shadow-none`,
  $bgColor,
  $borderColor,
  $textColor,
]);
