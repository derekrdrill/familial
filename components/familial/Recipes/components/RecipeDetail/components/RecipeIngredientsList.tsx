import React from 'react';
import GlobalContext from '../../../../../../context/GlobalContext';
import { DrillyTypography } from '../../../../../../styles/globals';
import { RecipeIngredient } from '../../../../../../types';

type RecipeIngredientsListProps = {
  ingredients: RecipeIngredient[];
};

const RecipeIngredientsList = ({ ingredients }: RecipeIngredientsListProps) => {
  const {
    state: { isDarkMode },
  } = React.useContext(GlobalContext);

  return (
    <div tw='flex flex-col'>
      {ingredients.map(({ ingredient, ingredientMeasurement, ingredientQuantity }) => (
        <DrillyTypography component='p' variant='h6' $isDarkMode={isDarkMode}>
          {`${ingredientQuantity}${ingredientMeasurement ? ` ${ingredientMeasurement}` : ''} ${ingredient}`}
        </DrillyTypography>
      ))}
    </div>
  );
};

export default RecipeIngredientsList;
