import { Recipe } from '../../../../../../types';
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
        `${ingredientsRow.ingredientQuantity} ${!ingredientsRow.ingredientMeasurementType.includes('Select measurement') ? ingredientsRow.ingredientMeasurementType : ''} ${ingredientsRow.ingredient}`,
    );

export const getRecipeSteps = ({ stepRows }: { stepRows: RecipeAddFormStep[] }): string[] =>
  stepRows.filter(stepRow => stepRow.step !== '').map(stepRow => stepRow.step);
