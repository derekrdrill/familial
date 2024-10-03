import React from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import SearchIcon from '@mui/icons-material/Search';
import { CircularProgress, Menu, MenuItem } from '@mui/material';
import tw from 'twin.macro';

import GlobalContext from '../context/GlobalContext';
import Carousel from '../components/common/Carousel/Carousel';
import { RecipeCard } from '../components/familial/Recipes';
import { DrillyTextField, DrillyTypography } from '../styles/globals';
import { Recipe } from '../types';

import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { GlobalReducerActionEnum } from '../context/GlobalReducer';
import RecipeRandom from '../components/familial/Recipes/components/RecipeRandom/RecipeRandom';
import {
  getRecipeIngredientStringArray,
  getRecipeStepsStringArray,
} from '../components/familial/Recipes/components/RecipeDetail/helpers';

const handleSearchValueChange = async ({
  searchValue,
  setIsRecipeSearchLoading,
  setRecipesSearched,
}: {
  searchValue: string;
  setIsRecipeSearchLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setRecipesSearched: React.Dispatch<React.SetStateAction<Recipe[] | undefined>>;
}) => {
  setIsRecipeSearchLoading(true);

  async () => {
    await fetch(`/api/recipe/get?searchValue=${searchValue}`).then(async res => {
      const recipesSearched = await res.json();
      setRecipesSearched(recipesSearched);
    });
  };

  setIsRecipeSearchLoading(false);
};

type RecipesLayoutProps = {
  children: React.ReactNode;
  recipes: Recipe[];
  recipeRandom: Recipe;
};

const RecipesLayout = ({ children, recipeRandom, recipes }: RecipesLayoutProps) => {
  const router = useRouter();
  const theme = useTheme();

  const isMD = useMediaQuery(theme.breakpoints.up('md'));

  const {
    dispatch,
    state: { isDarkMode },
  } = React.useContext(GlobalContext);

  const [isAddMenuOpen, setIsAddMenuOpen] = React.useState<boolean>(false);
  const [isRecipeSearchLoading, setIsRecipeSearchLoading] = React.useState<boolean>(false);
  const [recipeSearchValue, setRecipeSearchValue] = React.useState<string>();
  const [recipesSearched, setRecipesSearched] = React.useState<Recipe[]>();

  React.useEffect(() => {
    const recipeRandomMetadataKeys = Object.keys(recipeRandom);
    const recipeRandomMetadataArr = recipeRandomMetadataKeys.map(recipeMetadataKey => ({
      [recipeMetadataKey]: recipeRandom[recipeMetadataKey],
    }));
    const recipeRandomMetadata = Object.assign({}, ...recipeRandomMetadataArr);

    dispatch({
      type: GlobalReducerActionEnum.SET_RECIPE_RANDOM,
      payload: { recipeRandom: recipeRandomMetadata },
    });
  }, [recipeRandom]);

  React.useEffect(() => {
    if (!!recipeSearchValue) {
      handleSearchValueChange({
        searchValue: recipeSearchValue,
        setIsRecipeSearchLoading: setIsRecipeSearchLoading,
        setRecipesSearched: setRecipesSearched,
      });
    } else {
      setRecipesSearched(undefined);
    }
  }, [recipeSearchValue]);

  return (
    <div tw='px-8 w-full lg:pt-9'>
      <div tw='flex justify-end'>
        <RecipeAddButton onClick={() => setIsAddMenuOpen(!isAddMenuOpen)} $isDarkMode={isDarkMode}>
          Add new {isAddMenuOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
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
          onChange={async e => setRecipeSearchValue(e.target.value)}
          InputProps={{
            startAdornment: <SearchIcon />,
            endAdornment: isRecipeSearchLoading && <CircularProgress />,
          }}
          $isDarkMode={isDarkMode}
        />
      </div>
      <div tw='lg:mx-12'>
        {!!recipeSearchValue && !!recipesSearched && (
          <div tw='gap-2 grid grid-cols-1 mt-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            <div tw='col-span-full'>
              <DrillyTypography component='h2' variant='body1'>
                {`${recipesSearched.length} recipe${recipesSearched.length === 1 ? '' : 's'} found`}
              </DrillyTypography>
            </div>
            {recipesSearched.map(recipe => (
              <div tw='col-span-1'>
                <RecipeCard
                  recipeAuthor={recipe.author ?? ''}
                  recipeCardContainerStyles={tw`mb-16`}
                  recipeId={recipe._id}
                  recipeIngredients={getRecipeIngredientStringArray({
                    recipeIngredientData: recipe.ingredients,
                  }).join(', ')}
                  recipePhotoSrc={recipe.imageUrl}
                  recipeSteps={getRecipeStepsStringArray({ recipeSteps: recipe.steps }).join(', ')}
                  recipeTemp={recipe.temperature}
                  recipeTime={recipe.time}
                  recipeTitle={recipe.title}
                />
              </div>
            ))}
          </div>
        )}
        {!recipeSearchValue && (
          <>
            <RecipeRandom />
            <div tw='my-24'>
              <DrillyTypography
                tw='font-bold font-main mb-7 ml-2 text-2xl'
                variant='h2'
                $isDarkMode={isDarkMode}
              >
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
                        recipeId={recipe._id}
                        recipeIngredients={getRecipeIngredientStringArray({
                          recipeIngredientData: recipe.ingredients,
                        }).join(', ')}
                        recipePhotoSrc={recipe.imageUrl}
                        recipeSteps={getRecipeStepsStringArray({ recipeSteps: recipe.steps }).join(
                          ', ',
                        )}
                        recipeTemp={recipe.temperature}
                        recipeTime={recipe.time}
                        recipeTitle={recipe.title}
                      />
                    ),
                  }))}
                  carouselHeight={isMD ? 250 : 300}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RecipesLayout;

const RecipeAddButton = styled.button<{ $isDarkMode?: boolean }>(({ $isDarkMode }) => [
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
]);

const RecipeAddMenu = styled(Menu)({
  '.MuiPaper-root': [
    tw`absolute`,
    tw`!left-auto`,
    tw`!right-10`,
    tw`!top-[156px]`,
    tw`w-[124px]`,
    tw`lg:!top-36`,
  ],
});

const RecipeSearch = styled(DrillyTextField)<{ $isDarkMode?: boolean }>(({ $isDarkMode }) => [
  $isDarkMode && tw`text-gray-DADADA`,
  !$isDarkMode && tw`text-gray-3A3A3A`,
  tw`!bg-gray-D9D9D9`,
  tw`font-secondary`,
]);
