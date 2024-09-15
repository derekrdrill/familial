import React from 'react';
import { useRouter } from 'next/router';
import tw, { TwStyle } from 'twin.macro';

import styled from '@emotion/styled';
import AddAPhotoTwoTone from '@mui/icons-material/AddAPhotoTwoTone';
import { Button, Grid } from '@mui/material';

import GlobalContext from '../../../../../../../context/GlobalContext';

import { DrillyTypography } from '../../../../../../../styles/globals';

type PhotoInfoAndActionsTitleProps = {
  photosLayoutTitle: string;
  onImageUpload?: () => void;
};

const PhotoInfoAndActionsTitle = ({
  photosLayoutTitle,
  onImageUpload,
}: PhotoInfoAndActionsTitleProps) => {
  const router = useRouter();

  const {
    state: { albums, isDarkMode },
  } = React.useContext(GlobalContext);

  const [isScrollBtnShown, setIsScrollBtnShown] = React.useState<boolean>(false);
  const photoAlbumLength = albums?.length;

  return (
    <PhotosLayoutTitleContainer item $isAlbumOpened={!!!router.query.albumID}>
      <div tw='flex flex-col gap-2'>
        <DrillyTypography variant='h5' $isDarkMode={isDarkMode}>
          {photosLayoutTitle}
        </DrillyTypography>
        {photoAlbumLength && (
          <DrillyTypography
            variant='subtitle1'
            $isDarkMode={isDarkMode}
          >{`${photoAlbumLength} photo${photoAlbumLength === 1 ? '' : 's'}`}</DrillyTypography>
        )}
        {isScrollBtnShown && (
          <PhotoAddButton
            onClick={onImageUpload}
            startIcon={<AddAPhotoTwoTone />}
            variant='outlined'
            $bgColor={tw`bg-info hover:bg-info`}
            $borderColor={tw`border-info hover:border-info`}
            $textColor={tw`text-info hover:text-info`}
          >
            Add to album
          </PhotoAddButton>
        )}
      </div>
    </PhotosLayoutTitleContainer>
  );
};

export const PhotoAddButton = styled(Button)<{
  $bgColor: TwStyle;
  $borderColor: TwStyle;
  $textColor: TwStyle;
}>(({ $bgColor, $borderColor, $textColor }) => [
  tw`!bg-opacity-20`,
  tw`normal-case`,
  tw`shadow-none`,
  tw`hover:!bg-opacity-30`,
  tw`hover:shadow-none`,
  $bgColor,
  $borderColor,
  $textColor,
]);

export const PhotosLayoutTitleContainer = styled(Grid)<{
  $isAlbumOpened: boolean;
}>(({ $isAlbumOpened }) => [
  $isAlbumOpened && tw`flex`,
  $isAlbumOpened && tw`[align-items: flex-end]`,
]);

export { PhotoInfoAndActionsTitle };
