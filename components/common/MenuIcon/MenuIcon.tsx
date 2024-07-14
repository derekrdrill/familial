import * as React from 'react';

import GlobalContext from '../../../context/GlobalContext';

import { MenuIconContainer, MenuIconLine } from './style';

type MenuIconProps = {
  isMenuIconActive: boolean;
  setIsMenuIconActive: React.Dispatch<React.SetStateAction<boolean>>;
};

const MenuIcon = ({ isMenuIconActive, setIsMenuIconActive }: MenuIconProps) => {
  const {
    state: { isDarkMode },
  } = React.useContext(GlobalContext);

  return (
    <MenuIconContainer
      container
      display={{ xs: 'block', md: 'none' }}
      onClick={
        /* istanbul ignore next */
        () => setIsMenuIconActive(!isMenuIconActive)
      }
      $isMenuIconActive={isMenuIconActive}
    >
      <MenuIconLine
        className='menu-icon-line-top'
        item
        $isDarkMode={isDarkMode}
      />
      <MenuIconLine
        className='menu-icon-line-middle'
        item
        $isDarkMode={isDarkMode}
      />
      <MenuIconLine
        className='menu-icon-line-bottom'
        item
        $isBottom
        $isDarkMode={isDarkMode}
      />
    </MenuIconContainer>
  );
};

export default MenuIcon;
