import React from 'react';
import tw from 'twin.macro';
import styled from '@emotion/styled';
import { IconButton } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

import GlobalContext from '../../../context/GlobalContext';
import { GlobalReducerActionEnum } from '../../../context/GlobalReducer';

type DarkModeProps = {};

const DarkMode = (props: DarkModeProps) => {
  const {
    dispatch,
    state: { isDarkMode },
  } = React.useContext(GlobalContext);

  return (
    <DarkModeRoot
      onClick={() =>
        dispatch({
          type: GlobalReducerActionEnum.SET_DARK_MODE,
          payload: { isDarkMode: !isDarkMode },
        })
      }
      $isDarkMode={isDarkMode}
    >
      {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
    </DarkModeRoot>
  );
};

export default DarkMode;

export const DarkModeRoot = styled(IconButton)<{ $isDarkMode?: boolean }>(({ $isDarkMode }) => [
  !$isDarkMode && tw`text-purple-300`,
  $isDarkMode && tw`text-yellow-200`,
  $isDarkMode && tw`hover:bg-gray-900`,
  !$isDarkMode && tw`hover:bg-gray-100`,
]);
