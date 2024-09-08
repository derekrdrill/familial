import Link from 'next/link';
import styled from 'styled-components';
import tw from 'twin.macro';
import { Grid, Typography } from '@mui/material';

export const SidebarRoot = styled(Grid)<{
  $isSidebarOpen: boolean;
  $isDarkMode?: boolean;
  $padding?: string;
  $side?: 'left' | 'right';
  $zIndex?: number;
}>(({ $isDarkMode, $isSidebarOpen, $padding, $side = 'left', $zIndex = 5 }) => [
  !$isDarkMode && tw`bg-[#f5f5f5]`,
  $isDarkMode && tw`bg-[#1b2328]`,
  tw`bottom-0`,
  tw`fixed`,
  tw`h-full`,
  tw`min-h-full`,
  tw`w-full`,
  tw`top-0`,
  tw`sm:w-[450px]`,
  {
    padding: $padding ?? 10,
    transition: 'transform 500ms ease-in',
    zIndex: $zIndex,
    ...($side === 'left' && { left: 0, transform: $isSidebarOpen ? 'none' : 'translateX(-100%)' }),
    ...($side === 'right' && { right: 0, transform: $isSidebarOpen ? 'none' : 'translateX(110%)' }),
  },
]);

export const SidebarMenuText = styled(Typography)({
  '&:hover': {
    backgroundPositionX: '0%',
    backgroundSize: '100% 0.1em',
  },
  backgroundImage: 'linear-gradient(#212121, #212121)',
  backgroundPositionX: '100%',
  backgroundPositionY: '100%',
  backgroundRepeat: 'no-repeat',
  backgroundSize: '0% 0.1em',
  color: 'black',
  cursor: 'pointer',
  fontFamily: `'Josefin Sans', sans-serif !important`,
  fontWeight: '600 !important',
  textDecoration: 'none',
  textTransform: 'uppercase',
  transition: 'background-size 0.2s ease-in-out',
});

export const SidebarMenuLink = styled(Link)({
  textDecoration: 'none',
});
