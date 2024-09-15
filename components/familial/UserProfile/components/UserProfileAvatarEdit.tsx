import React from 'react';
import styled from '@emotion/styled';
import tw from 'twin.macro';
import EditIcon from '@mui/icons-material/Edit';

import GlobalContext from '../../../../context/GlobalContext';
import { GlobalReducerActionEnum } from '../../../../context/GlobalReducer';

import { UserProfileSelectImage } from './UserProfileSelectImage';

import PhotoUploader from '../../../common/PhotoUploader';
import { DrillyTypography } from '../../../../styles/globals';
import { Photos } from '../../../../types';

export const UserProfileAvatarEdit = () => {
  const {
    dispatch,
    state: { user },
  } = React.useContext(GlobalContext);

  return (
    <UserProfileAvatarRoot
      onClick={() => {
        dispatch({
          type: GlobalReducerActionEnum.SET_MODAL_ITEM,
          payload: {
            modalItem: {
              isCancelHidden: true,
              isModalOpen: true,
              modalBody: (
                <div tw='flex flex-col gap-2'>
                  <button
                    onClick={async () => {
                      await fetch(`/api/photo/get/${user?.userID}`).then(async res => {
                        const photosByUserId: Photos[] = await res.json();

                        dispatch({
                          type: GlobalReducerActionEnum.SET_MODAL_ITEM,
                          payload: {
                            modalItem: {
                              isCancelHidden: true,
                              isModalOpen: true,
                              modalBody: <UserProfileSelectImage photosByUserId={photosByUserId} />,
                              modalTitle: 'Select avatar from your photos',
                            },
                          },
                        });
                      });
                    }}
                    tw='border-2 shadow-sm border-gray-400 py-4 rounded-lg hover:shadow-lg hover:border-info hover:bg-info hover:bg-opacity-30'
                  >
                    <DrillyTypography tw='cursor-pointer text-center'>
                      Select existing photo for avatar
                    </DrillyTypography>
                  </button>
                  <PhotoUploader
                    isMultiple={false}
                    photoUploaderComponent={
                      <button tw='border-2 shadow-sm border-gray-400 py-4 rounded-lg w-full hover:shadow-lg hover:border-info hover:bg-info hover:bg-opacity-30'>
                        <DrillyTypography tw='cursor-pointer text-center'>
                          Upload new photo for avatar
                        </DrillyTypography>
                      </button>
                    }
                  />
                </div>
              ),
              modalTitle: 'Select one',
            },
          },
        });
      }}
    />
  );
};

export const UserProfileAvatarRoot = styled(EditIcon)<{ $isDarkMode?: boolean }>(
  ({ $isDarkMode }) => [
    !$isDarkMode && tw`text-gray-300`,
    $isDarkMode && tw`text-gray-600`,
    tw`cursor-pointer`,
    tw`text-info`,
  ],
);
