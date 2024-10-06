import {
  FormError,
  Recipe,
  RecipeIngredient,
  RecipeIngredientOrStep,
  RecipeStep,
} from '../../../../../../types';
import { REQUIRED_FIELDS } from '../constants';

export const getRecipeFormErrors = ({ newRecipeData }: { newRecipeData: Recipe }) => {
  let errors: FormError[] = [];

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
      let error: string | undefined;
      let errorIndeces: number[] = [];
      let isNumericError: boolean = false;

      const multiRowFields: RecipeIngredientOrStep[] = newRecipeData[requiredField.id];
      const hasMultiRowFields = !!newRecipeData[requiredField.id];

      if (hasMultiRowFields) {
        requiredField.fields.forEach(requiedFieldItem => {
          const hasAllFieldsFilled = multiRowFields.every(xa => !!xa[requiedFieldItem.id]);
          const hasEveryFieldEmpty = multiRowFields.every(xa => !xa[requiedFieldItem.id]);

          if (hasEveryFieldEmpty || !hasAllFieldsFilled) {
            let newErrorIndeces: number[] = [];

            multiRowFields.forEach((multiRowField, multiRowFieldKey) => {
              if (!multiRowField[requiedFieldItem.id]) {
                newErrorIndeces = [...newErrorIndeces, ...[multiRowFieldKey]];
              }

              if (!!requiedFieldItem.isNumber) {
                const numbersOnlyRegex = /^\d+(\.\d{1,2})?$/;
                if (!numbersOnlyRegex.test(multiRowField[requiedFieldItem.id])) {
                  newErrorIndeces = [...newErrorIndeces, ...[multiRowFieldKey]];
                  isNumericError = true;
                }
              }
            });

            error = isNumericError
              ? `Numeric field(s) in the ${requiredField.title}s row must only contain numbers or decimals`
              : `Please finish filling in your ${requiredField.title}s or delete unecessary rows`;
            errorIndeces = [...new Set([...errorIndeces, ...newErrorIndeces])];
          }
        });
      }

      if (error) {
        errors = [
          ...errors,
          ...[
            {
              id: requiredField.id,
              error: error,
              multiRowErrorKeys: errorIndeces,
            },
          ],
        ];
      }
    }
  });

  return errors;
};

export const getRecipeIngredients = ({ ingredients }: { ingredients: RecipeIngredient[] }): string[] =>
  ingredients
    .filter(
      ingredientsRow =>
        ingredientsRow.ingredient !== '' && Number(ingredientsRow.ingredientQuantity) > 0,
    )
    .map(
      ingredientsRow =>
        `${ingredientsRow.ingredientQuantity} ${!ingredientsRow.ingredientMeasurement.includes('Select measurement') ? ingredientsRow.ingredientMeasurement : ''} ${ingredientsRow.ingredient}`,
    );

export const getRecipeSteps = ({ steps }: { steps: RecipeStep[] }): string[] =>
  steps.filter(stepRow => stepRow.step !== '').map(stepRow => stepRow.step);
