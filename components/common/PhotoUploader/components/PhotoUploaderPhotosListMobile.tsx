import React from 'react';
import styled from '@emotion/styled';
import tw from 'twin.macro';
import { Button, Checkbox, Grid, MenuItem, TextField, Typography } from '@mui/material';
import { ImageListType as PhotoListType } from 'react-images-uploading';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import GlobalContext from '../../../../context/GlobalContext';
import { GlobalReducerActionEnum } from '../../../../context/GlobalReducer';

import { PhotoUploadData } from '../types/PhotoUploaderData';

type PhotoUploaderPhotosListMobileProps = {
  handleInputChange: Function;
  onImageRemove: Function;
  photoList: PhotoListType;
  photoUploadData: PhotoUploadData[];
  setPhotoList: React.Dispatch<React.SetStateAction<PhotoListType>>;
  setPhotoUploadData: React.Dispatch<React.SetStateAction<PhotoUploadData[]>>;
};

export const PhotoUploaderPhotosListMobile = ({
  handleInputChange,
  onImageRemove,
  photoList,
  photoUploadData,
  setPhotoList,
  setPhotoUploadData,
}: PhotoUploaderPhotosListMobileProps) => {
  const {
    state: { albums },
    dispatch,
  } = React.useContext(GlobalContext);

  return (
    <Grid container display={{ xs: 'inline-block', md: 'none' }}>
      {photoList.map((image, imageIndex) => (
        <Grid key={image.file?.name} item xs={12}>
          <PhotoUploadPhotosListItemMobileGrid
            key={`${image.file?.name} ${image.file?.lastModified}`}
            container
          >
            <Grid item xs={11} tw='mb-4'>
              <img src={image['dataURL']} width='150' />
            </Grid>
            <Grid item xs={1}>
              <Grid container justifyContent='center'>
                <Checkbox
                  checked={!!photoList[imageIndex].checked}
                  onChange={() =>
                    setPhotoList(
                      photoList.map((imageCheck, imageCheckIndex) =>
                        imageCheckIndex === imageIndex
                          ? { ...imageCheck, ...{ checked: !imageCheck.checked } }
                          : imageCheck,
                      ),
                    )
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
                          modalTitle: 'Are you sure you want to remove this image?',
                          submitButtonColor: 'error',
                          submitButtonText: 'Remove',
                        },
                      },
                    })
                  }
                >
                  <HighlightOffIcon />
                </Button>
              </Grid>
            </Grid>
            <Grid container rowSpacing={1}>
              <Grid item xs={12}>
                <TextField
                  id='title'
                  fullWidth
                  label='Title'
                  onChange={e => handleInputChange(e, image.dataURL, imageIndex)}
                  size='small'
                  variant='outlined'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label='Album'
                  select
                  size='small'
                  onChange={e => handleInputChange(e, image.dataURL, imageIndex)}
                  value={photoUploadData[imageIndex]?.albumName ?? ''}
                  variant='outlined'
                  tw='my-1'
                >
                  {albums?.map(album => (
                    <MenuItem key={album._id} id='albumName' value={album.albumName}>
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
                                document.getElementById('album') as HTMLInputElement
                              )?.value;
                              // const isNewAlbumNameInCurrentAlbums = albums?.some(
                              //   album => album.albumName === newAlbumName,
                              // );

                              // if (isNewAlbumNameInCurrentAlbums) {
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

                                  setPhotoUploadData(
                                    photoUploadData.map((photoUpload, photoUploadIndex) =>
                                      photoUploadIndex === imageIndex
                                        ? {
                                            ...photoUpload,
                                            ...{
                                              albumName: newAlbumName,
                                            },
                                          }
                                        : photoUpload,
                                    ),
                                  );
                                })
                                .catch(e => {
                                  console.log(e);
                                });
                              // }
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
                  >
                    <Typography fontWeight='bold' variant='caption'>
                      Add album +
                    </Typography>
                  </MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id='description'
                  fullWidth
                  label='Description (Optional)'
                  maxRows={3}
                  minRows={3}
                  multiline
                  onChange={e => handleInputChange(e, image.dataURL, imageIndex)}
                  variant='outlined'
                  size='small'
                />
              </Grid>
            </Grid>
          </PhotoUploadPhotosListItemMobileGrid>
        </Grid>
      ))}
    </Grid>
  );
};

export const PhotoUploadPhotosListItemMobileGrid = styled(Grid)([
  tw`border-b-2`,
  tw`border-gray-100`,
  tw`p-8`,
]);
