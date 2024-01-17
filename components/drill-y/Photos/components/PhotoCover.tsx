import React from 'react';
import styled from '@emotion/styled';
import tw from 'twin.macro';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Grid, Typography } from '@mui/material';
import { Photos } from '../../../../context/types';

type PhotoCoverProps = {
  photoListItem: {
    albumName?: string;
    photos?: Photos[] | undefined;
    title?: string;
    url?: string;
  };
  photoSubtitle?: string;
  photoTitle: string;
  photoURL: string;
  setSelectedAlbum: React.Dispatch<
    React.SetStateAction<{ albumName?: string; photos?: Photos[] | undefined } | null>
  >;
};

export const PhotoCover = ({
  photoTitle,
  photoListItem,
  photoSubtitle,
  photoURL,
  setSelectedAlbum,
}: PhotoCoverProps) => {
  const router = useRouter();

  return (
    <Grid key={photoTitle} item xs={12} sm={6} md={3} xl={2}>
      <PhotoCoverRoot
        alt='album-cover'
        height={300}
        onClick={() => {
          setSelectedAlbum(photoListItem);

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
        }}
        src={photoURL}
        width={300}
      />
      <Typography variant='h6'>{photoTitle}</Typography>
      {photoSubtitle && <Typography variant='subtitle1'>{photoSubtitle}</Typography>}
    </Grid>
  );
};

export const PhotoCoverRoot = styled(Image)([
  tw`border-2`,
  tw`border-gray-100`,
  tw`border-solid`,
  tw`cursor-pointer`,
  tw`hover:opacity-100`,
  tw`opacity-80`,
  tw`rounded-2xl`,
]);
