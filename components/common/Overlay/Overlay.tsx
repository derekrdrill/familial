import * as React from 'react';
import { GridProps } from '@mui/material';

import { OverlayRoot } from './styles';

export const getOverlayDisplay = (isOverlayVisible: boolean) =>
  isOverlayVisible ? 'block' : 'none';

export const getZIndex = (isSidebarOpen: boolean) => (isSidebarOpen ? 4 : 1);

type OverlayProps = {
  isSidebarOpen: boolean;
};

const Overlay = ({ isSidebarOpen }: GridProps & OverlayProps) => (
  <OverlayRoot
    display={{
      xs: getOverlayDisplay(isSidebarOpen),
    }}
    sx={{ zIndex: getZIndex(isSidebarOpen) }}
  />
);

export default Overlay;
