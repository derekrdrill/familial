import React from 'react';
import styled from '@emotion/styled';
import tw from 'twin.macro';
import { Button, Grid, Typography } from '@mui/material';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';

import GlobalContext from '../../../../context/GlobalContext';

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
}: PhotoUploaderUploadAreaProps) => {
  const {
    state: { isDarkMode },
  } = React.useContext(GlobalContext);

  return (
    <PhotoUploadAreaRoot
      container
      onClick={onImageUpload}
      style={{
        backgroundColor: isDragging ? '#ddebe4' : 'inherit',
      }}
      $isDarkMode={isDarkMode}
      {...dragProps}
    >
      <Grid container justifyContent='center'>
        <Grid container display={{ xs: 'none', sm: 'inline-block' }}>
          <Grid container justifyContent='center' tw='mb-3'>
            <Typography color='#B3B3B3' typography='h6' variant='caption'>
              <PhotoUploadAreaIcon /> Drag and drop files here
            </Typography>
          </Grid>
          <Grid container>
            <Grid item xs={12} sm={2} />
            <Grid item xs={5} sm={3} tw='pt-2'>
              <hr />
            </Grid>
            <Grid item xs={2}>
              <Grid container justifyContent='center'>
                <Typography color='#B3B3B3' typography='body2' variant='caption'>
                  OR
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={5} sm={3} tw='pt-2'>
              <hr />
            </Grid>
            <Grid item xs={12} sm={2} />
          </Grid>
        </Grid>
        <Button color='info' size='small' variant='text' tw='my-4 normal-case'>
          <Typography variant='subtitle1'>Click here to add images</Typography>
        </Button>
      </Grid>
    </PhotoUploadAreaRoot>
  );
};

export const PhotoUploadAreaRoot = styled(Grid)<{ $isDarkMode?: boolean }>(
  ({ $isDarkMode }) => [
    $isDarkMode && tw`border-[0.5px]`,
    $isDarkMode && tw`!bg-gray-900`,
    $isDarkMode && tw`border-gray-700`,
    !$isDarkMode && tw`border-2`,
    tw`border-dashed`,
    tw`max-h-40`,
    tw`max-w-screen-2xl`,
    tw`mt-10`,
    tw`m-2`,
    tw`pb-4`,
    tw`pt-6`,
    tw`m-8`,
  ],
);

export const PhotoUploadAreaIcon = styled(DriveFolderUploadIcon)([tw`-translate-y-0.5`]);
