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
import RecipeSearchResults from '../components/familial/Recipes/components/RecipeSearchResults/RecipeSearchResults';
import {
  getRecipeIngredientStringArray,
  getRecipeStepsStringArray,
} from '../components/familial/Recipes/helpers';

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

  await fetch(`/api/recipe/get?searchValue=${searchValue}`).then(async res => {
    const recipesSearched = await res.json();
    setRecipesSearched(recipesSearched);
  });

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
    state: { isDarkMode, user },
  } = React.useContext(GlobalContext);

  const [isAddMenuOpen, setIsAddMenuOpen] = React.useState<boolean>(false);
  const [isRecipeSearchTextFocused, setIsRecipeSearchTextFocused] = React.useState<boolean>(false);
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
          <MenuItem
            onClick={() =>
              dispatch({
                type: GlobalReducerActionEnum.SET_MODAL_ITEM,
                payload: {
                  modalItem: {
                    handleSubmit: async () => {
                      const newCookbookName = (
                        document.getElementById('cookbook') as HTMLInputElement
                      )?.value;

                      await fetch('/api/cookbook/add', {
                        method: 'POST',
                        body: JSON.stringify({
                          author: user?.firstName,
                          authorId: user?.userID,
                          lastUpdated: new Date(),
                          title: newCookbookName,
                          uploadedAt: new Date(),
                        }),
                      })
                        .then(async res => {
                          const response = await res.json();
                        })
                        .catch(e => {
                          console.log(e);
                        });
                    },
                    isExitHidden: true,
                    isModalOpen: true,
                    modalBody: (
                      <DrillyTextField
                        id='cookbook'
                        fullWidth
                        placeholder='Enter cookbook name'
                        size='small'
                        variant='outlined'
                        $hasBorder
                        $bgColor={tw`bg-gray-D9D9D9`}
                        $bgColorDark={tw`bg-gray-3D3D3D`}
                        $isDarkMode={isDarkMode}
                      />
                    ),
                    modalTitle: 'Add new cookbook',
                    submitSuccessMessage: (
                      <>
                        <DrillyTypography variant='subtitle1' $isDarkMode={isDarkMode}>
                          New cookbook added!
                        </DrillyTypography>
                        <DrillyTypography variant='subtitle2' $isDarkMode={isDarkMode}>
                          Cookbook will not appear here until recipes are added
                        </DrillyTypography>
                      </>
                    ),
                  },
                },
              })
            }
          >
            Cookbook
          </MenuItem>
          <MenuItem onClick={() => router.push('/recipes/add-new')}>Recipe</MenuItem>
        </RecipeAddMenu>
      </div>
      <DrillyTypography tw='font-main text-4xl text-center' variant='h1' $isDarkMode={isDarkMode}>
        Recipes
      </DrillyTypography>
      <div tw='mt-4 md:mx-40 lg:mx-72 xl:mx-96'>
        <RecipeSearch
          fullWidth
          placeholder='Search for a recipe'
          onBlur={() => setIsRecipeSearchTextFocused(false)}
          onChange={async e => setRecipeSearchValue(e.target.value)}
          onFocus={() => setIsRecipeSearchTextFocused(true)}
          InputProps={{
            startAdornment: <SearchIcon />,
            endAdornment: isRecipeSearchLoading && <CircularProgress />,
          }}
          $hasBorder
          $isDarkMode={isDarkMode}
          $isFocused={isRecipeSearchTextFocused}
        />
      </div>
      <div tw='lg:mx-12'>
        {!!recipeSearchValue && !!recipesSearched && (
          <RecipeSearchResults
            isRecipeSearchLoading={isRecipeSearchLoading}
            recipesSearched={recipesSearched}
          />
        )}
        {!recipeSearchValue && (
          <>
            <RecipeRandom />
            <div tw='mb-24 mt-12'>
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
                        recipeCookbook={recipe.cookbook}
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
  tw`mb-4`,
  tw`px-4`,
  tw`py-1`,
  tw`rounded-lg`,
  tw`md:mb-0`,
]);

const RecipeAddMenu = styled(Menu)({
  '.MuiPaper-root': [
    tw`absolute`,
    tw`!left-auto`,
    tw`!right-10`,
    tw`!top-[148px]`,
    tw`w-[124px]`,
    tw`lg:!top-[136px]`,
  ],
});

const RecipeSearch = styled(DrillyTextField)<{ $isDarkMode?: boolean }>(({ $isDarkMode }) => [
  $isDarkMode && tw`text-gray-DADADA`,
  $isDarkMode && tw`!bg-gray-4E4E4E`,
  !$isDarkMode && tw`text-gray-3A3A3A`,
  !$isDarkMode && tw`!bg-gray-D9D9D9`,
  tw`font-secondary`,
]);
