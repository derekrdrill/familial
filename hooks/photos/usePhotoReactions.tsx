import React from 'react';
import { PhotoReaction, Photos } from '../../types';

type usePhotoReactionsProps = {
  photoComments?: PhotoReaction[];
  photoLikes?: PhotoReaction[];
  photoLoves?: PhotoReaction[];
  photoSmiles?: PhotoReaction[];
};

const usePhotoReactions = ({
  photoComments,
  photoLikes,
  photoLoves,
  photoSmiles,
}: usePhotoReactionsProps) => {
  const [hasUserLiked, setHasUserLiked] = React.useState<boolean>(false);
  const [hasUserLoved, setHasUserLoved] = React.useState<boolean>(false);
  const [hasUserSmiled, setHasUserSmiled] = React.useState<boolean>(false);
  const [photoCommentsState, setPhotoCommentsState] = React.useState<PhotoReaction[] | undefined>(
    photoComments,
  );

  React.useEffect(() => {
    if (!!photoComments?.length) {
      setPhotoCommentsState(getSortedComments({ photoComments }));
    }

    setHasUserLiked(!!photoLikes?.length);
    setHasUserLoved(!!photoLoves?.length);
    setHasUserSmiled(!!photoSmiles?.length);
  }, [photoComments, photoLikes, photoLoves, photoSmiles]);

  const getSortedComments = ({ photoComments }: { photoComments: PhotoReaction[] }) =>
    photoComments?.sort((a, b) => {
      if (a.comment && b.comment) {
        return b.comment.date > a.comment.date ? 1 : a.comment.date > b.comment.date ? -1 : 0;
      }
      return 0;
    });

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
    comment?: { date: string; text: string };
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
    })
      .then(async res => {
        const photoData: Photos = await res.json();
        const photoComments: PhotoReaction[] | undefined = photoData.comments;

        if (!!photoComments?.length) {
          setPhotoCommentsState(getSortedComments({ photoComments }));
        }
      })
      .catch(e => {
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
    photoCommentsState,
    setHasUserLiked,
    setHasUserLoved,
    setHasUserSmiled,
  };
};

export default usePhotoReactions;
