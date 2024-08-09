import React from 'react';
import styled from '@emotion/styled';
import { Menu, MenuItem } from '@mui/material';
import tw from 'twin.macro';
import GlobalContext from '../context/GlobalContext';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchIcon from '@mui/icons-material/Search';
import { DrillyTextField, DrillyTypography } from '../styles/globals';

type RecipesLayoutProps = {
  children: React.ReactNode;
};

const RecipesLayout = ({ children }: RecipesLayoutProps) => {
  const {
    state: { isDarkMode },
  } = React.useContext(GlobalContext);

  return (
    <div tw='pt-9 px-8 w-full'>
      <div tw='flex justify-end'>
        <RecipeAddButton $isDarkMode={isDarkMode}>
          Add new <KeyboardArrowDownIcon />
        </RecipeAddButton>
        <Menu open>
          <MenuItem>Cookbook</MenuItem>
          <MenuItem>Recipe</MenuItem>
        </Menu>
      </div>
      <DrillyTypography
        tw='font-main mt-4 text-4xl text-center'
        variant='h1'
        $isDarkMode={isDarkMode}
      >
        Recipes
      </DrillyTypography>
      <div tw='mt-10 md:mx-40 lg:mx-72 xl:mx-96'>
        <RecipeSearch
          fullWidth
          placeholder='Search for a recipe'
          InputProps={{
            startAdornment: <SearchIcon />,
          }}
          $isDarkMode={isDarkMode}
        />
      </div>
      {/* {children} */}
    </div>
  );
};

export default RecipesLayout;

const RecipeAddButton = styled.button<{ $isDarkMode?: boolean }>(
  ({ $isDarkMode }) => [
    !$isDarkMode && tw`bg-info`,
    !$isDarkMode && tw`border-info`,
    !$isDarkMode && tw`text-info`,
    !$isDarkMode && tw`!bg-opacity-20`,
    !$isDarkMode && tw`hover:!bg-opacity-40`,
    $isDarkMode && tw`bg-info-dark`,
    $isDarkMode && tw`border-info-dark`,
    $isDarkMode && tw`text-info-dark`,
    $isDarkMode && tw`!bg-opacity-40`,
    $isDarkMode && tw`hover:!bg-opacity-60`,
    tw`border`,
    tw`px-4`,
    tw`py-2`,
    tw`rounded-lg`,
  ],
);

const RecipeSearch = styled(DrillyTextField)<{ $isDarkMode?: boolean }>(
  ({ $isDarkMode }) => [
    $isDarkMode && tw`text-gray-DADADA`,
    !$isDarkMode && tw`text-gray-3A3A3A`,
    tw`!bg-gray-D9D9D9`,
    tw`font-secondary`,
  ],
);
