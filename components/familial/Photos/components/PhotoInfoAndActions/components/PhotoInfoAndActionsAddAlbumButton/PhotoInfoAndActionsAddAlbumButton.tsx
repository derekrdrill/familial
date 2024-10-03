import React from 'react';
import tw from 'twin.macro';
import { useRouter } from 'next/router';
import { Button } from '@mui/material';
import PhotoSizeSelectActualTwoToneIcon from '@mui/icons-material/PhotoSizeSelectActualTwoTone';

import GlobalContext from '../../../../../../../context/GlobalContext';
import { GlobalReducerActionEnum } from '../../../../../../../context/GlobalReducer';

import { DrillyTextField, DrillyTypography } from '../../../../../../../styles/globals';

const PhotoInfoAndActionsAddAlbumButton = () => {
  const router = useRouter();
  const {
    dispatch,
    state: { isDarkMode },
  } = React.useContext(GlobalContext);

  return (
    !router.query.albumID && (
      <Button
        color='info'
        onClick={() => {
          dispatch({
            type: GlobalReducerActionEnum.SET_MODAL_ITEM,
            payload: {
              modalItem: {
                handleSubmit: async () => {
                  const newAlbumName = (document.getElementById('album') as HTMLInputElement)
                    ?.value;

                  await fetch('/api/album/add', {
                    method: 'POST',
                    body: newAlbumName,
                  })
                    .then(async res => {
                      const newAlbums = await res.json();

                      dispatch({
                        type: GlobalReducerActionEnum.SET_ALBUMS,
                        payload: { albums: newAlbums },
                      });
                    })
                    .catch(e => {
                      console.log(e);
                    });
                },
                isExitHidden: true,
                isModalOpen: true,
                modalBody: (
                  <DrillyTextField
                    id='album'
                    fullWidth
                    placeholder='Enter album name'
                    size='small'
                    variant='outlined'
                    $hasBorder
                    $bgColor={tw`bg-gray-D9D9D9`}
                    $bgColorDark={tw`bg-gray-3D3D3D`}
                    $isDarkMode={isDarkMode}
                  />
                ),
                modalTitle: 'Add new album',
                submitSuccessMessage: (
                  <>
                    <DrillyTypography variant='subtitle1' $isDarkMode={isDarkMode}>
                      New album added!
                    </DrillyTypography>
                    <DrillyTypography variant='subtitle2' $isDarkMode={isDarkMode}>
                      Album will not appear here until photos are added
                    </DrillyTypography>
                  </>
                ),
              },
            },
          });
        }}
        startIcon={<PhotoSizeSelectActualTwoToneIcon />}
        tw='mt-2 normal-case'
        variant={isDarkMode ? 'outlined' : 'text'}
      >
        Add album
      </Button>
    )
  );
};

export { PhotoInfoAndActionsAddAlbumButton };
