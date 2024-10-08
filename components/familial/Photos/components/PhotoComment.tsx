import React from 'react';
import Image from 'next/image';
import tw from 'twin.macro';
import styled from '@emotion/styled';
import { Tooltip } from '@mui/material';

import GlobalContext from '../../../../context/GlobalContext';
import { DrillyTypography } from '../../../../styles/globals';
import { getUserInitials } from '../../../../helpers';
import { Reaction } from '../../../../types';

type PhotoCommentProps = { isUserCommentAuthor: boolean; photoComment: Reaction };

export const PhotoComment = ({
  isUserCommentAuthor,
  photoComment: { authorAvatarUrl, authorName: name, comment },
}: PhotoCommentProps) => {
  const {
    state: { isDarkMode },
  } = React.useContext(GlobalContext);

  return (
    <PhotoCommentContainer $isUserCommentAuthor={isUserCommentAuthor}>
      <PhotoCommentAuthor
        $hasAvatarUrl={!!authorAvatarUrl}
        $isUserCommentAuthor={isUserCommentAuthor}
      >
        <Tooltip title={name}>
          {!!authorAvatarUrl ? (
            <Image
              alt={authorAvatarUrl}
              height={0}
              sizes='100vw'
              src={authorAvatarUrl}
              tw='h-8 object-cover rounded-2xl min-w-[32px]'
              width={0}
            />
          ) : (
            <DrillyTypography tw='cursor-default'>{getUserInitials({ name })}</DrillyTypography>
          )}
        </Tooltip>
      </PhotoCommentAuthor>
      <PhotoCommentText
        variant='body1'
        $isDarkMode={isDarkMode}
        $isUserCommentAuthor={isUserCommentAuthor}
      >
        <div tw='flex flex-col'>
          {comment?.text}
          <PhotoCommentDate variant='caption' $isUserCommentAuthor={isUserCommentAuthor}>
            {new Date(comment?.date ?? '').toLocaleString()}
          </PhotoCommentDate>
        </div>
      </PhotoCommentText>
    </PhotoCommentContainer>
  );
};

export const PhotoCommentAuthor = styled.div<{
  $hasAvatarUrl?: boolean;
  $isUserCommentAuthor: boolean;
}>(({ $hasAvatarUrl, $isUserCommentAuthor }) => [
  $isUserCommentAuthor && tw`order-2`,
  $isUserCommentAuthor && !$hasAvatarUrl && tw`bg-amber-500`,
  !$isUserCommentAuthor && !$hasAvatarUrl && tw`bg-indigo-300`,
  tw`flex`,
  tw`h-8`,
  tw`items-center`,
  tw`justify-center`,
  tw`my-2`,
  tw`px-1`,
  tw`rounded-2xl`,
]);

export const PhotoCommentContainer = styled.div<{ $isUserCommentAuthor: boolean }>(
  ({ $isUserCommentAuthor }) => [
    $isUserCommentAuthor && tw`justify-end`,
    tw`flex`,
    tw`gap-1`,
    tw`mt-4`,
  ],
);

export const PhotoCommentDate = styled(DrillyTypography)<{ $isUserCommentAuthor: boolean }>(
  ({ $isUserCommentAuthor }) => [$isUserCommentAuthor && tw`text-right`],
);

export const PhotoCommentText = styled(DrillyTypography)<{
  $isDarkMode?: boolean;
  $isUserCommentAuthor: boolean;
}>(({ $isDarkMode, $isUserCommentAuthor }) => [
  !$isUserCommentAuthor && tw`bg-notecard`,
  $isUserCommentAuthor && tw`bg-blue-300`,
  $isDarkMode && !$isUserCommentAuthor && tw`bg-gray-696969`,
  tw`flex`,
  tw`px-2`,
  tw`py-1`,
  tw`rounded`,
]);
