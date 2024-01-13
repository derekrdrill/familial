import React from 'react';
import styled from '@emotion/styled';
import tw from 'twin.macro';
import { Button, Grid, Typography } from '@mui/material';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';

type PhotoUploaderUploadAreaProps = {
  dragProps: {
    onDrop: (e: any) => void;
    onDragEnter: (e: any) => void;
    onDragLeave: (e: any) => void;
    onDragOver: (e: any) => void;
    onDragStart: (e: any) => void;
  };
  isDragging: boolean;
  onImageUpload: () => void;
};

export const PhotoUploaderUploadArea = ({
  dragProps,
  isDragging,
  onImageUpload,
}: PhotoUploaderUploadAreaProps) => (
  <PhotoUploadAreaRoot
    container
    style={{
      backgroundColor: isDragging ? '#ddebe4' : 'inherit',
    }}
    {...dragProps}
  >
    <Grid container justifyContent='center' tw='m-4'>
      <DriveFolderUploadIcon />
      <Grid container justifyContent='center' tw='my-4'>
        <Typography color='#B3B3B3' typography='h6' variant='caption'>
          Drag and drop files here
        </Typography>
      </Grid>
      <Grid container>
        <Grid item xs={12} sm={2} />
        <Grid item xs={5} sm={3} tw='pt-2'>
          <hr />
        </Grid>
        <Grid item xs={2}>
          <Grid container justifyContent='center'>
            <Typography typography='body2' variant='caption'>
              OR
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={5} sm={3} tw='pt-2'>
          <hr />
        </Grid>
        <Grid item xs={12} sm={2} />
      </Grid>
      <Button color='info' onClick={onImageUpload} size='small' variant='outlined' tw='my-4'>
        Click here to browse files
      </Button>
    </Grid>
  </PhotoUploadAreaRoot>
);

export const PhotoUploadAreaRoot = styled(Grid)([
  tw`border-2`,
  tw`border-dashed`,
  tw`max-h-72`,
  tw`mx-20`,
  tw`my-6`,
  tw`p-8`,
]);
