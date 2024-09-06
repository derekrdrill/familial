import React from 'react';
import { IconButton } from '@mui/material';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';

type PhotoReactionButton = {
  handleReactionClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  hasUserLiked?: boolean;
  hasUserLoved?: boolean;
  hasUserSmiled?: boolean;
  reactionType: 'like' | 'love' | 'smile';
};

export const PhotoReactionButton = ({
  handleReactionClick,
  hasUserLiked,
  hasUserLoved,
  hasUserSmiled,
  reactionType,
}: PhotoReactionButton) => {
  return (
    <IconButton
      color={reactionType === 'like' ? 'info' : reactionType === 'love' ? 'error' : 'secondary'}
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
  );
};
