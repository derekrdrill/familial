import React from 'react';
import { useRouter } from 'next/router';
import tw from 'twin.macro';
import styled from '@emotion/styled';
import { Grid } from '@mui/material';
import AddAPhotoTwoTone from '@mui/icons-material/AddAPhotoTwoTone';

import GlobalContext from '../../../../../context/GlobalContext';

import { PhotoCover } from '../PhotoCover/PhotoCover';
import { DrillyTypography } from '../../../../../styles/globals';

type PhotoAlbumPhotosProps = {
  onImageUpload?: () => void;
};

const PhotoAlbumPhotos = ({ onImageUpload }: PhotoAlbumPhotosProps) => {
  const router = useRouter();

  const {
    state: { isDarkMode, photos, photosView },
  } = React.useContext(GlobalContext);

  return (
    !!router.query.albumID && (
      <Grid container>
        <PhotoUploaderTile
          item
          onClick={onImageUpload}
          xs={12}
          sm={photosView === 'list' ? 12 : 6}
          md={photosView === 'list' ? 12 : 4}
          lg={photosView === 'list' ? 12 : 2}
        >
          <PhotoAlbumsAddTextContainer
            container
            tw='w-full'
            $isDarkMode={isDarkMode}
            $photosView={photosView}
          >
            <DrillyTypography variant='subtitle2' $isDarkMode={isDarkMode}>
              Add to album <AddAPhotoTwoTone />
            </DrillyTypography>
          </PhotoAlbumsAddTextContainer>
        </PhotoUploaderTile>
        {photos?.map(photoListItem => (
          <>
            {photosView === 'list' && (
              <Grid item xs={0} sm={2} md={3} lg={4} display={{ xs: 'none', sm: 'inline-block' }} />
            )}
            <Grid
              item
              xs={12}
              sm={photosView === 'list' ? 8 : 6}
              md={photosView === 'list' ? 6 : 4}
              lg={photosView === 'list' ? 4 : 2}
              tw='flex justify-center'
            >
              <PhotoCover
                key={photoListItem._id}
                photoListItem={photoListItem}
                photoURL={photoListItem.url}
              />
            </Grid>
            {photosView === 'list' && (
              <Grid item xs={0} sm={2} md={3} lg={4} display={{ xs: 'none', sm: 'inline-block' }} />
            )}
          </>
        ))}
      </Grid>
    )
  );
};

export const PhotoUploaderTile = styled(Grid)([tw`mb-2`]);
export const PhotoAlbumsAddTextContainer = styled(Grid)<{
  $isDarkMode?: boolean;
  $photosView?: 'grid' | 'list';
}>(({ $isDarkMode, $photosView }) => [
  !$isDarkMode && tw`bg-gray-200`,
  $isDarkMode && tw`bg-gray-900`,
  $photosView === 'grid' && tw`rounded-lg`,
  $photosView === 'grid' && tw`sm:rounded-2xl`,
  $photosView === 'grid' && tw`sm:pl-3`,
  $photosView === 'grid' && tw`sm:pt-3`,
  $photosView === 'list' && tw`rounded-lg`,
  $photosView === 'list' && tw`sm:pt-6`,
  $photosView === 'list' && tw`sm:pb-6`,
  tw`cursor-pointer`,
  tw`h-full`,
  tw`px-3`,
  tw`py-3`,
  tw`hover:opacity-80`,
]);

export { PhotoAlbumPhotos };
