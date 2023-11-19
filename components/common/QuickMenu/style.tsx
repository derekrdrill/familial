import styled from 'styled-components';
import { Grid } from '@mui/material';

export const QuickMenuRoot = styled(Grid)<{ $isQuickMenuOpen?: boolean }>(
  ({ $isQuickMenuOpen }) => ({
    backgroundColor: '#FFFFFF',
    boxShadow: '0 4px 2px -2px gray',
    left: 0,
    height: 400,
    minWidth: '100%',
    position: 'fixed',
    top: 123,
    transform: $isQuickMenuOpen ? 'none' : 'translateY(-105%)',
    transition: 'transform 300ms linear',
    width: '100%',
    zIndex: 2,
  }),
);
