import React from 'react';
import styled from '@emotion/styled';
import tw from 'twin.macro';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { CircularProgress, IconButton } from '@mui/material';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';

import GlobalContext from '../../../../context/GlobalContext';
import { Photos } from '../../../../context/types';
import { GlobalReducerActionEnum } from '../../../../context/GlobalReducer';

type PhotoCoverProps = {
  photoListItem: {
    albumName?: string;
    photos?: Photos[] | undefined;
    title?: string;
    url?: string;
  };
  photoTitle?: string;
  photoURL: string;
  photosView: 'grid' | 'list';
};

export const PhotoCover = ({
  photoTitle,
  photoListItem,
  photoURL,
  photosView,
}: PhotoCoverProps) => {
  const router = useRouter();

  const {
    dispatch,
    state: { selectedPhotoAlbum },
  } = React.useContext(GlobalContext);

  const [isPhotoLoading, setIsPhotoLoading] = React.useState<boolean>(true);

  return (
    <>
      {isPhotoLoading && <CircularProgress tw='z-10 relative top-14 left-5' />}
      <PhotoCoverRoot
        alt='album-cover'
        height={0}
        onClick={() => {
          if (!selectedPhotoAlbum) {
            dispatch({
              type: GlobalReducerActionEnum.SET_SELECTED_PHOTO_ALBUM,
              payload: { selectedPhotoAlbum: photoListItem },
            });

            router.push(
              {
                pathname: '/photos',
                query: {
                  album: photoTitle,
                },
              },
              undefined,
              { shallow: true },
            );
          }
        }}
        onLoad={() => setIsPhotoLoading(false)}
        sizes='100vw'
        src={photoURL}
        width={0}
        $photosView={photosView}
      />
    </>
  );
};

export const PhotoCoverRoot = styled(Image)<{ $photosView: 'grid' | 'list' }>(({ $photosView }) => [
  tw`border-2`,
  tw`border-gray-100`,
  tw`border-solid`,
  tw`cursor-pointer`,
  tw`hover:opacity-100`,
  tw`opacity-80`,
  tw`rounded-2xl`,
  $photosView === 'grid' && tw`h-48`,
  $photosView === 'grid' && tw`object-cover`,
  $photosView === 'grid' && tw`w-full`,
  $photosView === 'list' && tw`h-full`,
  $photosView === 'list' && tw`w-[550px]`,
]);

export const PhotoCoverEditPhotoButton = styled(IconButton)<{}>(() => []);
