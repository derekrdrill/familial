import styled from '@emotion/styled';
import tw from 'twin.macro';
import { AppBar, Grid, IconButton } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Link from 'next/link';

export const HeaderRoot = styled(AppBar)<{ $isDarkMode?: boolean }>(({ $isDarkMode }) => ({
  backgroundColor: `${$isDarkMode ? '#282c34' : 'white'} !important`,
  borderBottom: !$isDarkMode ? '1px solid #DFDFDF' : 'none',
  boxShadow: 'none !important',
  zIndex: '3 !important',
}));

export const HeaderTop = styled(Grid)<{ $isDarkMode?: boolean }>(({ $isDarkMode }) => ({
  borderBottom: !$isDarkMode ? '1px solid #DFDFDF' : 'none',
  padding: '10px 20px 4px 20px',
}));

export const HeaderLogo = styled.img([tw`cursor-pointer h-20 lg:h-14 hover:opacity-[0.8]`]);

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

export const HeaderNotificationIcon = styled(NotificationsIcon)<{ $isDarkMode?: boolean }>(
  ({ $isDarkMode }) => [!$isDarkMode && tw`text-black`, $isDarkMode && tw`text-white`],
);
