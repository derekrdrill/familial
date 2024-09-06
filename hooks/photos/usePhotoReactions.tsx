import React from 'react';
import { PhotoReaction } from '../../types';


type usePhotoReactionsProps = {
  photoLikes?: PhotoReaction[];
  photoLoves?: PhotoReaction[];
  photoSmiles?: PhotoReaction[];
};

const usePhotoReactions = ({ photoLikes, photoLoves, photoSmiles }: usePhotoReactionsProps) => {
  const [hasUserLiked, setHasUserLiked] = React.useState<boolean>(false);
  const [hasUserLoved, setHasUserLoved] = React.useState<boolean>(false);
  const [hasUserSmiled, setHasUserSmiled] = React.useState<boolean>(false);

  React.useEffect(() => {
    setHasUserLiked(!!photoLikes?.length);
    setHasUserLoved(!!photoLoves?.length);
    setHasUserSmiled(!!photoSmiles?.length);
  }, [photoLikes, photoLoves, photoSmiles]);

  const handleReactionClick = async ({
    authorId,
    authorName,
    comment,
    hasUserReacted,
    photoId,
    reactionType,
    setHasUserReacted,
  }: {
    authorId?: string;
    authorName: string;
    comment?: string;
    hasUserReacted?: boolean;
    photoId?: string;
    reactionType: 'comment' | 'like' | 'love' | 'smile';
    setHasUserReacted?: React.Dispatch<React.SetStateAction<boolean>>;
  }) => {
    await fetch('/api/photo/reaction/update', {
      method: 'PUT',
      body: JSON.stringify({
        photoID: photoId,
        photoReactionType: reactionType,
        photoReaction: {
          authorId,
          authorName,
          ...(reactionType === 'comment' && { comment }),
        },
      }),
    }).catch(e => {
      console.log(e);
    });

    if (reactionType !== 'comment' && !!setHasUserReacted) {
      setHasUserReacted(!hasUserReacted);
    }
  };

  return {
    handleReactionClick,
    hasUserLiked,
    hasUserLoved,
    hasUserSmiled,
    setHasUserLiked,
    setHasUserLoved,
    setHasUserSmiled,
  };
};

export default usePhotoReactions;
