import { RecipeIngredient, RecipeStep } from '../../../types';

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
