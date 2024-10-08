import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import tw, { TwStyle } from 'twin.macro';
import styled from '@emotion/styled';
import { Button, Modal, TextField } from '@mui/material';
import AddCommentIcon from '@mui/icons-material/AddComment';

import GlobalContext from '../../../../context/GlobalContext';
import { DrillyTypography } from '../../../../styles/globals';
import { PhotoComment, PhotoReactionButton } from '../../Photos';
import usePhotoReactions from '../../../../hooks/photos/usePhotoReactions';

import { Reaction } from '../../../../types';

type PhotoViewerTypes = {
  isPhotoViewerOpen: boolean;
  photoAuthorFirstName?: string;
  photoAuthorId?: string;
  photoComments?: Reaction[];
  photoId?: string;
  photoLikes?: Reaction[];
  photoLoves?: Reaction[];
  photoSmiles?: Reaction[];
  photoTitle?: string;
  photoURL?: string;
};

export const PhotoViewer = ({
  isPhotoViewerOpen,
  photoAuthorFirstName = '',
  photoAuthorId,
  photoComments,
  photoId,
  photoLikes,
  photoLoves,
  photoSmiles,
  photoTitle,
  photoURL,
}: PhotoViewerTypes) => {
  const router = useRouter();

  const {
    state: { isDarkMode, isPhotoViewerBackBtnShown, selectedPhotoAlbum, user },
  } = React.useContext(GlobalContext);

  const {
    handleReactionClick,
    hasUserLiked,
    hasUserLoved,
    hasUserSmiled,
    photoCommentsState,
    setHasUserLiked,
    setHasUserLoved,
    setHasUserSmiled,
  } = usePhotoReactions({
    photoLikes,
    photoLoves,
    photoSmiles,
    photoComments,
    user,
  });

  const [newPhotoComment, setNewPhotoComment] = React.useState<string>('');

  return (
    <PhotoViewerRoot
      open={isPhotoViewerOpen}
      slotProps={{ root: { style: { zIndex: 2003 } } }}
      $isDarkMode={isDarkMode}
    >
      <>
        {photoURL && (
          <PhotoViewerContentContainer $isDarkMode={isDarkMode}>
            <div tw='bg-[#000000] md:bg-[#00000099] w-full md:w-2/3'>
              <div tw='flex items-center justify-center md:h-screen'>
                <div tw='absolute flex flex-col gap-2 left-2 top-2'>
                  <PhotoViewerButton
                    fullWidth
                    onClick={() => {
                      router.replace({
                        pathname: isPhotoViewerBackBtnShown
                          ? '/'
                          : `/photos/${router.query.albumID}`,
                      });
                    }}
                    size='small'
                    variant='outlined'
                    $bgColor={tw`bg-secondary hover:bg-secondary`}
                    $borderColor={tw`border-secondary hover:border-secondary`}
                  >
                    <span tw='hidden md:inline-block'>Close</span>
                    <span tw='md:hidden'>
                      <DrillyTypography variant='h5' $isDarkMode={isDarkMode}>
                        &#10539;
                      </DrillyTypography>
                    </span>
                  </PhotoViewerButton>
                </div>
                <Image
                  alt='selected-image'
                  height={0}
                  sizes='100vw'
                  src={photoURL}
                  tw='max-h-[700px] object-fill w-fit'
                  width={0}
                />
                {/* <Image
                  alt='selected-image'
                  height={0}
                  sizes='100vw'
                  src={photoURL}
                  tw='max-h-[700px] inline-block object-fill w-fit md:hidden'
                  width={0}
                /> */}
              </div>
            </div>
            <PhotoViewerActionsPanel $isDarkMode={isDarkMode}>
              <div tw='p-8'>
                <DrillyTypography variant='h5' $isDarkMode={isDarkMode}>
                  {photoTitle}
                </DrillyTypography>
                <div tw='flex'>
                  <PhotoReactionButton
                    handleReactionClick={async () =>
                      await handleReactionClick({
                        authorAvatarUrl: user?.avatarURL,
                        authorId: user?.userID,
                        authorName: `${user?.firstName} ${user?.lastName}`,
                        hasUserReacted: hasUserLiked,
                        photoAlbumId: selectedPhotoAlbum?._id,
                        photoAlbumName: selectedPhotoAlbum?.albumName,
                        photoId: photoId,
                        photoUrl: photoURL,
                        reactionType: 'like',
                        setHasUserReacted: setHasUserLiked,
                        to: photoAuthorFirstName,
                        toId: photoAuthorId,
                      })
                    }
                    hasUserLiked={hasUserLiked}
                    reactions={photoLikes}
                    reactionType='like'
                  />
                  <PhotoReactionButton
                    handleReactionClick={async () =>
                      await handleReactionClick({
                        authorAvatarUrl: user?.avatarURL,
                        authorId: user?.userID,
                        authorName: `${user?.firstName} ${user?.lastName}`,
                        hasUserReacted: hasUserLoved,
                        photoAlbumId: selectedPhotoAlbum?._id,
                        photoAlbumName: selectedPhotoAlbum?.albumName,
                        photoId: photoId,
                        photoUrl: photoURL,
                        reactionType: 'love',
                        setHasUserReacted: setHasUserLoved,
                        to: photoAuthorFirstName,
                        toId: photoAuthorId,
                      })
                    }
                    hasUserLoved={hasUserLoved}
                    reactions={photoLoves}
                    reactionType='love'
                  />
                  <PhotoReactionButton
                    handleReactionClick={async () =>
                      await handleReactionClick({
                        authorAvatarUrl: user?.avatarURL,
                        authorId: user?.userID,
                        authorName: `${user?.firstName} ${user?.lastName}`,
                        hasUserReacted: hasUserSmiled,
                        photoAlbumId: selectedPhotoAlbum?._id,
                        photoAlbumName: selectedPhotoAlbum?.albumName,
                        photoId: photoId,
                        photoUrl: photoURL,
                        reactionType: 'smile',
                        setHasUserReacted: setHasUserSmiled,
                        to: photoAuthorFirstName,
                        toId: photoAuthorId,
                      })
                    }
                    hasUserSmiled={hasUserSmiled}
                    reactions={photoSmiles}
                    reactionType='smile'
                  />
                </div>
                <>
                  <PhotoViewerCommentInput
                    tw='mt-4'
                    fullWidth
                    multiline
                    placeholder='Leave a comment...'
                    onChange={e => setNewPhotoComment(e.target.value)}
                    rows={3}
                    value={newPhotoComment}
                    $isDarkMode={isDarkMode}
                  />
                  <div tw='flex justify-end'>
                    <Button
                      onClick={async () => {
                        await handleReactionClick({
                          authorId: user?.userID,
                          authorName: `${user?.firstName} ${user?.lastName}`,
                          comment: { date: new Date().toString(), text: newPhotoComment },
                          photoAlbumId: selectedPhotoAlbum?._id,
                          photoAlbumName: selectedPhotoAlbum?.albumName,
                          photoId: photoId,
                          photoUrl: photoURL,
                          reactionType: 'comment',
                          to: photoAuthorFirstName,
                          toId: photoAuthorId,
                        });

                        setNewPhotoComment('');
                      }}
                      style={{
                        maxWidth: '30px',
                        maxHeight: '30px',
                        minWidth: '20px',
                        minHeight: '30px',
                      }}
                    >
                      <AddCommentIcon />
                    </Button>
                  </div>
                </>
                {photoCommentsState?.map(photoComment => (
                  <PhotoComment
                    photoComment={photoComment}
                    isUserCommentAuthor={photoComment.authorId === user?.userID}
                  />
                ))}
              </div>
            </PhotoViewerActionsPanel>
          </PhotoViewerContentContainer>
        )}
      </>
    </PhotoViewerRoot>
  );
};

export const PhotoViewerActionsPanel = styled.div<{ $isDarkMode?: boolean }>(({ $isDarkMode }) => [
  $isDarkMode && tw`bg-gray-900`,
  !$isDarkMode && tw`bg-white`,
  tw`h-full`,
  tw`overflow-auto`,
  tw`w-full`,
  tw`md:h-screen`,
  tw`md:w-1/3`,
]);

export const PhotoViewerButton = styled(Button)<{
  $bgColor: TwStyle;
  $borderColor: TwStyle;
}>(({ $bgColor, $borderColor }) => [
  tw`!bg-opacity-40`,
  tw`text-white`,
  tw`hover:!bg-opacity-60`,
  tw`md:m-0`,
  tw`md:px-2`,
  $bgColor,
  $borderColor,
]);

export const PhotoViewerCommentInput = styled(TextField)<{ $isDarkMode?: boolean }>(
  ({ $isDarkMode }) => [
    {
      '.MuiInputBase-root': [$isDarkMode && tw`bg-gray-200`],
    },
  ],
);

const PhotoViewerContentContainer = styled.div<{ $isDarkMode?: boolean }>(({ $isDarkMode }) => [
  !$isDarkMode && tw`bg-white`,
  $isDarkMode && tw`bg-gray-900`,
  tw`min-h-screen`,
  tw`md:flex`,
  tw`md:justify-between`,
]);

export const PhotoViewerRoot = styled(Modal)<{ $isDarkMode?: boolean }>(({ $isDarkMode }) => [
  tw`absolute`,
  tw`block`,
  tw`h-full`,
  tw`overflow-y-auto`,
  tw`top-0`,
]);

