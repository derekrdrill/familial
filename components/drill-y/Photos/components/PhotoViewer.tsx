import React from 'react';
import { useRouter } from 'next/router';
import { Button, Modal, Typography } from '@mui/material';
import tw from 'twin.macro';
import Image from 'next/image';

import GlobalContext from '../../../../context/GlobalContext';

type PhotoViewerTypes = {
  isPhotoViewerOpen: boolean;
  // photoUrl: string;
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
            <div tw='bg-white h-screen w-1/4'></div>
          </div>
        )}
      </>
    </Modal>
  );
};
