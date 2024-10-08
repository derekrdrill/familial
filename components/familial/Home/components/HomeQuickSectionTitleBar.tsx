import React from 'react';
import tw, { TwStyle } from 'twin.macro';
import styled from '@emotion/styled';
import { Menu, MenuItem } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import GlobalContext from '../../../../context/GlobalContext';
import { Photos, Recipe } from '../../../../types';

const HOME_QUICK_SECTION_MENU_ITEMS: { id: 'recentlyAdded' | 'mostPopular'; text: string }[] = [
  { id: 'recentlyAdded', text: 'Recently added' },
  { id: 'mostPopular', text: 'Most popular' },
];

type HomeQuickSectionTitleBarProps = {
  homeQuickSectionTitleBarStyles?: TwStyle;
  isRecipes?: boolean;
  setContentQuick:
    | React.Dispatch<React.SetStateAction<Photos[]>>
    | React.Dispatch<React.SetStateAction<Recipe[]>>;
  title: string;
};

const HomeQuickSectionTitleBar = ({
  homeQuickSectionTitleBarStyles,
  isRecipes,
  setContentQuick,
  title,
}: HomeQuickSectionTitleBarProps) => {
  const {
    state: { isDarkMode },
  } = React.useContext(GlobalContext);

  const [isHomeQuickSectionMenuOpen, setIsHomeQuickSectionMenuOpen] =
    React.useState<boolean>(false);

  const [homeQuickSectionMenuAnchor, setHomeQuickSectionMenuAnchor] =
    React.useState<HTMLButtonElement>();

  const [homeQuickSectionMenuValue, setHomeQuickSectioMenuValue] = React.useState<
    'recentlyAdded' | 'mostPopular'
  >('recentlyAdded');

  const homeQuickSectionMenuText = HOME_QUICK_SECTION_MENU_ITEMS.find(
    homeQuickSectionMenuItem => homeQuickSectionMenuItem.id === homeQuickSectionMenuValue,
  )?.text;

  return (
    <HomeQuickSectionTitleColDiv $twStyles={homeQuickSectionTitleBarStyles}>
      <div tw='col-span-1'>
        <HomeQuickSectionTitle $isDarkMode={isDarkMode} $twStyles={tw`flex md:hidden`}>
          {title}
        </HomeQuickSectionTitle>
      </div>
      <div tw='col-span-1 hidden md:flex md:justify-center'>
        <HomeQuickSectionTitle $isDarkMode={isDarkMode}>{title}</HomeQuickSectionTitle>
      </div>
      <div tw='col-span-1 flex justify-end'>
        <HomeQuickSectionFilterButton
          onClick={e => {
            setIsHomeQuickSectionMenuOpen(true);
            setHomeQuickSectionMenuAnchor(e.currentTarget);
          }}
          $isDarkMode={isDarkMode}
        >
          <div tw='flex items-center'>
            {homeQuickSectionMenuText}
            <KeyboardArrowDownIcon />
          </div>
        </HomeQuickSectionFilterButton>
        <Menu
          anchorEl={homeQuickSectionMenuAnchor}
          defaultValue={homeQuickSectionMenuValue}
          disableScrollLock={true}
          onClose={() => setIsHomeQuickSectionMenuOpen(false)}
          open={isHomeQuickSectionMenuOpen}
        >
          {HOME_QUICK_SECTION_MENU_ITEMS.map(homeQuickSectionMenuItem => (
            <MenuItem
              key={homeQuickSectionMenuItem.id}
              onClick={async () => {
                setHomeQuickSectioMenuValue(homeQuickSectionMenuItem.id);
                setIsHomeQuickSectionMenuOpen(false);

                await fetch(
                  `/api/photo/get?filterType=${homeQuickSectionMenuItem.id}&quickSectionType=${isRecipes ? 'recipes' : 'photos'}`,
                ).then(async res => {
                  const conentQuickFiltered = await res.json();
                  setContentQuick(conentQuickFiltered);
                });
              }}
            >
              {homeQuickSectionMenuItem.text}
            </MenuItem>
          ))}
        </Menu>
      </div>
    </HomeQuickSectionTitleColDiv>
  );
};

export default HomeQuickSectionTitleBar;

const HomeQuickSectionTitleColDiv = styled.div<{ $twStyles?: TwStyle }>(({ $twStyles }) => [
  tw`flex`,
  tw`justify-between`,
  tw`md:col-span-1`,
  tw`md:gap-0`,
  tw`md:grid`,
  tw`md:grid-cols-3`,
  $twStyles,
]);

const HomeQuickSectionTitle = styled.div<{
  $isDarkMode?: boolean;
  $twStyles?: TwStyle;
}>(({ $isDarkMode, $twStyles }) => [
  $isDarkMode && tw`text-white`,
  !$isDarkMode && tw`text-black`,
  tw`text-2xl`,
  tw`mb-2`,
  $twStyles,
]);

const HomeQuickSectionFilterButton = styled.button<{ $isDarkMode }>(
  ({ $isDarkMode }) => [
    $isDarkMode && tw`text-white`,
    !$isDarkMode && tw`text-black`,
    tw`hover:underline`,
  ],
);
