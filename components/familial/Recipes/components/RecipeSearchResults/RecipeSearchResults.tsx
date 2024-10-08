import React from 'react';
import tw from 'twin.macro';
import { Shimmer } from 'react-shimmer';
import { useTheme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

import GlobalContext from '../../../../../context/GlobalContext';
import { DrillyTypography } from '../../../../../styles/globals';
import { RecipeCard } from '../RecipeCard';
import { getRecipeIngredientStringArray, getRecipeStepsStringArray } from '../../helpers';
import { Recipe } from '../../../../../types';

type RecipeSearchResultsProps = {
  isRecipeSearchLoading: boolean;
  recipesSearched: Recipe[];
};

const RecipeSearchResults = ({
  isRecipeSearchLoading,
  recipesSearched,
}: RecipeSearchResultsProps) => {
  const theme = useTheme();

  const isXS = useMediaQuery(theme.breakpoints.up('xs'));
  const isSM = useMediaQuery(theme.breakpoints.up('sm'));
  const isMD = useMediaQuery(theme.breakpoints.up('md'));
  const isLG = useMediaQuery(theme.breakpoints.up('lg'));
  const isXL = useMediaQuery(theme.breakpoints.up('xl'));

  const {
    state: { isDarkMode },
  } = React.useContext(GlobalContext);

  return (
    <div tw='gap-6 grid grid-cols-1 mt-8 sm:grid-cols-2 lg:gap-4 lg:grid-cols-3 xl:grid-cols-4'>
      {isRecipeSearchLoading && (
        <div tw='flex flex-col gap-4'>
          <Shimmer height={20} width={120} />
          <Shimmer
            height={300}
            width={
              isXS && !isSM
                ? 400
                : isSM && !isMD
                  ? 620
                  : isMD && !isLG
                    ? 840
                    : isLG && !isXL
                      ? 1120
                      : 1400
            }
          />
        </div>
      )}
      {!isRecipeSearchLoading && (
        <>
          <div tw='col-span-full'>
            <DrillyTypography component='h2' variant='body1' $isDarkMode={isDarkMode}>
              {`${recipesSearched.length} recipe${recipesSearched.length === 1 ? '' : 's'} found`}
            </DrillyTypography>
          </div>
          {recipesSearched.map(recipe => (
            <div tw='col-span-1'>
              <RecipeCard
                recipeAuthor={recipe.author ?? ''}
                recipeAuthorId={recipe.authorId}
                recipeCardContainerStyles={tw`mb-16`}
                recipeCookbook={recipe.cookbook}
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
        </>
      )}
    </div>
  );
};

export default RecipeSearchResults;
