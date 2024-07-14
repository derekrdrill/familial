import React from 'react';
import { Button, Checkbox, Grid, MenuItem, Typography } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import GlobalContext from '../../../../context/GlobalContext';
import { GlobalReducerActionEnum } from '../../../../context/GlobalReducer';

import { DrillyTextField } from '../../../../styles/globals';

type PhotoUploaderPhotosListMobileProps = {
  handleInputChange: Function;
  onImageRemove: Function;
};

export const PhotoUploaderPhotosListMobile = ({
  handleInputChange,
  onImageRemove,
}: PhotoUploaderPhotosListMobileProps) => {
  const {
    state: {
      albums,
      isDarkMode,
      photoList,
      photoUploadData,
      selectedPhotoAlbum,
    },
    dispatch,
  } = React.useContext(GlobalContext);

  return (
    <Grid container display={{ xs: 'inline-block', md: 'none' }}>
      {photoList?.map((image, imageIndex) => (
        <Grid key={image.file?.name} item xs={12}>
          <Grid
            key={`${image.file?.name} ${image.file?.lastModified}`}
            container
            tw='p-8'
          >
            <Grid item xs={11} tw='mb-4'>
              <img src={image['dataURL']} width='150' />
            </Grid>
            <Grid item xs={1}>
              <Grid container justifyContent='center'>
                <Checkbox
                  checked={!!photoList[imageIndex].checked}
                  onChange={() =>
                    dispatch({
                      type: GlobalReducerActionEnum.SET_PHOTO_LIST,
                      payload: {
                        photoList: photoList.map(
                          (imageCheck, imageCheckIndex) =>
                            imageCheckIndex === imageIndex
                              ? {
                                  ...imageCheck,
                                  ...{ checked: !imageCheck.checked },
                                }
                              : imageCheck,
                        ),
                      },
                    })
                  }
                />
                <Button
                  color='error'
                  fullWidth
                  onClick={() =>
                    dispatch({
                      type: GlobalReducerActionEnum.SET_MODAL_ITEM,
                      payload: {
                        modalItem: {
                          isExitHidden: true,
                          isModalOpen: true,
                          handleSubmit: () => onImageRemove(imageIndex),
                          modalBody: (
                            <Grid container>
                              <Grid item xs={2} />
                              <Grid item xs={8}>
                                <Grid container justifyContent='center'>
                                  <img src={image['dataURL']} width='120' />
                                </Grid>
                              </Grid>
                              <Grid item xs={2} />
                            </Grid>
                          ),
                          modalTitle:
                            'Are you sure you want to remove this image?',
                          submitButtonColor: 'error',
                          submitButtonText: 'Remove',
                        },
                      },
                    })
                  }
                  variant={isDarkMode ? 'outlined' : 'text'}
                >
                  <HighlightOffIcon />
                </Button>
              </Grid>
            </Grid>
            <Grid container rowSpacing={1}>
              <Grid item xs={12}>
                <DrillyTextField
                  id='title'
                  fullWidth
                  label='Title'
                  onChange={e =>
                    handleInputChange(e, image.dataURL, imageIndex)
                  }
                  size='small'
                  variant='outlined'
                  $isDarkMode={isDarkMode}
                />
              </Grid>
              <Grid item xs={12}>
                <DrillyTextField
                  fullWidth
                  label='Album'
                  select
                  size='small'
                  onChange={e =>
                    handleInputChange(e, image.dataURL, imageIndex)
                  }
                  value={
                    selectedPhotoAlbum?.albumName ??
                    (photoUploadData
                      ? photoUploadData[imageIndex]?.albumName
                      : '')
                  }
                  variant='outlined'
                  tw='my-1'
                  $isDarkMode={isDarkMode}
                >
                  {albums?.map(album => (
                    <MenuItem
                      key={album._id}
                      id='albumName'
                      value={album.albumName}
                    >
                      {album.albumName}
                    </MenuItem>
                  ))}
                  <MenuItem
                    onClick={() => {
                      dispatch({
                        type: GlobalReducerActionEnum.SET_MODAL_ITEM,
                        payload: {
                          modalItem: {
                            handleSubmit: async () => {
                              const newAlbumName = (
                                document.getElementById(
                                  'album',
                                ) as HTMLInputElement
                              )?.value;
                              // const isNewAlbumNameInCurrentAlbums = albums?.some(
                              //   album => album.albumName === newAlbumName,
                              // );

                              // if (isNewAlbumNameInCurrentAlbums) {
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

                                  dispatch({
                                    type: GlobalReducerActionEnum.SET_PHOTO_UPLOAD_DATA,
                                    payload: {
                                      photoUploadData: photoUploadData?.map(
                                        (photoUpload, photoUploadIndex) =>
                                          photoUploadIndex === imageIndex
                                            ? {
                                                ...photoUpload,
                                                ...{
                                                  albumName:
                                                    selectedPhotoAlbum?.albumName ??
                                                    newAlbumName,
                                                },
                                              }
                                            : photoUpload,
                                      ),
                                    },
                                  });
                                })
                                .catch(e => {
                                  console.log(e);
                                });
                              // }
                            },
                            isExitHidden: true,
                            isModalOpen: true,
                            modalBody: (
                              <DrillyTextField
                                id='album'
                                fullWidth
                                placeholder='Enter album name'
                                size='small'
                                variant='outlined'
                                $isDarkMode={isDarkMode}
                              />
                            ),
                            modalTitle: 'Add new album',
                            submitSuccessMessage: `New album has been added!`,
                          },
                        },
                      });
                    }}
                  >
                    <Typography fontWeight='bold' variant='caption'>
                      Add album +
                    </Typography>
                  </MenuItem>
                </DrillyTextField>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};
