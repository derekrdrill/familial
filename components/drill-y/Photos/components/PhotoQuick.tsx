import React from 'react';
import Image from 'next/image';
import styled from '@emotion/styled';
import tw from 'twin.macro';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { IconButton } from '@mui/material';

type PhotoQuickProps = {
  photoTitle: string;
  photoUrl: string;
};

const PhotoQuick = ({ photoTitle, photoUrl }: PhotoQuickProps) => {
  return (
    <div tw='bg-gray-DADADA px-2 rounded w-full'>
      <div tw='bg-white relative top-2'>
        <PhotoQuickRoot
          alt='album-cover'
          height={0}
          loading='lazy'
          onLoad={() => null}
          sizes='100vw'
          src={photoUrl}
          width={0}
        />
      </div>
      <h3 tw='mt-3 text-3xl text-center text-black md:text-base'>
        {photoTitle}
      </h3>
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
      <p tw='text-gray-777777 text-right text-xs'>added by Derek</p>
    </div>
  );
};

const PhotoQuickRoot = styled(Image)([
  tw`h-80`,
  tw`object-cover`,
  tw`w-full`,
  tw`md:h-52`,
  {
    overflowClipMargin: 'unset',
  },
]);

export { PhotoQuick };
