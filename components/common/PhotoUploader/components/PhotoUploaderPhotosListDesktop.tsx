import React from 'react';
import { ImageListType as PhotoListType } from 'react-images-uploading';
import Slider from 'react-slick';
import { Button, Grid, IconButton, MenuItem, TextField, Typography } from '@mui/material';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';

import GlobalContext from '../../../../context/GlobalContext';

import { PhotoUploadData } from '../types/PhotoUploaderData';

type PhotoUploaderPhotosListDesktopProps = {
  handleInputChange: Function;
  onImageRemove: Function;
  photoList: PhotoListType;
  photoUploadData: PhotoUploadData[];
};

export const PhotoUploaderPhotosListDesktop = ({
  handleInputChange,
  onImageRemove,
  photoList,
  photoUploadData,
}: PhotoUploaderPhotosListDesktopProps) => {
  const {
    state: { albums },
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
                  <MenuItem>
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
                <Button color='error' fullWidth onClick={() => onImageRemove(imageIndex)}>
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
