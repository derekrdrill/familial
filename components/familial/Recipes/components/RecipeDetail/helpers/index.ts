import { Recipe } from '../../../../../../types';
import {
  RecipeIngredient,
  RecipeIngredientOrStep,
  RecipeStep,
} from '../../../../../../types/Recipe/Recipe';
import { REQUIRED_FIELDS } from '../constants';
import { RecipeAddFormIngredient, RecipeAddFormStep } from '../types';

export const getRecipeFormErrors = ({ newRecipeData }: { newRecipeData: Recipe }) => {
  let errors: { id: string; error: string }[] = [];

  REQUIRED_FIELDS.forEach(requiredField => {
    const newRecipeRequiredField = newRecipeData[requiredField.id];

    if (!requiredField.isMulti) {
      if (requiredField.isSelect) {
        if (newRecipeRequiredField === '' || newRecipeRequiredField.includes('Select')) {
          errors = [
            ...errors,
            ...[
              {
                id: requiredField.id,
                error: `Please select a ${requiredField.title}`,
              },
            ],
          ];
        }
      } else {
        if (newRecipeRequiredField === '') {
          errors = [
            ...errors,
            ...[
              {
                id: requiredField.id,
                error: `Please enter a ${requiredField.title}`,
              },
            ],
          ];
        }
      }
    } else {
      if (!newRecipeRequiredField?.length) {
        errors = [
          ...errors,
          ...[
            {
              id: requiredField.id,
              error: `Please enter at least 1 ${requiredField.title}`,
            },
          ],
        ];
      }
    }
  });

  return errors;
};

export const getRecipeIngredients = ({
  ingredientsRows,
}: {
  ingredientsRows: RecipeAddFormIngredient[];
}): string[] =>
  ingredientsRows
    .filter(
      ingredientsRow => ingredientsRow.ingredient !== '' && ingredientsRow.ingredientQuantity > 0,
    )
    .map(
      ingredientsRow =>
        `${ingredientsRow.ingredientQuantity} ${!ingredientsRow.ingredientMeasurement.includes('Select measurement') ? ingredientsRow.ingredientMeasurement : ''} ${ingredientsRow.ingredient}`,
    );

export const getRecipeSteps = ({ stepRows }: { stepRows: RecipeAddFormStep[] }): string[] =>
  stepRows.filter(stepRow => stepRow.step !== '').map(stepRow => stepRow.step);

export const getRecipeIngredientStringArray = ({
  recipeIngredientData,
}: {
  recipeIngredientData: RecipeIngredient[];
}): string[] =>
  recipeIngredientData.map(
    recipeIngredient =>
      `${recipeIngredient.ingredientQuantity}${recipeIngredient.ingredientMeasurement ? ` ${recipeIngredient.ingredientMeasurement}` : ''} ${recipeIngredient.ingredient}`,
  );

export const getRecipeStepsStringArray = ({
  recipeSteps,
}: {
  recipeSteps: RecipeStep[];
}): string[] =>
  recipeSteps.map((recipeStep, recipeStepKey) => `${recipeStepKey + 1}) ${recipeStep.step}`);