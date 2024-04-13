import React from 'react';
import { useRouter } from 'next/router';
import tw from 'twin.macro';
import Image from 'next/image';
import { Button, IconButton, Modal, TextField, Typography } from '@mui/material';
import AddCommentIcon from '@mui/icons-material/AddComment';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';

import GlobalContext from '../../../../context/GlobalContext';

type PhotoViewerTypes = {
  isPhotoViewerOpen: boolean;
};

export const PhotoViewer = ({ isPhotoViewerOpen }: PhotoViewerTypes) => {
  const router = useRouter();
  const {
    state: { albums, selectedPhotoAlbum, selectedPhoto },
  } = React.useContext(GlobalContext);

  const selectedAlbumID = albums?.find(
    album => album.albumName === selectedPhotoAlbum?.albumName,
  )?._id;

  return (
    <Modal open={isPhotoViewerOpen}>
      <>
        {selectedPhoto?.url && (
          <div tw='flex justify-between'>
            <div tw='bg-[#00000099] w-3/4'>
              <div tw='flex justify-center mt-[6%]'>
                <div tw='absolute left-2 top-2'>
                  <Button
                    color='secondary'
                    fullWidth
                    onClick={() => {
                      router.replace({
                        query: { album: selectedAlbumID },
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
                    <Typography variant='h6'>&#10539;</Typography>
                  </Button>
                </div>
                <Image alt='selected-image' height={600} src={selectedPhoto?.url} width={500} />
              </div>
            </div>
            <div tw='bg-white h-screen w-1/4'>
              <div tw='m-8'>
                <Typography component='h1' variant='h5'>
                  {selectedPhoto?.title}
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
