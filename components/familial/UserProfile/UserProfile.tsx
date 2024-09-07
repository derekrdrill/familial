import React from 'react';
import { SignOutButton } from '@clerk/nextjs';
import tw from 'twin.macro';
import styled from '@emotion/styled';
import { Button, Grid, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import GlobalContext from '../../../context/GlobalContext';

import { DrillyTypography } from '../../../styles/globals';
import Link from 'next/link';

type UserProfileProps = {
  isUserSidebarOpen: boolean;
  setIsUserSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const UserProfile = ({ isUserSidebarOpen, setIsUserSidebarOpen }: UserProfileProps) => {
  const {
    state: { isDarkMode, user },
  } = React.useContext(GlobalContext);

  return (
    <>
      <Grid container>
        <Button
          color='secondary'
          onClick={() => setIsUserSidebarOpen(!isUserSidebarOpen)}
          size='small'
          tw='m-1'
          variant={isDarkMode ? 'outlined' : 'text'}
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
        <UserProfileAvatar sx={{ fontSize: '200px' }} $isDarkMode={isDarkMode} />
      </Grid>
      <Grid container justifyContent='center' tw='absolute bottom-5'>
        <SignOutButton tw='w-full bg-gray-300 opacity-60 hover:opacity-100 rounded-lg m-3 p-2' />
      </Grid>
    </>
  );
};

export default UserProfile;

export const UserProfileAvatar = styled(AccountCircleIcon)<{ $isDarkMode?: boolean }>(
  ({ $isDarkMode }) => [$isDarkMode && tw`text-gray-300`, !$isDarkMode && tw`text-gray-600`],
);
