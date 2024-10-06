import React from 'react';
import Image from 'next/image';
import styled from '@emotion/styled';
import tw from 'twin.macro';

import { IconButton, Tooltip } from '@mui/material';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';

import { DrillyTypography } from '../../../../styles/globals';
import { getUserInitials } from '../../../../helpers';
import { PhotoReaction } from '../../../../types';
import GlobalContext from '../../../../context/GlobalContext';

type PhotoReactionButtonProps = {
  handleReactionClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  hasUserLiked?: boolean;
  hasUserLoved?: boolean;
  hasUserSmiled?: boolean;
  reactions?: PhotoReaction[];
  reactionType: 'like' | 'love' | 'smile';
};

export const PhotoReactionButton = ({
  handleReactionClick,
  hasUserLiked,
  hasUserLoved,
  hasUserSmiled,
  reactions,
  reactionType,
}: PhotoReactionButtonProps) => {
  const {
    state: { isDarkMode },
  } = React.useContext(GlobalContext);

  const reactionsSortedByName = reactions?.sort((a, b) =>
    a.authorName > b.authorName ? 1 : a.authorName < b.authorName ? -1 : 0,
  );

  return (
    <Tooltip
      arrow
      enterDelay={500}
      enterNextDelay={500}
      title={
        !!reactionsSortedByName?.length && (
          <>
            <DrillyTypography component='h1' tw='capitalize' variant='h6' $isDarkMode={isDarkMode}>
              {reactionType}s
            </DrillyTypography>
            {reactionsSortedByName?.map(reaction => {
              return (
                <div tw='flex gap-2 justify-between'>
                  {!!reaction.authorAvatarUrl ? (
                    <Image
                      alt={reaction.authorAvatarUrl}
                      height={0}
                      sizes='100vw'
                      src={reaction.authorAvatarUrl}
                      tw='h-6 object-cover rounded-xl w-6'
                      width={0}
                    />
                  ) : (
                    <PhotoReationTooltipInitials>
                      {getUserInitials({ name: reaction.authorName })}
                    </PhotoReationTooltipInitials>
                  )}
                  <DrillyTypography component='p' variant='subtitle1' $isDarkMode={isDarkMode}>
                    {reaction.authorName}
                  </DrillyTypography>
                </div>
              );
            })}
          </>
        )
      }
    >
      <IconButton
        color={reactionType === 'like' ? 'info' : reactionType === 'love' ? 'error' : 'warning'}
        onClick={handleReactionClick}
        size='small'
      >
        {reactionType === 'like' ? (
          hasUserLiked ? (
            <ThumbUpIcon />
          ) : (
            <ThumbUpOffAltIcon />
          )
        ) : reactionType === 'love' ? (
          hasUserLoved ? (
            <FavoriteIcon />
          ) : (
            <FavoriteBorderIcon />
          )
        ) : hasUserSmiled ? (
          <EmojiEmotionsIcon />
        ) : (
          <TagFacesIcon />
        )}
      </IconButton>
    </Tooltip>
  );
};

const PhotoReationTooltipInitials = styled(DrillyTypography)([
  tw`bg-secondary`,
  tw`h-8`,
  tw`pl-1`,
  tw`pt-1`,
  tw`rounded-2xl`,
  tw`w-8`,
]);
