import * as React from 'react';

import GlobalContext from '../../../context/GlobalContext';
import { SidebarRoot } from './style';

type SidebarProps = {
  children: React.ReactNode;
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  side: 'left' | 'right';
  isMobileOnly?: boolean;
  padding?: string;
};

const Sidebar = ({
  children,
  isMobileOnly,
  isSidebarOpen,
  padding,
  setIsSidebarOpen,
  side,
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
    >
      {children}
    </SidebarRoot>
  );
};

export default Sidebar;
