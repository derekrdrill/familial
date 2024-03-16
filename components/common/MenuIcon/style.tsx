import styled from 'styled-components';
import { Grid } from '@mui/material';

export const MenuIconContainer = styled(Grid)<{
  $isMenuIconActive: boolean;
}>(({ $isMenuIconActive }) => ({
  '&:hover': {
    '.menu-icon-line': {
      backgroundColor: '#a501c6',
    },
    '.menu-icon-line-top': {
      transform: $isMenuIconActive
        ? 'rotate(-28deg) translate(-5px, 7px)'
        : 'rotate(28deg) translate(32px, -7px)',
      width: 30,
    },
    '.menu-icon-line-bottom': {
      transform: $isMenuIconActive
        ? 'rotate(28deg) translate(-5px, -7px)'
        : 'rotate(-28deg) translate(32px, 7px)',
      width: 30,
    },
    transition: 'all 150ms linear',
  },
  '.menu-icon-line-top': {
    transform: $isMenuIconActive ? 'rotate(-28deg) translate(-5px, 7px)' : 'none',
    width: $isMenuIconActive ? 30 : 58,
  },
  '.menu-icon-line-middle': {
    width: 58,
  },
  '.menu-icon-line-bottom': {
    transform: $isMenuIconActive ? 'rotate(28deg) translate(-5px, -7px)' : 'none',
    width: $isMenuIconActive ? 30 : 58,
  },
  cursor: 'pointer',
  left: 20,
  position: 'fixed',
  top: 40,
  transition: 'all 150ms linear',
  width: '58px !important',
  zIndex: 6,
}));

export const MenuIconLine = styled(Grid)<{
  $isBottom?: boolean;
}>(({ $isBottom }) => ({
  backgroundColor: '#6a017f',
  borderRadius: 5,
  height: 5,
  marginBottom: !$isBottom ? '10px !important' : '0px !important',
  transition: 'all 150ms linear',
}));
