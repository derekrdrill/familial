import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import tw from 'twin.macro';

import { SignOutButton } from '@clerk/nextjs';
import styled from '@emotion/styled';
import { Button, Grid, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

import GlobalContext from '../../../context/GlobalContext';

import { UserProfileSelectImage } from './';
import PhotoUploader from '../../common/PhotoUploader';
import { DrillyTypography } from '../../../styles/globals';
import { GlobalReducerActionEnum } from '../../../context/GlobalReducer';
import { Photos } from '../../../types';

type UserProfileProps = {
  isUserSidebarOpen: boolean;
  setIsUserSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const UserProfile = ({ isUserSidebarOpen, setIsUserSidebarOpen }: UserProfileProps) => {
  const {
    dispatch,
    state: { isDarkMode, photoList, user },
  } = React.useContext(GlobalContext);

  React.useEffect(() => {
    if (!!photoList?.length) {
      dispatch({ type: GlobalReducerActionEnum.RESET_MODAL_ITEM, payload: {} });
    }
  }, [photoList]);

  return (
    <>
      <Grid container>
        <Button
          color='secondary'
          onClick={() => setIsUserSidebarOpen(!isUserSidebarOpen)}
          size='small'
          tw='m-1'
          variant='outlined'
        >
          <Typography variant='h5'>&#10539;</Typography>
        </Button>
      </Grid>
      <DrillyTypography
        variant='h4'
        textAlign='center'
        $isDarkMode={isDarkMode}
      >{`${user?.firstName} ${user?.lastName}`}</DrillyTypography>
      <DrillyTypography variant='h6' textAlign='center' $isDarkMode={isDarkMode}>
        {user?.userName}
      </DrillyTypography>
      {user?.isAdmin && (
        <Link href='/admin/add-new-member' onClick={() => setIsUserSidebarOpen(false)}>
          <DrillyTypography
            textAlign='center'
            tw='text-info-dark text-xs underline'
            variant='subtitle2'
          >
            Admin settings
          </DrillyTypography>
        </Link>
      )}
      <Grid container justifyContent='center' tw='mt-14'>
        {!photoList?.length && !user?.avatarURL && (
          <UserProfileAvatar sx={{ fontSize: '200px' }} $isDarkMode={isDarkMode} />
        )}
        {(!!photoList?.length || !!user?.avatarURL) && (
          <Image
            alt={(!!photoList?.length ? photoList[0].dataURL : user?.avatarURL) ?? ''}
            height={0}
            loading='lazy'
            sizes='100vw'
            src={(!!photoList?.length ? photoList[0].dataURL : user?.avatarURL) ?? ''}
            tw='h-44 object-cover rounded-[84px] w-44'
            width={0}
          />
        )}
      </Grid>
      <Grid container justifyContent='center' tw='mt-4'>
        <UserProfileAvatarPencil
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
                                  modalBody: (
                                    <UserProfileSelectImage photosByUserId={photosByUserId} />
                                  ),
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
          $isDarkMode={isDarkMode}
        />
        {!!photoList?.length && (
          <UserProfileAvatarSave
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
        )}
        {!!photoList?.length && (
          <ClearIcon
            onClick={() =>
              dispatch({ type: GlobalReducerActionEnum.SET_PHOTO_LIST, payload: { photoList: [] } })
            }
            color='error'
            tw='cursor-pointer'
          />
        )}
      </Grid>
      <Grid container justifyContent='center' tw='absolute bottom-5'>
        <SignOutButton tw='w-full bg-gray-300 opacity-60 hover:opacity-100 rounded-lg m-3 p-2' />
      </Grid>
    </>
  );
};

export const UserProfileAvatar = styled(AccountCircleIcon)<{ $isDarkMode?: boolean }>(
  ({ $isDarkMode }) => [$isDarkMode && tw`text-gray-300`, !$isDarkMode && tw`text-gray-600`],
);

export const UserProfileAvatarPencil = styled(EditIcon)<{ $isDarkMode?: boolean }>(
  ({ $isDarkMode }) => [
    !$isDarkMode && tw`text-gray-300`,
    $isDarkMode && tw`text-gray-600`,
    tw`cursor-pointer`,
    tw`text-info`,
    // tw`lg:text-gray-777777`,
    // tw`lg:hover:text-info`,
  ],
);

export const UserProfileAvatarSave = styled(SaveIcon)<{ $isDarkMode?: boolean }>(
  ({ $isDarkMode }) => [
    !$isDarkMode && tw`text-gray-300`,
    $isDarkMode && tw`text-gray-600`,
    tw`cursor-pointer`,
    tw`text-success`,
    // tw`lg:text-gray-777777`,
    // tw`lg:hover:text-success`,
  ],
);
