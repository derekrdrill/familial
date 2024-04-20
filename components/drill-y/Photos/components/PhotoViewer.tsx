import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Button, IconButton, Modal, TextField, Typography } from '@mui/material';
import AddCommentIcon from '@mui/icons-material/AddComment';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';

type PhotoViewerTypes = {
  isPhotoViewerOpen: boolean;
  photoTitle?: string;
  photoURL?: string;
};

export const PhotoViewer = ({ isPhotoViewerOpen, photoTitle, photoURL }: PhotoViewerTypes) => {
  const router = useRouter();

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
                    <Typography component='span' variant='h5'>
                      &#10539;
                    </Typography>
                  </Button>
                </div>
                <Image
                  tw='md:inline-block hidden'
                  alt='selected-image'
                  height={600}
                  src={photoURL}
                  width={500}
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
            <div tw='bg-white h-screen w-full md:w-1/4'>
              <div tw='m-8'>
                <Typography component='h1' variant='h5'>
                  {photoTitle}
                </Typography>
                <div tw='flex'>
                  <IconButton>
                    <ThumbUpOffAltIcon />
                  </IconButton>
                  <IconButton>
                    <FavoriteBorderIcon />
                  </IconButton>
                  <IconButton>
                    <TagFacesIcon />
                  </IconButton>
                </div>
                <>
                  <TextField
                    tw='mt-4'
                    fullWidth
                    multiline
                    placeholder='Leave a comment...'
                    rows={3}
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
            </div>
          </div>
        )}
      </>
    </Modal>
  );
};
