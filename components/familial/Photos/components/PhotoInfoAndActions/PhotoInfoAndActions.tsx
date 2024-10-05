import React from 'react';
import tw from 'twin.macro';

import styled from '@emotion/styled';
import { Grid } from '@mui/material';

import GlobalContext from '../../../../../context/GlobalContext';

import {
  PhotoInfoAndActionsAddAlbumButton,
  PhotoInfoAndActionsTitle,
  PhotoInfoAndActionsViewButtons,
} from './components';

type PhotoInfoAndActionsProps = {
  onImageUpload?: () => void;
  photosLayoutTitle: string;
};

const PhotoInfoAndActions = ({ onImageUpload, photosLayoutTitle }: PhotoInfoAndActionsProps) => {
  const {
    state: { isDarkMode },
  } = React.useContext(GlobalContext);

  return (
    <PhotoInfoAndActionsContainer item xs={12} $isDarkMode={isDarkMode}>
      <Grid container justifyContent='space-between'>
        <PhotoInfoAndActionsTitle
          photosLayoutTitle={photosLayoutTitle}
          onImageUpload={onImageUpload}
        />
        <PhotoInfoAndActionsAddAlbumButton />
        <PhotoInfoAndActionsViewButtons />
      </Grid>
    </PhotoInfoAndActionsContainer>
  );
};

export const PhotoInfoAndActionsContainer = styled(Grid)<{
  $isDarkMode?: boolean;
}>(({ $isDarkMode }) => [
  !$isDarkMode && tw`bg-gray-100`,
  !$isDarkMode && tw`top-[95px]`,
  $isDarkMode && tw`bg-[#282c34]`,
  $isDarkMode && tw`top-[93px]`,
  tw`mt-4`,
  tw`pb-4`,
  tw`sticky`,
  tw`z-20`,
  tw`md:top-[69px]`,
]);

export { PhotoInfoAndActions };
