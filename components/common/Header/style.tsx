import styled from '@emotion/styled';
import tw from 'twin.macro';
import { AppBar, Grid, Icon, IconButton, TextField } from '@mui/material';
import Link from 'next/link';

export const HeaderRoot = styled(AppBar)<{ $isDarkMode?: boolean }>(({ $isDarkMode }) => ({
  backgroundColor: `${$isDarkMode ? 'black' : 'white'} !important`,
  borderBottom: !$isDarkMode ? '1px solid #DFDFDF' : 'none',
  boxShadow: 'none !important',
  zIndex: '3 !important',
}));

export const HeaderTop = styled(Grid)<{ $isDarkMode?: boolean }>(({ $isDarkMode }) => ({
  borderBottom: !$isDarkMode ? '1px solid #DFDFDF' : 'none',
  padding: '6px 8px',
}));

export const HeaderLogo = styled.img({
  '&:hover': {
    opacity: 0.8,
  },
  cursor: 'pointer',
  height: 40,
  width: 50,
});

export const HeaderSearchField = styled(TextField)<{ $isDarkMode?: boolean }>(({ $isDarkMode }) => [
  {
    '.MuiOutlinedInput-root': {
      fieldset: {
        border: `1px lightgrey solid ${$isDarkMode ? '!important' : ''}`,
        borderRadius: 20,
        backgroundColor: 'invisible',
      },
      input: {
        '::placeholder': {
          color: $isDarkMode ? 'white' : 'inherit',
        },
      },
    },
  },
]);

export const HeaderSearchFieldIconButton = styled(IconButton)<{ $isDarkMode?: boolean }>(
  ({ $isDarkMode }) => [$isDarkMode && tw`text-white`],
);

export const HeaderMenuButton = styled(IconButton)<{ $isDarkMode?: boolean }>(({ $isDarkMode }) => [
  {
    borderRadius: '2px !important',
    width: 95,
  },
  $isDarkMode && tw`text-amber-50`,
]);

export const HeaderMenuLink = styled(Link)<{ $isDarkMode?: boolean }>(({ $isDarkMode }) => [
  $isDarkMode && tw`hover:bg-gray-900`,
  !$isDarkMode && tw`hover:bg-purple-200`,
]);

export const HeaderProfileButton = styled(IconButton)<{ $isDarkMode?: boolean }>(
  ({ $isDarkMode }) => [
    $isDarkMode && tw`text-amber-50`,
    $isDarkMode && tw`hover:bg-gray-900`,
    !$isDarkMode && tw`hover:bg-gray-100`,
  ],
);
