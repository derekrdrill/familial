import React from 'react';
import tw from 'twin.macro';
import styled from '@emotion/styled';
import { Button, Grid } from '@mui/material';
import AppsIcon from '@mui/icons-material/Apps';
import ListIcon from '@mui/icons-material/List';

import GlobalContext from '../../../../../../../context/GlobalContext';
import { GlobalReducerActionEnum } from '../../../../../../../context/GlobalReducer';

const PhotoInfoAndActionsViewButtons = () => {
  const {
    dispatch,
    state: { albums, photosView },
  } = React.useContext(GlobalContext);

  return (
    albums?.length && (
      <Grid item tw='hidden md:inline-block'>
        <Grid container spacing={1} justifyContent='flex-end'>
          <Grid item xs={7} md={6}>
            <PhotosViewButton
              fullWidth
              onClick={() =>
                dispatch({
                  type: GlobalReducerActionEnum.SET_PHOTOS_VIEW,
                  payload: { photosView: 'grid' },
                })
              }
              startIcon={<AppsIcon />}
              $isActive={photosView === 'grid'}
            >
              Grid
            </PhotosViewButton>
          </Grid>
          <Grid item xs={7} md={6}>
            <PhotosViewButton
              fullWidth
              onClick={() =>
                dispatch({
                  type: GlobalReducerActionEnum.SET_PHOTOS_VIEW,
                  payload: { photosView: 'list' },
                })
              }
              startIcon={<ListIcon />}
              $isActive={photosView === 'list'}
            >
              List
            </PhotosViewButton>
          </Grid>
        </Grid>
      </Grid>
    )
  );
};

export const PhotosViewButton = styled(Button)<{
  $isActive?: boolean;
}>(({ $isActive }) => [
  tw`hover:bg-gray-200`,
  tw`bg-gray-300`,
  tw`opacity-60`,
  tw`text-gray-800`,
  tw`normal-case`,
  $isActive && tw`bg-purple-600`,
  $isActive && tw`hover:bg-purple-500`,
  $isActive && tw`hover:text-purple-200`,
  $isActive && tw`text-purple-200`,
]);

export { PhotoInfoAndActionsViewButtons };
