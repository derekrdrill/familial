import React from 'react';
import GlobalContext from '../../../../../../context/GlobalContext';
import { DrillyTypography } from '../../../../../../styles/globals';
import {
  getRecipeIngredientStringArray,
  getRecipeStepsStringArray,
} from '../../RecipeDetail/helpers';
import {
  RecipeIngredient,
  RecipeIngredientOrStep,
  RecipeStep,
} from '../../../../../../types/Recipe/Recipe';
import { Tooltip } from '@mui/material';

type RecipeRandomMetadataProps = {
  recipeRandomKey: string;
};

export default function RecipeRandomMetadata({ recipeRandomKey }: RecipeRandomMetadataProps) {
  let recipeMetadataArray: string[] = [];
  let recipeMetadataJoin = '';

  const {
    state: { isDarkMode, recipeRandom },
  } = React.useContext(GlobalContext);

  const recipeMetadata: string | RecipeIngredientOrStep[] =
    recipeRandom && recipeRandom[recipeRandomKey];

  if (typeof recipeMetadata === 'object') {
    if (recipeRandomKey === 'ingredients') {
      recipeMetadataArray = getRecipeIngredientStringArray({
        recipeIngredientData: recipeMetadata as RecipeIngredient[],
      });
      recipeMetadataJoin = recipeMetadataArray.join(', ');
    }

    if (recipeRandomKey === 'steps') {
      recipeMetadataArray = getRecipeStepsStringArray({
        recipeSteps: recipeMetadata as RecipeStep[],
      });
      recipeMetadataJoin = recipeMetadataArray.join(', ');
    }
  }

  return (
    recipeRandom && (
      <Tooltip
        disableHoverListener={!recipeMetadataArray.length || recipeMetadataJoin.length < 25}
        disableTouchListener={!recipeMetadataArray.length || recipeMetadataJoin.length < 25}
        title={
          <div tw='flex flex-col gap-1'>
            {recipeMetadataArray.map(recipeItem => (
              <DrillyTypography component='p' variant='body1'>
                {recipeItem}
              </DrillyTypography>
            ))}
          </div>
        }
      >
        <DrillyTypography
          component='p'
          tw='font-main text-lg overflow-hidden text-ellipsis whitespace-nowrap max-h-40'
          $isDarkMode={isDarkMode}
        >
          {!!recipeMetadata && <span tw='capitalize font-bold text-xl'>{recipeRandomKey}: </span>}
          {typeof recipeMetadata === 'string'
            ? recipeMetadata
            : recipeMetadataJoin !== ''
              ? recipeMetadataJoin
              : null}
        </DrillyTypography>
      </Tooltip>
    )
  );
}
