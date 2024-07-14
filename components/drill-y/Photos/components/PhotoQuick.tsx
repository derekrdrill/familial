import React from 'react';
import Image from 'next/image';
import styled from '@emotion/styled';
import tw from 'twin.macro';
import Link from 'next/link';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { IconButton } from '@mui/material';

import GlobalContext from '../../../../context/GlobalContext';

type PhotoQuickProps = {
  photoAlbumID: string;
  photoID: string;
  photoTitle: string;
  photoUrl: string;
};

const PhotoQuick = ({
  photoAlbumID,
  photoID,
  photoTitle,
  photoUrl,
}: PhotoQuickProps) => {
  const {
    state: { isDarkMode },
  } = React.useContext(GlobalContext);
  return (
    <Link
      href={{
        pathname: `/photos/${photoAlbumID}`,
        query: {
          p: photoID,
        },
      }}
    >
      <PhotoQuickRoot $isDarkMode={isDarkMode}>
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
        <PhotoQuickTitleText $isDarkMode={isDarkMode}>
          {photoTitle}
        </PhotoQuickTitleText>
        <div tw='gap-0 grid grid-cols-3 mx-14'>
          <div tw='col-span-1 flex justify-center'>
            <IconButton color='info' size='small'>
              <ThumbUpOffAltIcon />
            </IconButton>
          </div>
          <div tw='col-span-1 flex justify-center'>
            <IconButton color='error' size='small'>
              <FavoriteBorderIcon />
            </IconButton>
          </div>
          <div tw='col-span-1 flex justify-center'>
            <IconButton color='secondary' size='small'>
              <TagFacesIcon />
            </IconButton>
          </div>
        </div>
        <PhotoQuickAddedByText $isDarkMode={isDarkMode}>
          added by Derek
        </PhotoQuickAddedByText>
      </PhotoQuickRoot>
    </Link>
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
    tw`text-3xl`,
    tw`text-center`,
    tw`md:text-base`,
  ],
);

const PhotoQuickRoot = styled.div<{ $isDarkMode?: boolean }>(
  ({ $isDarkMode }) => [
    !$isDarkMode && tw`bg-gray-DADADA`,
    $isDarkMode && tw`bg-gray-696969`,
    tw`cursor-pointer`,
    tw`px-2`,
    tw`rounded`,
    tw`w-full`,
  ],
);

const PhotoQuickImage = styled(Image)([
  tw`h-80`,
  tw`object-cover`,
  tw`h-80`,
  tw`object-cover`,
  tw`w-full`,
  tw`md:h-52`,
  {
    overflowClipMargin: 'unset',
  },
]);


export { PhotoQuick };
