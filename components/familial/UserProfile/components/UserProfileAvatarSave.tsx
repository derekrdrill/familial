import React from 'react';
import styled from '@emotion/styled';
import tw from 'twin.macro';
import SaveIcon from '@mui/icons-material/Save';

import GlobalContext from '../../../../context/GlobalContext';
import { GlobalReducerActionEnum } from '../../../../context/GlobalReducer';

export const UserProfileAvatarSave = () => {
  const {
    dispatch,
    state: { photoList, user },
  } = React.useContext(GlobalContext);

  return (
    !!photoList?.length && (
      <UserProfileAvatarSaveRoot
        onClick={async () => {
          const photoFile = !!photoList?.length ? photoList[0].file : null;
          const photoFileType = photoFile ? photoFile?.type : 'application/octet-stream';

          if (photoFile) {
            await fetch('/api/photo-uploader/blob', {
              method: 'POST',
              headers: {
                'content-type': photoFileType,
              },
              body: photoFile,
            })
              .then(async res => {
                const { url } = await res.json();
                await fetch('/api/user/update', {
                  method: 'PUT',
                  body: JSON.stringify({
                    user: { ...user, ...{ avatarURL: url } },
                  }),
                })
                  .then(async res => {
                    const user = await res.json();

                    dispatch({
                      type: GlobalReducerActionEnum.SET_USER,
                      payload: { user: user },
                    });

                    dispatch({
                      type: GlobalReducerActionEnum.SET_PHOTO_LIST,
                      payload: { photoList: [] },
                    });
                  })
                  .catch(e => console.log(e));
              })
              .catch(e => console.log(e));
          } else {
            await fetch('/api/user/update', {
              method: 'PUT',
              body: JSON.stringify({
                user: { ...user, ...{ avatarURL: photoList[0].dataURL } },
              }),
            })
              .then(async res => {
                const user = await res.json();

                dispatch({
                  type: GlobalReducerActionEnum.SET_USER,
                  payload: { user: user },
                });

                dispatch({
                  type: GlobalReducerActionEnum.SET_PHOTO_LIST,
                  payload: { photoList: [] },
                });
              })
              .catch(e => console.log(e));
          }
        }}
      />
    )
  );
};

const UserProfileAvatarSaveRoot = styled(SaveIcon)<{ $isDarkMode?: boolean }>(({ $isDarkMode }) => [
  !$isDarkMode && tw`text-gray-300`,
  $isDarkMode && tw`text-gray-600`,
  tw`cursor-pointer`,
  tw`text-success`,
]);
