import React from 'react';
import { Reaction, Photos, User } from '../../../../types';

type usePhotoReactionsProps = {
  photoComments?: Reaction[];
  photoLikes?: Reaction[];
  photoLoves?: Reaction[];
  photoSmiles?: Reaction[];
  recipeLoves?: Reaction[];
  user?: User;
};

const useReactions = ({
  photoComments,
  photoLikes,
  photoLoves,
  photoSmiles,
  recipeLoves,
  user,
}: usePhotoReactionsProps) => {
  const [hasUserLiked, setHasUserLiked] = React.useState<boolean>(false);
  const [hasUserLoved, setHasUserLoved] = React.useState<boolean>(false);
  const [hasUserSmiled, setHasUserSmiled] = React.useState<boolean>(false);
  const [photoCommentsState, setPhotoCommentsState] = React.useState<Reaction[] | undefined>(
    photoComments,
  );

  React.useEffect(() => {
    if (user) {
      setHasUserLiked(!!photoLikes?.find(photoLike => photoLike.authorId === user.userID));
      setHasUserSmiled(!!photoSmiles?.find(photoSmile => photoSmile.authorId === user.userID));

      if (!!recipeLoves) {
        setHasUserLoved(
          !!recipeLoves?.find(
            photoLove =>
              photoLove.authorId === user.userID ||
              recipeLoves?.find(recipeLove => recipeLove.authorId === user.userID),
          ),
        );
      }

      if (!!photoLoves) {
        setHasUserLoved(
          !!photoLoves?.find(
            photoLove =>
              photoLove.authorId === user.userID ||
              recipeLoves?.find(recipeLove => recipeLove.authorId === user.userID),
          ),
        );
      }
    }

    setPhotoCommentsState(
      !!photoComments?.length ? getSortedComments({ photoComments }) : photoComments,
    );
  }, [photoComments, photoLikes, photoLoves, photoSmiles, recipeLoves, user]);

  const getSortedComments = ({ photoComments }: { photoComments: Reaction[] }) =>
    photoComments?.sort((a, b) => {
      if (a.comment && b.comment) {
        return b.comment.date > a.comment.date ? 1 : a.comment.date > b.comment.date ? -1 : 0;
      }
      return 0;
    });

  const handleReactionClick = async ({
    authorAvatarUrl,
    authorId,
    authorName,
    comment,
    hasUserReacted,
    isPhoto,
    isRecipe,
    photoAlbumId,
    photoAlbumName,
    photoId,
    photoUrl,
    reactionType,
    recipeId,
    recipePhotoUrl,
    setHasUserReacted,
    to,
    toId,
  }: {
    authorAvatarUrl?: string;
    authorId?: string;
    authorName: string;
    comment?: { date: string; text: string };
    cookbookId?: string;
    hasUserReacted?: boolean;
    isPhoto?: boolean;
    isRecipe?: boolean;
    photoAlbumId?: string;
    photoAlbumName?: string;
    photoId?: string;
    photoUrl?: string;
    reactionType: 'comment' | 'like' | 'love' | 'smile';
    recipeId?: string;
    recipePhotoUrl?: string;
    setHasUserReacted?: React.Dispatch<React.SetStateAction<boolean>>;
    to?: string;
    toId?: string;
  }) => {
    await fetch('/api/reaction/update', {
      method: 'PUT',
      body: JSON.stringify({
        contentId: isRecipe ? recipeId : photoId,
        isPhoto,
        isRecipe,
        parentId: photoAlbumId,
        parentName: photoAlbumName,
        reaction: {
          authorId,
          authorName,
          authorAvatarUrl,
          ...(reactionType === 'comment' && { comment }),
        },
        reactionType,
        reactionTo: to,
        reactionToId: toId,
        ...(isPhoto && { reactionImageUrl: photoUrl }),
        ...(isRecipe && { reactionImageUrl: recipePhotoUrl }),
      }),
    })
      .then(async res => {
        const photoData: Photos = await res.json();
        const photoComments: Reaction[] | undefined = photoData.comments;

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

export default useReactions;
