import React from 'react';
import styled from '@emotion/styled';
import { Button, Grid, InputLabel, Typography } from '@mui/material';
import { ImageListType as PhotoListType } from 'react-images-uploading';
import tw, { TwStyle } from 'twin.macro';

import GlobalContext from '../../../../context/GlobalContext';
import { GlobalReducerAction, GlobalReducerActionEnum } from '../../../../context/GlobalReducer';

import { DrillyCheckbox, DrillyTypography } from '../../../../styles/globals';
import { PhotoUploadData } from '../types/PhotoUploaderData';

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const uploadPhotoWithRetry = async (
  photo: PhotoListType[0],
  photoUploadData: PhotoUploadData | undefined,
  dispatch: React.Dispatch<GlobalReducerAction>,
  retryCount = 0,
): Promise<boolean> => {
  try {
    // Upload to blob storage
    const blobResponse = await fetch('/api/photo-uploader/blob', {
      method: 'POST',
      headers: {
        'content-type': photo.file?.type ?? 'application/octet-stream',
      },
      body: photo.file,
    });

    if (!blobResponse.ok) {
      throw new Error(`Blob upload failed with status ${blobResponse.status}`);
    }

    const { url } = await blobResponse.json();

    if (!photoUploadData) {
      return true;
    }

    // Upload metadata to database
    const metadataResponse = await fetch('/api/photo-uploader', {
      method: 'POST',
      body: JSON.stringify({
        ...photoUploadData,
        ...{ url: url },
      }),
    });

    if (!metadataResponse.ok) {
      throw new Error(`Metadata upload failed with status ${metadataResponse.status}`);
    }

    return true;
  } catch (error) {
    console.error(`Upload attempt ${retryCount + 1} failed:`, error);

    if (retryCount < MAX_RETRIES) {
      await sleep(RETRY_DELAY * (retryCount + 1)); // Exponential backoff
      return uploadPhotoWithRetry(photo, photoUploadData, dispatch, retryCount + 1);
    }

    return false;
  }
};

export const handlePhotoUpload = async (
  photoList: PhotoListType,
  photoUploadData: PhotoUploadData[] | undefined,
  dispatch: React.Dispatch<GlobalReducerAction>,
) => {
  const totalPhotos = photoList.length;
  let successfulUploads = 0;
  let failedUploads = 0;

  // Process photos in parallel with a concurrency limit
  const uploadPromises = photoList.map(async (photo, photoKey) => {
    const success = await uploadPhotoWithRetry(photo, photoUploadData?.[photoKey], dispatch);

    if (success) {
      successfulUploads++;
    } else {
      failedUploads++;
    }

    // Update progress
    dispatch({
      type: GlobalReducerActionEnum.SET_UPLOAD_PROGRESS,
      payload: {
        uploadProgress: {
          progress: ((successfulUploads + failedUploads) / totalPhotos) * 100,
          successfulUploads,
          failedUploads,
        },
      },
    });
  });

  try {
    await Promise.all(uploadPromises);

    if (successfulUploads > 0) {
      // Only clear the photo list if we had some successful uploads
      dispatch({
        type: GlobalReducerActionEnum.SET_PHOTO_LIST,
        payload: { photoList: [] },
      });
      dispatch({
        type: GlobalReducerActionEnum.SET_PHOTO_UPLOAD_DATA,
        payload: { photoUploadData: [] },
      });

      // Fetch updated photos list
      const response = await fetch('/api/photo-uploader', {
        method: 'GET',
      });
      const photos = await response.json();

      dispatch({
        type: GlobalReducerActionEnum.SET_PHOTOS,
        payload: { photos },
      });
    }

    // Show appropriate message based on results
    if (failedUploads > 0) {
      dispatch({
        type: GlobalReducerActionEnum.SET_NOTIFICATION,
        payload: {
          notification: {
            message: `Uploaded ${successfulUploads} photos successfully. ${failedUploads} photos failed to upload.`,
            severity: 'warning',
          },
        },
      });
    } else {
      dispatch({
        type: GlobalReducerActionEnum.SET_NOTIFICATION,
        payload: {
          notification: {
            message: `Successfully uploaded ${successfulUploads} photos!`,
            severity: 'success',
          },
        },
      });
    }
  } catch (error) {
    console.error('Upload process failed:', error);
    dispatch({
      type: GlobalReducerActionEnum.SET_NOTIFICATION,
      payload: {
        notification: {
          message: 'Failed to upload photos. Please try again.',
          severity: 'error',
        },
      },
    });
  }
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
  const photosBeingUploaded = photoUploadData?.length;

  return (
    !!photoList?.length && (
      <PhotoUploadActionButtonsContainer
        container
        $isDarkMode={isDarkMode}
        $isPhotoAlbumSelected={!!selectedPhotoAlbum}
      >
        {!!selectedPhotoAlbum && (
          <Grid item tw='mb-2 lg:mb-0'>
            <DrillyTypography $isDarkMode={isDarkMode} tw='mt-auto'>
              Adding{' '}
              <DrillyTypography component='span' tw='font-semibold'>
                {photosBeingUploaded}
              </DrillyTypography>{' '}
              photo
              {photosBeingUploaded === 1 ? '' : 's'} to{' '}
              <DrillyTypography
                component='span'
                variant='h6'
                tw='font-semibold'
                $isDarkMode={isDarkMode}
              >
                {selectedPhotoAlbum?.albumName}
              </DrillyTypography>{' '}
              album
            </DrillyTypography>
          </Grid>
        )}
        <Grid item>
          <div tw='flex mb-2 md:justify-end'>
            <DrillyCheckbox
              checked={photoList.every(photo => !!photo.checked)}
              id='selectAllPhotos'
              onChange={() =>
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
              sx={{ padding: 0 }}
              $isDarkMode={isDarkMode}
            />
            <InputLabel htmlFor='selectAllPhotos'>
              <DrillyTypography $isDarkMode={isDarkMode}>
                {`${hasEveryPhotosSelected ? 'Unc' : 'C'}heck all photos`}
              </DrillyTypography>
            </InputLabel>
          </div>
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
  tw`mt-4`,
  tw`pb-4`,
  tw`px-6`,
  tw`z-10`,
  tw`lg:mt-8`,
  tw`lg:mx-0`,
  tw`lg:pt-2`,
  tw`lg:px-8`,
  tw`lg:top-[70px]`,
  !$isDarkMode && tw`bg-white`,
  $isDarkMode && tw`bg-[#282c34]`,
  !$isPhotoAlbumSelected && tw`md:justify-end`,
  $isPhotoAlbumSelected && tw`justify-between`,
  $isPhotoAlbumSelected && tw`top-[92px]`,
  !$isPhotoAlbumSelected && tw`top-[94px]`,
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
