import styled from '@emotion/styled';
import { Grid } from '@mui/material';

export const OverlayRoot = styled(Grid)<{ $opacity?: number; $zIndex?: number }>(
  ({ $opacity = 0.6, $zIndex = 5 }) => [
    {
      backgroundColor: 'gray',
      height: '100%',
      left: 0,
      minHeight: '100%',
      minWidth: '100%',
      opacity: $opacity,
      position: 'fixed',
      top: 0,
      width: '100%',
      zIndex: $zIndex,
    },
  ],
);
