import React from 'react';
import styled from '@emotion/styled';
import tw from 'twin.macro';
import { Button, Grid, MenuItem, TextField, Typography } from '@mui/material';
import { ImageListType as PhotoListType } from 'react-images-uploading';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import GlobalContext from '../../../../context/GlobalContext';
import { PhotoUploadData } from '../types/PhotoUploaderData';

type PhotoUploaderPhotosListMobileProps = {
  handleInputChange: Function;
  onImageRemove: Function;
  photoList: PhotoListType;
  photoUploadData: PhotoUploadData[];
};

export const PhotoUploaderPhotosListMobile = ({
  handleInputChange,
  onImageRemove,
  photoList,
  photoUploadData,
}: PhotoUploaderPhotosListMobileProps) => {
  const {
    state: { albums },
  } = React.useContext(GlobalContext);

  return (
    <Grid container display={{ xs: 'inline-block', md: 'none' }}>
      {photoList.map((image, imageIndex) => (
        <Grid key={image.file?.name} item xs={12}>
          <PhotoUploadPhotosListItemMobileGrid
            key={`${image.file?.name} ${image.file?.lastModified}`}
            container
          >
            <Grid item xs={10} tw='mb-4'>
              <img src={image['dataURL']} width='150' />
            </Grid>
            <Grid item xs={2}>
              <Button color='error' fullWidth onClick={() => onImageRemove(imageIndex)}>
                <HighlightOffIcon />
              </Button>
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
                  <MenuItem>
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
