import React from 'react';
import tw, { TwStyle } from 'twin.macro';
import styled from '@emotion/styled';
import { IconButton } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

import GlobalContext from '../../../context/GlobalContext';
import { GlobalReducerActionEnum } from '../../../context/GlobalReducer';

type DarkModeProps = {
  darkModeContainerStyles?: TwStyle;
};

const DarkMode = ({ darkModeContainerStyles }: DarkModeProps) => {
  const {
    dispatch,
    state: { isDarkMode },
  } = React.useContext(GlobalContext);

  return (
    <DarkModeRoot
      onClick={() => {
        if (isDarkMode) {
          localStorage.removeItem('isDarkMode');
        } else {
          localStorage.setItem('isDarkMode', (!isDarkMode).toString());
        }

        dispatch({
          type: GlobalReducerActionEnum.SET_DARK_MODE,
          payload: { isDarkMode: !isDarkMode },
        });
      }}
      $isDarkMode={isDarkMode}
      $twStyles={darkModeContainerStyles}
    >
      {isDarkMode ? <LightModeIcon tw='h-8 w-8' /> : <DarkModeIcon tw='h-8 w-8' />}
    </DarkModeRoot>
  );
};

export default DarkMode;

export const DarkModeRoot = styled(IconButton)<{ $isDarkMode?: boolean; $twStyles?: TwStyle }>(
  ({ $isDarkMode, $twStyles }) => [
    !$isDarkMode && tw`text-purple-300`,
    $isDarkMode && tw`text-yellow-200`,
    $isDarkMode && tw`hover:bg-gray-900`,
    !$isDarkMode && tw`hover:bg-gray-100`,
    $twStyles,
  ],
);
