import styled from 'styled-components';
import { Grid } from '@mui/material';

export const OverlayRoot = styled(Grid)({
  backgroundColor: 'gray',
  height: '100%',
  left: 0,
  minHeight: '100%',
  minWidth: '100%',
  opacity: 0.6,
  position: 'fixed',
  top: 0,
  width: '100%',
});
