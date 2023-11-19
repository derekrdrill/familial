import * as React from 'react';
import { GridProps } from '@mui/material';

import { OverlayRoot } from './styles';

export const getOverlayDisplay = (isOverlayVisible: boolean) =>
  isOverlayVisible ? 'block' : 'none';

export const getZIndexSmall = (isSidebarOpen: boolean) => (isSidebarOpen ? 4 : 1);
export const getZIndexLarge = (isQuickViewOpen: boolean) => (isQuickViewOpen ? 1 : 4);

interface OverlayProps extends GridProps {
  isQuickViewOpen: boolean;
  isSidebarOpen: boolean;
}

const Overlay = ({ isSidebarOpen, isQuickViewOpen }: OverlayProps) => (
  <OverlayRoot
    display={{
      xs: getOverlayDisplay(isSidebarOpen),
      lg: getOverlayDisplay(isQuickViewOpen),
    }}
    sx={{ zIndex: { xs: getZIndexSmall(isSidebarOpen), lg: getZIndexLarge(isQuickViewOpen) } }}
  />
);

export default Overlay;
