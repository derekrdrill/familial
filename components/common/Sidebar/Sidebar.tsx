import * as React from 'react';

import GlobalContext from '../../../context/GlobalContext';
import { SidebarRoot } from './style';

type SidebarProps = {
  children: React.ReactNode;
  isMobileOnly?: boolean;
  isSidebarOpen: boolean;
  padding?: string;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  side: 'left' | 'right';
  zIndex?: number;
};

const Sidebar = ({
  children,
  isMobileOnly,
  isSidebarOpen,
  padding,
  setIsSidebarOpen,
  side,
  zIndex,
}: SidebarProps) => {
  const {
    state: { isDarkMode },
  } = React.useContext(GlobalContext);

  return (
    <SidebarRoot
      display={{ xs: 'block', md: isMobileOnly ? 'none' : 'block' }}
      $isDarkMode={isDarkMode}
      $isSidebarOpen={isSidebarOpen}
      $padding={padding}
      $side={side}
      $zIndex={zIndex}
    >
      {children}
    </SidebarRoot>
  );
};

export default Sidebar;
