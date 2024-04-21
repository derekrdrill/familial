import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styled from '@emotion/styled';
import tw from 'twin.macro';
import { Button, IconButton, Modal, TextField, Typography } from '@mui/material';
import AddCommentIcon from '@mui/icons-material/AddComment';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';

import GlobalContext from '../../../../context/GlobalContext';

import { DrillyTypography } from '../../../../styles/globals';

type PhotoViewerTypes = {
  isPhotoViewerOpen: boolean;
  photoTitle?: string;
  photoURL?: string;
};

export const PhotoViewer = ({ isPhotoViewerOpen, photoTitle, photoURL }: PhotoViewerTypes) => {
  const router = useRouter();

  const {
    state: { isDarkMode },
  } = React.useContext(GlobalContext);

  return (
    <Modal open={isPhotoViewerOpen}>
      <>
        {photoURL && (
          <div tw='md:flex md:justify-between'>
            <div tw='bg-[#00000099] w-full md:w-3/4'>
              <div tw='flex justify-center mt-[6%]'>
                <div tw='absolute left-2 top-2'>
                  <Button
                    tw='mt-8 md:m-0'
                    color='secondary'
                    fullWidth
                    onClick={() => {
                      router.replace({
                        pathname: `/photos/${router.query.albumID}`,
                      });
                    }}
                    size='small'
                    variant='contained'
                    style={{
                      maxWidth: '30px',
                      maxHeight: '30px',
                      minWidth: '30px',
                      minHeight: '30px',
                    }}
                  >
                    <DrillyTypography variant='h5' $isDarkMode={isDarkMode}>
                      &#10539;
                    </DrillyTypography>
                  </Button>
                </div>
                <Image
                  tw='md:inline-block hidden'
                  alt='selected-image'
                  height={600}
                  src={photoURL}
                  width={600}
                />
                <Image
                  tw='inline-block md:hidden'
                  alt='selected-image'
                  height={300}
                  src={photoURL}
                  width={300}
                />
              </div>
            </div>
            <PhotoViewerActionsPanel $isDarkMode={isDarkMode}>
              <div tw='m-8'>
                <DrillyTypography variant='h5' $isDarkMode={isDarkMode}>
                  {photoTitle}
                </DrillyTypography>
                <div tw='flex'>
                  <IconButton color='info'>
                    <ThumbUpOffAltIcon />
                  </IconButton>
                  <IconButton color='error'>
                    <FavoriteBorderIcon />
                  </IconButton>
                  <IconButton color='secondary'>
                    <TagFacesIcon />
                  </IconButton>
                </div>
                <>
                  <PhotoViewerCommentInput
                    tw='mt-4'
                    fullWidth
                    multiline
                    placeholder='Leave a comment...'
                    rows={3}
                    $isDarkMode={isDarkMode}
                  />
                  <div tw='flex justify-end'>
                    <Button
                      style={{
                        maxWidth: '30px',
                        maxHeight: '30px',
                        minWidth: '20px',
                        minHeight: '30px',
                      }}
                    >
                      <AddCommentIcon />
                    </Button>
                  </div>
                </>
              </div>
            </PhotoViewerActionsPanel>
          </div>
        )}
      </>
    </Modal>
  );
};

export const PhotoViewerActionsPanel = styled.div<{ $isDarkMode?: boolean }>(({ $isDarkMode }) => [
  $isDarkMode && tw`bg-gray-900`,
  !$isDarkMode && tw`bg-white`,
  tw`h-screen`,
  tw`w-full`,
  tw`md:w-1/4`,
]);

export const PhotoViewerCommentInput = styled(TextField)<{ $isDarkMode?: boolean }>(
  ({ $isDarkMode }) => [
    {
      '.MuiInputBase-root': [$isDarkMode && tw`bg-gray-100`],
    },
  ],
);

