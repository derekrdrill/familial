import * as React from 'react';
import { GridProps } from '@mui/material';

import { QuickMenuRoot } from './style';

type QuickMenuProps = GridProps & {
  isQuickMenuOpen: boolean;
};

const QuickMenu = ({ children, isQuickMenuOpen }: QuickMenuProps) => {
  return (
    <QuickMenuRoot display={{ xs: 'none', lg: 'block' }} $isQuickMenuOpen={isQuickMenuOpen}>
      {children}
    </QuickMenuRoot>
  );
};

export default QuickMenu;
