import React from 'react';
import Image from 'next/image';
import styled from '@emotion/styled';
import tw from 'twin.macro';
import { useRouter } from 'next/router';

import GlobalContext from '../../../../context/GlobalContext';
import { GlobalReducerActionEnum } from '../../../../context/GlobalReducer';
import usePhotoReactions from '../../../../hooks/photos/usePhotoReactions';
import { PhotoReaction } from '../../../../types';
import { PhotoReactionButton } from './PhotoReactionButton';

type PhotoQuickProps = {
  photoAlbumID: string;
  photoID: string;
  photoLikes?: PhotoReaction[];
  photoLoves?: PhotoReaction[];
  photoSmiles?: PhotoReaction[];
  photoTitle: string;
  photoUrl: string;
};

const PhotoQuick = ({
  photoAlbumID,
  photoID,
  photoLikes,
  photoLoves,
  photoSmiles,
  photoTitle,
  photoUrl,
}: PhotoQuickProps) => {
  const router = useRouter();
  const {
    dispatch,
    state: { isDarkMode, user },
  } = React.useContext(GlobalContext);

  const {
    handleReactionClick,
    hasUserLiked,
    hasUserLoved,
    hasUserSmiled,
    setHasUserLiked,
    setHasUserLoved,
    setHasUserSmiled,
  } = usePhotoReactions({
    photoLikes,
    photoLoves,
    photoSmiles,
  });

  return (
    <PhotoQuickRoot
      onClick={() => {
        dispatch({
          type: GlobalReducerActionEnum.SET_IS_PHOTO_VIEWER_BACK_BTN_SHOWN,
          payload: { isPhotoViewerBackBtnShown: true },
        });

        router.push({
          pathname: `/photos/${photoAlbumID}`,
          query: {
            p: photoID,
          },
        });
      }}
      $isDarkMode={isDarkMode}
    >
      <div tw='bg-white relative top-2'>
        <PhotoQuickImage
          alt='album-cover'
          height={0}
          loading='lazy'
          onLoad={() => null}
          sizes='100vw'
          src={photoUrl}
          width={0}
        />
      </div>
      <PhotoQuickTitleText title={photoTitle} $isDarkMode={isDarkMode}>
        {photoTitle}
      </PhotoQuickTitleText>
      <div tw='gap-0 grid grid-cols-3 mx-14'>
        <div tw='col-span-1 flex justify-center'>
          <PhotoReactionButton
            handleReactionClick={async (e: React.MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation();

              handleReactionClick({
                authorId: user?.userID,
                authorName: `${user?.firstName} ${user?.lastName}`,
                hasUserReacted: hasUserLiked,
                photoId: photoID,
                reactionType: 'like',
                setHasUserReacted: setHasUserLiked,
              });
            }}
            hasUserLiked={hasUserLiked}
            reactionType='like'
          />
        </div>
        <div tw='col-span-1 flex justify-center'>
          <PhotoReactionButton
            handleReactionClick={async (e: React.MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation();

              handleReactionClick({
                authorId: user?.userID,
                authorName: `${user?.firstName} ${user?.lastName}`,
                hasUserReacted: hasUserLoved,
                photoId: photoID,
                reactionType: 'love',
                setHasUserReacted: setHasUserLoved,
              });
            }}
            hasUserLoved={hasUserLoved}
            reactionType='love'
          />
        </div>
        <div tw='col-span-1 flex justify-center'>
          <PhotoReactionButton
            handleReactionClick={async (e: React.MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation();

              handleReactionClick({
                authorId: user?.userID,
                authorName: `${user?.firstName} ${user?.lastName}`,
                hasUserReacted: hasUserSmiled,
                photoId: photoID,
                reactionType: 'smile',
                setHasUserReacted: setHasUserSmiled,
              });
            }}
            hasUserSmiled={hasUserSmiled}
            reactionType='smile'
          />
        </div>
      </div>
      <PhotoQuickAddedByText $isDarkMode={isDarkMode}>added by Derek</PhotoQuickAddedByText>
    </PhotoQuickRoot>
  );
};

const PhotoQuickAddedByText = styled.p<{ $isDarkMode?: boolean }>(
  ({ $isDarkMode }) => [
    !$isDarkMode && tw`text-gray-777777`,
    $isDarkMode && tw`text-gray-B6B6B6`,
    tw`text-right`,
    tw`text-xs`,
  ],
);

const PhotoQuickTitleText = styled.p<{ $isDarkMode?: boolean }>(
  ({ $isDarkMode }) => [
    !$isDarkMode && tw`text-black`,
    $isDarkMode && tw`text-gray-DADADA`,
    tw`mt-3`,
    tw`text-xl`,
    tw`text-center`,
    tw`md:text-base`,
    tw`truncate`,
  ],
);

const PhotoQuickRoot = styled.div<{ $isDarkMode?: boolean }>(
  ({ $isDarkMode }) => [
    !$isDarkMode && tw`bg-gray-DADADA`,
    $isDarkMode && tw`bg-gray-696969`,
    tw`cursor-pointer`,
    tw`px-2`,
    tw`rounded-sm`,
    tw`w-full`,
  ],
);

const PhotoQuickImage = styled(Image)([
  tw`h-80`,
  tw`object-cover`,
  tw`w-full`,
  tw`md:h-52`,
  {
    overflowClipMargin: 'unset',
  },
]);


export { PhotoQuick };
