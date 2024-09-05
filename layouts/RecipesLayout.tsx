import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchIcon from '@mui/icons-material/Search';
import { Menu, MenuItem } from '@mui/material';
import tw from 'twin.macro';

import GlobalContext from '../context/GlobalContext';
import Carousel from '../components/common/Carousel/Carousel';
import { RecipeCard } from '../components/familial/Recipes';
import { DrillyTextField, DrillyTypography } from '../styles/globals';
import { Recipe } from '../types';

import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

type RecipesLayoutProps = {
  children: React.ReactNode;
  recipes: Recipe[];
};

const RecipesLayout = ({ children, recipes }: RecipesLayoutProps) => {
  const router = useRouter();
  const theme = useTheme();

  const isMD = useMediaQuery(theme.breakpoints.up('md'));

  const {
    state: { isDarkMode },
  } = React.useContext(GlobalContext);

  const [isAddMenuOpen, setIsAddMenuOpen] = React.useState<boolean>(false);

  return (
    <div tw='pt-9 px-8 w-full'>
      <div tw='flex justify-end'>
        <RecipeAddButton onClick={() => setIsAddMenuOpen(!isAddMenuOpen)} $isDarkMode={isDarkMode}>
          Add new <KeyboardArrowDownIcon />
        </RecipeAddButton>
        <RecipeAddMenu onClose={() => setIsAddMenuOpen(false)} open={isAddMenuOpen}>
          <MenuItem>Cookbook</MenuItem>
          <MenuItem onClick={() => router.push('/recipes/add-new')}>Recipe</MenuItem>
        </RecipeAddMenu>
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
      <div tw='mx-12'>
        <div tw='gap-2 grid grid-cols-1 mt-12 md:grid-cols-2'>
          <Image
            height={0}
            alt='recipe-image'
            sizes='100vw'
            src='/dinner2.webp'
            tw='w-full'
            width={0}
          />
          <div></div>
        </div>
        <div tw='my-24'>
          <DrillyTypography tw='font-bold font-main mb-7 ml-2 text-2xl' variant='h2'>
            Newly added
          </DrillyTypography>
          <div tw='col-span-1 flex justify-center'>
            <Carousel
              carouselContent={recipes.map(recipe => ({
                id: recipe._id ?? '',
                component: (
                  <RecipeCard
                    recipeAuthor={recipe.author ?? ''}
                    recipeCardContainerStyles={tw`w-96 md:w-80`}
                    recipeIngredients={recipe.ingredients.join(', ')}
                    recipeSteps={recipe.steps.join(', ')}
                    recipeTemp={recipe.temperature}
                    recipeTime={recipe.time}
                    recipeTitle={recipe.title}
                  />
                ),
              }))}
              carouselHeight={isMD ? 250 : 290}
            />
          </div>
        </div>
      </div>
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

const RecipeAddMenu = styled(Menu)({
  '.MuiPaper-root': [
    tw`absolute`,
    tw`!left-auto`,
    tw`!right-8`,
    tw`!top-48`,
    tw`w-[124px]`,
    tw`lg:!top-36`,
  ],
});

const RecipeSearch = styled(DrillyTextField)<{ $isDarkMode?: boolean }>(
  ({ $isDarkMode }) => [
    $isDarkMode && tw`text-gray-DADADA`,
    !$isDarkMode && tw`text-gray-3A3A3A`,
    tw`!bg-gray-D9D9D9`,
    tw`font-secondary`,
  ],
);
