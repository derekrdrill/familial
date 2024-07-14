import React from 'react';
import Slider from 'react-slick';
import tw from 'twin.macro';
import { Button, Checkbox, Grid, IconButton, MenuItem, TextField, Typography } from '@mui/material';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';

import GlobalContext from '../../../../context/GlobalContext';
import { GlobalReducerActionEnum } from '../../../../context/GlobalReducer';

import { DrillyTextField } from '../../../../styles/globals';

type PhotoUploaderPhotosListDesktopProps = {
  handleInputChange: Function;
  onImageRemove: Function;
};

export const PhotoUploaderPhotosListDesktop = ({
  handleInputChange,
  onImageRemove,
}: PhotoUploaderPhotosListDesktopProps) => {
  const {
    state: { albums, isDarkMode, photoList, photoUploadData, selectedPhotoAlbum },
    dispatch,
  } = React.useContext(GlobalContext);

  const photosSliderRef = React.useRef<Slider | null>(null);

  const handleNextSlide = () => photosSliderRef.current?.slickNext();
  const handlePrevSlide = () => photosSliderRef.current?.slickPrev();

  return (
    <Grid container>
      <Grid
        item
        xs={1}
        display={{
          xs: 'none',
          md:
            photoList?.length && photoList.length > 3 ? 'inline-block' : 'none',
        }}
      >
        <Grid
          container
          justifyContent='flex-end'
          display={
            photoList?.length && photoList.length > 4 ? 'inline-flex' : 'none'
          }
        >
          <IconButton onClick={handlePrevSlide} tw='mt-40'>
            <SkipPreviousIcon />
          </IconButton>
        </Grid>
      </Grid>
      <Grid item xs={12} md={photoList?.length && photoList.length > 3 && 10}>
        <Grid container display={{ xs: 'none', md: 'inline-block' }}>
          <Slider
            dots
            infinite={false}
            ref={photosSliderRef}
            slidesToShow={5}
            slidesToScroll={1}
          >
            {photoList?.map((image, imageIndex) => (
              <Grid key={image.file?.name} container tw='px-4'>
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
                <Grid item xs={12} tw='h-32 mb-3'>
                  <img
                    src={image['dataURL']}
                    tw='h-full object-cover'
                    width='120'
                  />
                </Grid>
                <DrillyTextField
                  id='title'
                  fullWidth
                  label='Title'
                  onChange={e =>
                    handleInputChange(e, image.dataURL, imageIndex)
                  }
                  size='small'
                  variant='outlined'
                  tw='my-1'
                  $isDarkMode={isDarkMode}
                />
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
                              // const isNewAlbumNameInCurrentAlbums = albums?.some(
                              //   album => album.albumName === newAlbumName,
                              // );
                              const newAlbumName = (
                                document.getElementById(
                                  'album',
                                ) as HTMLInputElement
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
                  Remove
                </Button>
              </Grid>
            ))}
          </Slider>
        </Grid>
      </Grid>
      <Grid
        item
        xs={1}
        display={{
          xs: 'none',
          md:
            photoList?.length && photoList.length > 3 ? 'inline-block' : 'none',
        }}
      >
        <Grid
          container
          display={
            photoList?.length && photoList.length > 4 ? 'inline-block' : 'none'
          }
        >
          <IconButton onClick={handleNextSlide} tw='mt-40'>
            <SkipNextIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  );
};
