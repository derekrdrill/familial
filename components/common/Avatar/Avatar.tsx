import React from 'react';
import styled from '@emotion/styled';
import tw from 'twin.macro';
import Image from 'next/image';

import { DrillyTypography } from '../../../styles/globals';
import { User } from '../../../types';

type AvatarProps = {
  avatarURL?: string;
  user: User;
};

const getRandomColor = () => {
  const letters = '89ABCDEF'; // Use only higher values to ensure lighter colors
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * letters.length)];
  }
  return color;
};

const Avatar = ({ avatarURL, user }: AvatarProps) => {
  const [randomColor, setRandomColor] = React.useState<string>('');

  React.useEffect(() => {
    setRandomColor(getRandomColor());
  }, []);

  return avatarURL ? (
    <Image
      key={user._id}
      alt=''
      height={0}
      src={avatarURL ?? ''}
      width={0}
      sizes='100vw'
      tw='rounded-3xl h-8 object-cover w-8'
    />
  ) : (
    <AvatarInitialChip
      key={user._id}
      $bgColor={randomColor}
    >{`${user.firstName[0]}${user.lastName[0]}`}</AvatarInitialChip>
  );
};

const AvatarInitialChip = styled(DrillyTypography)<{ $bgColor: string }>(({ $bgColor }) => [
  tw`h-8`,
  tw`pl-1`,
  tw`pt-1`,
  tw`rounded-2xl`,
  tw`w-8`,
  {
    backgroundColor: $bgColor,
  },
]);

export { Avatar };
