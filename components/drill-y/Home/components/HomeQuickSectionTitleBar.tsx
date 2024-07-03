import React from 'react';
import tw, { TwStyle } from 'twin.macro';
import styled from '@emotion/styled';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import GlobalContext from '../../../../context/GlobalContext';

type HomeQuickSectionTitleBarProps = {
  homeQuickSectionTitleBarStyles?: TwStyle;
  title: string;
};

const HomeQuickSectionTitleBar = ({
  homeQuickSectionTitleBarStyles,
  title,
}: HomeQuickSectionTitleBarProps) => {
  const {
    state: { isDarkMode },
  } = React.useContext(GlobalContext);

  return (
    <HomeQuickSectionTitleColDiv $styles={homeQuickSectionTitleBarStyles}>
      <div tw='col-span-1'>
        <HomeQuickSectionTitle
          $isDarkMode={isDarkMode}
          $styles={tw`flex md:hidden`}
        >
          {title}
        </HomeQuickSectionTitle>
      </div>
      <div tw='col-span-1 hidden md:flex md:justify-center'>
        <HomeQuickSectionTitle $isDarkMode={isDarkMode}>
          {title}
        </HomeQuickSectionTitle>
      </div>
      <div tw='col-span-1 flex justify-end'>
        <button>
          <div tw='flex items-center'>
            Recently added
            <KeyboardArrowDownIcon />
          </div>
        </button>
      </div>
    </HomeQuickSectionTitleColDiv>
  );
};

export default HomeQuickSectionTitleBar;

const HomeQuickSectionTitleColDiv = styled.div<{ $styles?: TwStyle }>(
  ({ $styles }) => [
    tw`flex`,
    tw`justify-between`,
    tw`md:col-span-1`,
    tw`md:gap-0`,
    tw`md:grid`,
    tw`md:grid-cols-3`,
    $styles,
  ],
);

const HomeQuickSectionTitle = styled.div<{
  $isDarkMode?: boolean;
  $styles?: TwStyle;
}>(({ $isDarkMode, $styles }) => [
  $isDarkMode && tw`text-white`,
  !$isDarkMode && tw`text-black`,
  tw`text-2xl`,
  tw`mb-2`,
  $styles,
]);
