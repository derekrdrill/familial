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
import { Shimmer } from 'react-shimmer';

type PhotoQuickProps = {
  photoAlbumID: string;
  photoAuthorFirstName: string;
  photoAuthorId?: string;
  photoID: string;
  photoLikes?: PhotoReaction[];
  photoLoves?: PhotoReaction[];
  photoSmiles?: PhotoReaction[];
  photoTitle: string;
  photoUrl: string;
};

const PhotoQuick = ({
  photoAlbumID,
  photoAuthorFirstName,
  photoAuthorId,
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

  const [isPhotoQuickLoading, setIsPhotoQuickLoading] = React.useState<boolean>(true);

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
    user,
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
        {isPhotoQuickLoading && <Shimmer height={210} width={210} />}
        <PhotoQuickImage
          alt='album-cover'
          height={0}
          loading='lazy'
          onLoad={() => setIsPhotoQuickLoading(false)}
          sizes='100vw'
          src={photoUrl}
          width={0}
          $isPhotoQuickLoading={isPhotoQuickLoading}
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
                authorAvatarUrl: user?.avatarURL,
                authorId: user?.userID,
                authorName: `${user?.firstName} ${user?.lastName}`,
                hasUserReacted: hasUserLiked,
                photoId: photoID,
                photoUrl,
                reactionType: 'like',
                setHasUserReacted: setHasUserLiked,
                to: photoAuthorFirstName,
                toId: photoAuthorId,
              });
            }}
            hasUserLiked={hasUserLiked}
            reactions={photoLikes}
            reactionType='like'
          />
        </div>
        <div tw='col-span-1 flex justify-center'>
          <PhotoReactionButton
            handleReactionClick={async (e: React.MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation();

              handleReactionClick({
                authorAvatarUrl: user?.avatarURL,
                authorId: user?.userID,
                authorName: `${user?.firstName} ${user?.lastName}`,
                hasUserReacted: hasUserLoved,
                photoId: photoID,
                photoUrl,
                reactionType: 'love',
                setHasUserReacted: setHasUserLoved,
                to: photoAuthorFirstName,
                toId: photoAuthorId,
              });
            }}
            hasUserLoved={hasUserLoved}
            reactions={photoLoves}
            reactionType='love'
          />
        </div>
        <div tw='col-span-1 flex justify-center'>
          <PhotoReactionButton
            handleReactionClick={async (e: React.MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation();

              handleReactionClick({
                authorAvatarUrl: user?.avatarURL,
                authorId: user?.userID,
                authorName: `${user?.firstName} ${user?.lastName}`,
                hasUserReacted: hasUserSmiled,
                photoId: photoID,
                photoUrl,
                reactionType: 'smile',
                setHasUserReacted: setHasUserSmiled,
                to: photoAuthorFirstName,
                toId: photoAuthorId,
              });
            }}
            hasUserSmiled={hasUserSmiled}
            reactions={photoSmiles}
            reactionType='smile'
          />
        </div>
      </div>
      <PhotoQuickAddedByText
        $isDarkMode={isDarkMode}
      >{`added by ${photoAuthorFirstName}`}</PhotoQuickAddedByText>
    </PhotoQuickRoot>
  );
};

const PhotoQuickAddedByText = styled.p<{ $isDarkMode?: boolean }>(({ $isDarkMode }) => [
  !$isDarkMode && tw`text-gray-777777`,
  $isDarkMode && tw`text-gray-B6B6B6`,
  tw`text-right`,
  tw`text-xs`,
]);

const PhotoQuickTitleText = styled.p<{ $isDarkMode?: boolean }>(({ $isDarkMode }) => [
  !$isDarkMode && tw`text-black`,
  $isDarkMode && tw`text-gray-DADADA`,
  tw`mt-3`,
  tw`text-xl`,
  tw`text-center`,
  tw`md:text-base`,
  tw`truncate`,
]);

const PhotoQuickRoot = styled.div<{ $isDarkMode?: boolean }>(({ $isDarkMode }) => [
  !$isDarkMode && tw`bg-gray-DADADA`,
  $isDarkMode && tw`bg-gray-696969`,
  tw`cursor-pointer`,
  tw`px-2`,
  tw`rounded-sm`,
  tw`w-full`,
]);

const PhotoQuickImage = styled(Image)<{ $isPhotoQuickLoading: boolean }>(
  ({ $isPhotoQuickLoading }) => [
    $isPhotoQuickLoading && tw`invisible`,
    $isPhotoQuickLoading && tw`h-0`,
    !$isPhotoQuickLoading && tw`h-80`,
    !$isPhotoQuickLoading && tw`object-cover`,
    !$isPhotoQuickLoading && tw`w-full`,
    !$isPhotoQuickLoading && tw`md:h-52`,
    !$isPhotoQuickLoading && {
      overflowClipMargin: 'unset',
    },
  ],
);


export { PhotoQuick };
