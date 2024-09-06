import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import tw, { TwStyle } from 'twin.macro';
import styled from '@emotion/styled';
import { Button, Modal, TextField } from '@mui/material';
import AddCommentIcon from '@mui/icons-material/AddComment';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';

import GlobalContext from '../../../../context/GlobalContext';
import { DrillyTypography } from '../../../../styles/globals';
import { PhotoReactionButton } from '../../Photos';
import usePhotoReactions from '../../../../hooks/photos/usePhotoReactions';

import { PhotoReaction } from '../../../../types';

type PhotoViewerTypes = {
  isPhotoViewerOpen: boolean;
  photoComments?: PhotoReaction[];
  photoId?: string;
  photoLikes?: PhotoReaction[];
  photoLoves?: PhotoReaction[];
  photoSmiles?: PhotoReaction[];
  photoTitle?: string;
  photoURL?: string;
};

export const PhotoViewer = ({
  isPhotoViewerOpen,
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
    state: { isDarkMode, isPhotoViewerBackBtnShown, user },
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

  const [newPhotoComment, setNewPhotoComment] = React.useState<string>('');

  return (
    <PhotoViewerRoot open={isPhotoViewerOpen}>
      <>
        {photoURL && (
          <div tw='md:flex md:justify-between'>
            <div tw='bg-[#00000099] w-full md:w-2/3'>
              <div tw='flex items-center justify-center md:h-screen'>
                <div tw='absolute flex flex-col gap-2 left-2 top-2'>
                  {isPhotoViewerBackBtnShown && (
                    <PhotoViewerButton
                      fullWidth
                      onClick={() => {
                        router.replace('/');
                      }}
                      size='small'
                      variant='outlined'
                      $bgColor={tw`bg-primary hover:bg-primary`}
                      $borderColor={tw`border-primary hover:border-primary`}
                    >
                      <span tw='py-1 md:py-0'>
                        <span tw='hidden md:inline-block'>Go back home</span>
                        <span tw='md:hidden'>
                          <KeyboardDoubleArrowLeftIcon />
                        </span>
                      </span>
                    </PhotoViewerButton>
                  )}
                  <PhotoViewerButton
                    fullWidth
                    onClick={() => {
                      router.replace({
                        pathname: `/photos/${router.query.albumID}`,
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
                  tw='max-h-[700px] hidden w-fit md:inline-block'
                  width={0}
                />
                <Image
                  alt='selected-image'
                  height={0}
                  sizes='100vw'
                  src={photoURL}
                  tw='max-h-[500px] inline-block w-fit md:hidden'
                  width={0}
                />
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
                      handleReactionClick({
                        authorId: user?.userID,
                        authorName: `${user?.firstName} ${user?.lastName}`,
                        hasUserReacted: hasUserLiked,
                        photoId: photoId,
                        reactionType: 'like',
                        setHasUserReacted: setHasUserLiked,
                      })
                    }
                    hasUserLiked={hasUserLiked}
                    reactionType='like'
                  />
                  <PhotoReactionButton
                    handleReactionClick={async () =>
                      handleReactionClick({
                        authorId: user?.userID,
                        authorName: `${user?.firstName} ${user?.lastName}`,
                        hasUserReacted: hasUserLoved,
                        photoId: photoId,
                        reactionType: 'love',
                        setHasUserReacted: setHasUserLoved,
                      })
                    }
                    hasUserLoved={hasUserLoved}
                    reactionType='love'
                  />
                  <PhotoReactionButton
                    handleReactionClick={async () =>
                      handleReactionClick({
                        authorId: user?.userID,
                        authorName: `${user?.firstName} ${user?.lastName}`,
                        hasUserReacted: hasUserSmiled,
                        photoId: photoId,
                        reactionType: 'smile',
                        setHasUserReacted: setHasUserSmiled,
                      })
                    }
                    hasUserSmiled={hasUserSmiled}
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
                          comment: newPhotoComment,
                          photoId: photoId,
                          reactionType: 'comment',
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
                {photoComments?.map(photoComment => (
                  <PhotoViewerCommentContainer
                    $isUserCommentAuthor={photoComment.authorId === user?.userID}
                  >
                    <PhotoViewerCommentAuthor
                      $isUserCommentAuthor={photoComment.authorId === user?.userID}
                    >
                      <DrillyTypography>
                        {`${photoComment.authorName?.charAt(0)}${photoComment.authorName?.charAt(photoComment.authorName?.indexOf(' ') + 1)}`}
                      </DrillyTypography>
                    </PhotoViewerCommentAuthor>
                    <PhotoViewerComment
                      variant='body1'
                      $isDarkMode={isDarkMode}
                      $isUserCommentAuthor={photoComment.authorId === user?.userID}
                    >
                      <div tw='flex flex-col'>
                        {photoComment.comment?.text}
                        <DrillyTypography variant='caption'>
                          {new Date(photoComment.comment?.date ?? '').toLocaleString()}
                        </DrillyTypography>
                      </div>
                    </PhotoViewerComment>
                  </PhotoViewerCommentContainer>
                ))}
              </div>
            </PhotoViewerActionsPanel>
          </div>
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

export const PhotoViewerCommentAuthor = styled.div<{ $isUserCommentAuthor: boolean }>(
  ({ $isUserCommentAuthor }) => [
    $isUserCommentAuthor && tw`order-2`,
    tw`bg-amber-500`,
    tw`flex`,
    tw`items-center`,
    tw`justify-center`,
    tw`my-2`,
    tw`px-1`,
    tw`rounded-2xl`,
  ],
);

export const PhotoViewerComment = styled(DrillyTypography)<{ $isUserCommentAuthor: boolean }>(
  ({ $isUserCommentAuthor }) => [
    $isUserCommentAuthor && tw`bg-blue-300`,
    !$isUserCommentAuthor && tw`bg-blue-800`,
    tw`flex`,
    tw`px-2`,
    tw`py-1`,
    tw`rounded`,
  ],
);

export const PhotoViewerCommentContainer = styled.div<{ $isUserCommentAuthor: boolean }>(
  ({ $isUserCommentAuthor }) => [
    $isUserCommentAuthor && tw`justify-end`,
    tw`flex`,
    tw`gap-1`,
    tw`mt-4`,
  ],
);

export const PhotoViewerCommentInput = styled(TextField)<{ $isDarkMode?: boolean }>(({ $isDarkMode }) => [
  {
    '.MuiInputBase-root': [$isDarkMode && tw`bg-gray-200`],
  },
]);

export const PhotoViewerRoot = styled(Modal)([
  tw`absolute`,
  tw`block`,
  tw`h-full`,
  tw`overflow-y-auto`,
]);

