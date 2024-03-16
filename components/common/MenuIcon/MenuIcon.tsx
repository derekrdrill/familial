import * as React from 'react';

import { MenuIconContainer, MenuIconLine } from './style';

type MenuIconProps = {
  isMenuIconActive: boolean;
  setIsMenuIconActive: React.Dispatch<React.SetStateAction<boolean>>;
};

const MenuIcon = ({ isMenuIconActive, setIsMenuIconActive }: MenuIconProps) => (
  <MenuIconContainer
    container
    display={{ xs: 'block', lg: 'none' }}
    onClick={
      /* istanbul ignore next */
      () => setIsMenuIconActive(!isMenuIconActive)
    }
    $isMenuIconActive={isMenuIconActive}
  >
    <MenuIconLine className='menu-icon-line-top' item />
    <MenuIconLine className='menu-icon-line-middle' item />
    <MenuIconLine className='menu-icon-line-bottom' $isBottom item />
  </MenuIconContainer>
);

export default MenuIcon;
