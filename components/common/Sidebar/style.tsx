import styled from 'styled-components';
import { Grid } from '@mui/material';
import Link from 'next/link';

export const SidebarRoot = styled(Grid)<{ $isSidebarOpen: boolean }>(({ $isSidebarOpen }) => ({
  backgroundColor: '#f5f5f5',
  bottom: 0,
  height: '100%',
  left: 0,
  minHeight: '100%',
  padding: '150px 200px 10px 30px',
  position: 'fixed',
  top: 0,
  transform: $isSidebarOpen ? 'none' : 'translateX(-100%)',
  transition: 'transform 500ms ease-in',
  width: 400,
  zIndex: 5,
}));

export const SidebarMenuText = styled.h1({
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
