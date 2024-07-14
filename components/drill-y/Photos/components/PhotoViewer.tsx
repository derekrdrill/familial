import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styled from '@emotion/styled';
import tw, { TwStyle } from 'twin.macro';
import { Button, IconButton, Modal, TextField } from '@mui/material';
import AddCommentIcon from '@mui/icons-material/AddComment';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';

import GlobalContext from '../../../../context/GlobalContext';

import { DrillyTypography } from '../../../../styles/globals';

type PhotoViewerTypes = {
  isPhotoViewerOpen: boolean;
  photoTitle?: string;
  photoURL?: string;
};

export const PhotoViewer = ({
  isPhotoViewerOpen,
  photoTitle,
  photoURL,
}: PhotoViewerTypes) => {
  const router = useRouter();

  const {
    state: { isDarkMode, isPhotoViewerBackBtnShown },
  } = React.useContext(GlobalContext);

  return (
    <Modal open={isPhotoViewerOpen}>
      <>
        {photoURL && (
          <div tw='md:flex md:justify-between'>
            <div tw='bg-[#00000099] w-full md:w-3/4'>
              <div tw='flex items-center justify-center md:h-screen'>
                <div tw='absolute flex flex-col gap-2 left-2 top-2'>
                  {isPhotoViewerBackBtnShown && (
                    <PhotoViewerButton
                      fullWidth
                      onClick={() => {
                        router.replace('/');
                      }}
                      size='small'
                      variant='outlined'
                      $bgColor={tw`bg-primary hover:bg-primary`}
                      $borderColor={tw`border-primary hover:border-primary`}
                    >
                      <span tw='py-1 md:py-0'>
                        <span tw='hidden md:inline-block'>Go back home</span>
                        <span tw='md:hidden'>
                          <KeyboardDoubleArrowLeftIcon />
                        </span>
                      </span>
                    </PhotoViewerButton>
                  )}
                  <PhotoViewerButton
                    fullWidth
                    onClick={() => {
                      router.replace({
                        pathname: `/photos/${router.query.albumID}`,
                      });
                    }}
                    size='small'
                    variant='outlined'
                    $bgColor={tw`bg-secondary hover:bg-secondary`}
                    $borderColor={tw`border-secondary hover:border-secondary`}
                  >
                    <span tw='hidden md:inline-block'>Close</span>
                    <span tw='md:hidden'>
                      <DrillyTypography variant='h5' $isDarkMode={isDarkMode}>
                        &#10539;
                      </DrillyTypography>
                    </span>
                  </PhotoViewerButton>
                </div>
                <Image
                  alt='selected-image'
                  height={0}
                  sizes='100vw'
                  src={photoURL}
                  tw='max-h-[700px] hidden w-fit md:inline-block'
                  width={0}
                />
                <Image
                  alt='selected-image'
                  height={0}
                  sizes='100vw'
                  src={photoURL}
                  tw='max-h-[500px] inline-block w-fit md:hidden'
                  width={0}
                />
              </div>
            </div>
            <PhotoViewerActionsPanel $isDarkMode={isDarkMode}>
              <div tw='p-8'>
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

export const PhotoViewerActionsPanel = styled.div<{ $isDarkMode?: boolean }>(
  ({ $isDarkMode }) => [
    $isDarkMode && tw`bg-gray-900`,
    !$isDarkMode && tw`bg-white`,
    tw`h-screen`,
    tw`w-full`,
    tw`md:w-1/4`,
  ],
);

export const PhotoViewerButton = styled(Button)<{
  $bgColor: TwStyle;
  $borderColor: TwStyle;
}>(({ $bgColor, $borderColor }) => [
  tw`!bg-opacity-40`,
  tw`text-white`,
  tw`hover:!bg-opacity-60`,
  tw`md:m-0`,
  tw`md:px-2`,
  $bgColor,
  $borderColor,
]);

export const PhotoViewerCommentInput = styled(TextField)<{ $isDarkMode?: boolean }>(
  ({ $isDarkMode }) => [
    {
      '.MuiInputBase-root': [$isDarkMode && tw`bg-gray-100`],
    },
  ],
);

