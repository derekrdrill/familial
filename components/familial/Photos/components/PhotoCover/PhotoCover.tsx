import React from 'react';
import styled from '@emotion/styled';
import tw from 'twin.macro';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Button, CircularProgress } from '@mui/material';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteForever from '@mui/icons-material/DeleteForever';

import GlobalContext from '../../../../../context/GlobalContext';
import { GlobalReducerActionEnum } from '../../../../../context/GlobalReducer';
import { PhotoCoverModal } from './components/PhotoCoverModal';

import { Photos } from '../../../../../types';
import { Shimmer } from 'react-shimmer';

type PhotoCoverProps = {
  photoListItem: {
    _id?: string;
    authorId?: string;
    albumName?: string;
    photos?: Photos[] | undefined;
    title?: string;
    url?: string;
  };
  photoURL: string;
};

export const PhotoCover = ({ photoListItem, photoURL }: PhotoCoverProps) => {
  const router = useRouter();

  const {
    dispatch,
    state: { photosView, user },
  } = React.useContext(GlobalContext);

  const [isPhotoLoading, setIsPhotoLoading] = React.useState<boolean>(true);
  const [isUserAuthor, setIsUserAuthor] = React.useState<boolean>(false);
  const [photoCoverModalType, setPhotoCoverModalType] = React.useState<'delete' | 'edit'>();

  React.useEffect(() => {
    dispatch({
      type: GlobalReducerActionEnum.SET_PHOTOS_VIEW,
      payload: { photosView: 'grid' },
    });
  }, []);

  React.useEffect(() => {
    if (user?.userID) {
      setIsUserAuthor(user?.userID === photoListItem.authorId);
    }
  }, [user]);

  return (
    <>
      <PhotoCoverRoot
        onClick={() => {
          router.push({
            pathname: router.query.albumID
              ? `/photos/${router.query.albumID}`
              : `/photos/${photoListItem._id}`,
            ...(router.query.albumID && { query: { p: photoListItem._id } }),
          });
        }}
        $isAlbumsPage={!router.pathname.includes('[albumID]')}
        $isUserAuthor={isUserAuthor}
      >
        {isPhotoLoading && <Shimmer height={200} width={200} />}
        {!isPhotoLoading && (
          <>
            <PhotoCoverImageControlButtonDiv>
              <PhotoCoverImageControlButton
                color='inherit'
                onClick={e => {
                  e.stopPropagation();
                  setPhotoCoverModalType('delete');
                }}
                variant='outlined'
                $isDelete
                $isUserAuthor={isUserAuthor}
                $isLoading={isPhotoLoading}
              >
                <DeleteForever />
              </PhotoCoverImageControlButton>
              <PhotoCoverImageControlButton
                color='inherit'
                onClick={e => {
                  e.stopPropagation();
                  setPhotoCoverModalType('edit');
                }}
                variant='outlined'
                $isEdit
                $isUserAuthor={isUserAuthor}
                $isLoading={isPhotoLoading}
              >
                <EditTwoToneIcon />
              </PhotoCoverImageControlButton>
            </PhotoCoverImageControlButtonDiv>
          </>
        )}
        <PhotoCoverImage
          alt='album-cover'
          height={0}
          onLoad={() => setIsPhotoLoading(false)}
          sizes='100vw'
          src={photoURL}
          width={0}
          $isAlbumsPage={!router.pathname.includes('[albumID]')}
          $isLoading={isPhotoLoading}
          $photosView={photosView}
        />
      </PhotoCoverRoot>
      <PhotoCoverModal
        albumPhotos={photoListItem.photos}
        isDeleting={photoCoverModalType === 'delete'}
        isEditing={photoCoverModalType === 'edit'}
        isModalOpen={!!photoCoverModalType}
        photoAlbumName={photoListItem.albumName}
        photoId={photoListItem._id}
        photoTitle={router.query.albumID ? photoListItem.title : photoListItem.albumName}
        photoURL={photoListItem.url}
        setIsModalOpen={setPhotoCoverModalType}
      />
    </>
  );
};

export const PhotoCoverRoot = styled.div<{
  $isAlbumsPage?: boolean;
  $isLoading?: boolean;
  $isUserAuthor?: boolean;
}>(({ $isAlbumsPage, $isLoading, $isUserAuthor }) => [
  $isAlbumsPage && tw`pl-2`,
  tw`sm:pl-2`,
  tw`py-2`,
  tw`w-full`,
  tw`cursor-pointer`,
  {
    ':hover': {
      button: $isUserAuthor && !$isLoading && [tw`visible`],
    },
    button: [tw`invisible`],
  },
]);

export const PhotoCoverImage = styled(Image)<{
  $isAlbumsPage?: boolean;
  $isLoading: boolean;
  $photosView?: 'grid' | 'list';
}>(({ $isAlbumsPage, $isLoading, $photosView }) => [
  !$isAlbumsPage && $photosView === 'grid' && tw`h-full`,
  !$isAlbumsPage && $photosView === 'grid' && tw`sm:h-96`,
  !$isAlbumsPage && $photosView === 'grid' && tw`lg:h-60`,
  !$isAlbumsPage && $photosView === 'grid' && tw`xl:h-48`,
  $isAlbumsPage && $photosView === 'grid' && tw`h-40`,
  $isAlbumsPage && $photosView === 'grid' && tw`md:h-48`,
  $isLoading && tw`invisible`,
  $photosView === 'grid' && tw`-mt-9`,
  $photosView === 'grid' && tw`object-cover`,
  $photosView === 'grid' && tw`w-full`,
  $photosView === 'list' && tw`h-full`,
  $photosView === 'list' && tw`w-fit`,
  $photosView === 'list' && tw`inline-block`,
  $photosView === 'list' && tw`-translate-y-10`,
  tw`cursor-pointer`,
  tw`rounded-2xl`,
  {
    overflowClipMargin: 'unset',
  },
]);

export const PhotoCoverImageControlButtonDiv = styled.div([tw`relative`, tw`mx-2`, tw`z-10`]);

export const PhotoCoverImageControlButton = styled(Button)<{
  $isDelete?: boolean;
  $isEdit?: boolean;
  $isLoading?: boolean;
  $isUserAuthor?: boolean;
}>(({ $isDelete, $isEdit, $isLoading, $isUserAuthor }) => [
  {
    maxWidth: '30px',
    maxHeight: '30px',
    minWidth: '30px',
    minHeight: '30px',
  },
  $isDelete && tw`text-red-600`,
  $isDelete && tw`bg-red-200`,
  $isDelete && tw`hover:bg-red-300`,
  $isEdit && tw`text-blue-500`,
  $isEdit && tw`bg-blue-200`,
  $isEdit && tw`hover:bg-blue-300`,
  ($isLoading || $isUserAuthor) && tw`invisible`,
]);
