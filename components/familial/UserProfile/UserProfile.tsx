import React from 'react';
import { SignOutButton } from '@clerk/nextjs';
import { Button, Grid, Typography } from '@mui/material';

import GlobalContext from '../../../context/GlobalContext';
import { GlobalReducerActionEnum } from '../../../context/GlobalReducer';

import {
  UserProfileAvatar,
  UserProfileAvatarClear,
  UserProfileAvatarEdit,
  UserProfileAvatarSave,
  UserProfileDetails,
} from './';
import DarkMode from '../../common/DarkMode/DarkMode';

type UserProfileProps = {
  isUserSidebarOpen: boolean;
  setIsUserSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const UserProfile = ({ isUserSidebarOpen, setIsUserSidebarOpen }: UserProfileProps) => {
  const {
    dispatch,
    state: { photoList },
  } = React.useContext(GlobalContext);

  React.useEffect(() => {
    if (!!photoList?.length) {
      dispatch({ type: GlobalReducerActionEnum.RESET_MODAL_ITEM, payload: {} });
    }
  }, [photoList]);

  return (
    <>
      <Grid container tw='justify-between p-2'>
        <Button
          color='secondary'
          onClick={() => setIsUserSidebarOpen(!isUserSidebarOpen)}
          size='small'
          tw='m-1'
          variant='outlined'
        >
          <Typography variant='h5'>&#10539;</Typography>
        </Button>
        <DarkMode />
      </Grid>
      <UserProfileDetails setIsUserSidebarOpen={setIsUserSidebarOpen} />
      <Grid container justifyContent='center' tw='mt-14'>
        <UserProfileAvatar />
      </Grid>
      <Grid container justifyContent='center' tw='mt-4'>
        <UserProfileAvatarClear />
        <UserProfileAvatarEdit />
        <UserProfileAvatarSave />
      </Grid>
      <Grid container justifyContent='center' tw='absolute bottom-5'>
        <SignOutButton tw='w-full bg-gray-300 opacity-60 hover:opacity-100 rounded-lg m-3 p-2' />
      </Grid>
    </>
  );
};
