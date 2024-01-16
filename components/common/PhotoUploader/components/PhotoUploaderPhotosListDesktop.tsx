import React from 'react';
import { ImageListType as PhotoListType } from 'react-images-uploading';
import Slider from 'react-slick';
import tw from 'twin.macro';
import { Button, Checkbox, Grid, IconButton, MenuItem, TextField, Typography } from '@mui/material';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';

import GlobalContext from '../../../../context/GlobalContext';
import { GlobalReducerActionEnum } from '../../../../context/GlobalReducer';

import { PhotoUploadData } from '../types/PhotoUploaderData';

type PhotoUploaderPhotosListDesktopProps = {
  handleInputChange: Function;
  onImageRemove: Function;
  photoList: PhotoListType;
  photoUploadData: PhotoUploadData[];
  setPhotoList: React.Dispatch<React.SetStateAction<PhotoListType>>;
  setPhotoUploadData: React.Dispatch<React.SetStateAction<PhotoUploadData[]>>;
};

export const PhotoUploaderPhotosListDesktop = ({
  handleInputChange,
  onImageRemove,
  photoList,
  photoUploadData,
  setPhotoList,
  setPhotoUploadData,
}: PhotoUploaderPhotosListDesktopProps) => {
  const {
    state: { albums },
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
        display={{ xs: 'none', md: photoList.length > 3 ? 'inline-block' : 'none' }}
      >
        <Grid
          container
          justifyContent='flex-end'
          display={photoList.length > 4 ? 'inline-flex' : 'none'}
        >
          <IconButton onClick={handlePrevSlide} tw='mt-40'>
            <SkipPreviousIcon />
          </IconButton>
        </Grid>
      </Grid>
      <Grid item xs={12} md={photoList.length > 3 && 10}>
        <Grid container display={{ xs: 'none', md: 'inline-block' }}>
          <Slider dots infinite={false} ref={photosSliderRef} slidesToShow={4} slidesToScroll={1}>
            {photoList.map((image, imageIndex) => (
              <Grid key={image.file?.name} container tw='px-4'>
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
                <Grid item xs={12} tw='h-32'>
                  <img src={image['dataURL']} width='120' />
                </Grid>
                <TextField
                  id='title'
                  fullWidth
                  label='Title'
                  onChange={e => handleInputChange(e, image.dataURL, imageIndex)}
                  size='small'
                  variant='outlined'
                  tw='my-1'
                />
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
                      const newAlbumName = (document.getElementById('album') as HTMLInputElement)
                        ?.value;

                      dispatch({
                        type: GlobalReducerActionEnum.SET_MODAL_ITEM,
                        payload: {
                          modalItem: {
                            handleSubmit: async () => {
                              const isNewAlbumNameInCurrentAlbums = albums?.some(
                                album => album.albumName === newAlbumName,
                              );

                              if (isNewAlbumNameInCurrentAlbums) {
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
                              }
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
                  tw='my-1'
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
        display={{ xs: 'none', md: photoList.length > 3 ? 'inline-block' : 'none' }}
      >
        <Grid container display={photoList.length > 4 ? 'inline-block' : 'none'}>
          <IconButton onClick={handleNextSlide} tw='mt-40'>
            <SkipNextIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  );
};
