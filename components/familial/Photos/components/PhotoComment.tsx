import React from 'react';
import tw from 'twin.macro';
import styled from '@emotion/styled';

import GlobalContext from '../../../../context/GlobalContext';
import { DrillyTypography } from '../../../../styles/globals';
import { PhotoReaction } from '../../../../types';
import { Tooltip } from '@mui/material';

type PhotoCommentProps = { isUserCommentAuthor: boolean; photoComment: PhotoReaction };

export const PhotoComment = ({ isUserCommentAuthor, photoComment }: PhotoCommentProps) => {
  const {
    state: { isDarkMode },
  } = React.useContext(GlobalContext);

  return (
    <PhotoCommentContainer $isUserCommentAuthor={isUserCommentAuthor}>
      <PhotoCommentAuthor $isUserCommentAuthor={isUserCommentAuthor}>
        <Tooltip title={photoComment.authorName}>
          <DrillyTypography tw='cursor-default'>
            {`${photoComment.authorName?.charAt(0)}${photoComment.authorName?.charAt(photoComment.authorName?.indexOf(' ') + 1)}`}
          </DrillyTypography>
        </Tooltip>
      </PhotoCommentAuthor>
      <PhotoCommentText
        variant='body1'
        $isDarkMode={isDarkMode}
        $isUserCommentAuthor={isUserCommentAuthor}
      >
        <div tw='flex flex-col'>
          {photoComment.comment?.text}
          <PhotoCommentDate variant='caption' $isUserCommentAuthor={isUserCommentAuthor}>
            {new Date(photoComment.comment?.date ?? '').toLocaleString()}
          </PhotoCommentDate>
        </div>
      </PhotoCommentText>
    </PhotoCommentContainer>
  );
};

export const PhotoCommentAuthor = styled.div<{ $isUserCommentAuthor: boolean }>(
  ({ $isUserCommentAuthor }) => [
    $isUserCommentAuthor && tw`order-2`,
    $isUserCommentAuthor && tw`bg-amber-500`,
    !$isUserCommentAuthor && tw`bg-indigo-300`,
    tw`flex`,
    tw`h-8`,
    tw`items-center`,
    tw`justify-center`,
    tw`my-2`,
    tw`px-1`,
    tw`rounded-2xl`,
  ],
);

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
