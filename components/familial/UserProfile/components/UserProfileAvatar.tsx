import React from 'react';
import Image from 'next/image';
import styled from '@emotion/styled';
import tw from 'twin.macro';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import GlobalContext from '../../../../context/GlobalContext';

export const UserProfileAvatar = () => {
  const {
    state: { isDarkMode, photoList, user },
  } = React.useContext(GlobalContext);

  return (
    <>
      {!photoList?.length && !user?.avatarURL && (
        <UserProfileAvatarIcon sx={{ fontSize: '200px' }} $isDarkMode={isDarkMode} />
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
    </>
  );
};

export const UserProfileAvatarIcon = styled(AccountCircleIcon)<{ $isDarkMode?: boolean }>(
  ({ $isDarkMode }) => [$isDarkMode && tw`text-gray-300`, !$isDarkMode && tw`text-gray-600`],
);
