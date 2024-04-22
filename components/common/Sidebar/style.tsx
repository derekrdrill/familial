import styled from 'styled-components';
import { Grid, Typography } from '@mui/material';
import Link from 'next/link';

export const SidebarRoot = styled(Grid)<{
  $isSidebarOpen: boolean;
  $isDarkMode?: boolean;
  $padding?: string;
  $side?: 'left' | 'right';
}>(({ $isDarkMode, $isSidebarOpen, $padding, $side = 'left' }) => ({
  backgroundColor: $isDarkMode ? '#1b2328' : '#f5f5f5',
  bottom: 0,
  height: '100%',
  minHeight: '100%',
  padding: $padding ?? 10,
  position: 'fixed',
  top: 0,
  transition: 'transform 500ms ease-in',
  width: 450,
  zIndex: 5,
  ...($side === 'left' && { left: 0, transform: $isSidebarOpen ? 'none' : 'translateX(-100%)' }),
  ...($side === 'right' && { right: 0, transform: $isSidebarOpen ? 'none' : 'translateX(110%)' }),
}));

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
