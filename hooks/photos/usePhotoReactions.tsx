import React from 'react';
import { PhotoReaction, Photos, User } from '../../types';

type usePhotoReactionsProps = {
  photoComments?: PhotoReaction[];
  photoLikes?: PhotoReaction[];
  photoLoves?: PhotoReaction[];
  photoSmiles?: PhotoReaction[];
  user?: User;
};

const usePhotoReactions = ({
  photoComments,
  photoLikes,
  photoLoves,
  photoSmiles,
  user,
}: usePhotoReactionsProps) => {
  const [hasUserLiked, setHasUserLiked] = React.useState<boolean>(false);
  const [hasUserLoved, setHasUserLoved] = React.useState<boolean>(false);
  const [hasUserSmiled, setHasUserSmiled] = React.useState<boolean>(false);
  const [photoCommentsState, setPhotoCommentsState] = React.useState<PhotoReaction[] | undefined>(
    photoComments,
  );

  React.useEffect(() => {
    if (user) {
      setHasUserLiked(!!photoLikes?.find(photoLike => photoLike.authorId === user.userID));
      setHasUserLoved(!!photoLoves?.find(photoLove => photoLove.authorId === user.userID));
      setHasUserSmiled(!!photoSmiles?.find(photoSmile => photoSmile.authorId === user.userID));
    }

    setPhotoCommentsState(
      !!photoComments?.length ? getSortedComments({ photoComments }) : photoComments,
    );
  }, [photoComments, photoLikes, photoLoves, photoSmiles, user]);

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
