import React from 'react';
import tw from 'twin.macro';
import { InputLabel, MenuItem } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';

import GlobalContext from '../../../../../../context/GlobalContext';
import { DrillyButton, DrillyTextField, DrillyTypography } from '../../../../../../styles/globals';
import { MEASUREMENT_TYPES } from '../constants';
import {
  RecipeAddFormAddClick,
  RecipeAddFormDeleteClick,
  RecipeAddFormRowChange,
  RecipeAddFormIngredient,
} from '../types';
import { FormError, Recipe } from '../../../../../../types';
import { RecipesFormDivider } from '../styles';

type RecipeIngredientsFormProps = {
  errors: FormError[];
  handleAddRowClick: RecipeAddFormAddClick;
  handleDeleteRowClick: RecipeAddFormDeleteClick;
  handleRowChange: RecipeAddFormRowChange;
  ingredients: RecipeAddFormIngredient[];
  setIngredients: React.Dispatch<React.SetStateAction<RecipeAddFormIngredient[]>>;
};

const RecipeIngredientsForm = ({
  errors,
  handleAddRowClick,
  handleDeleteRowClick,
  handleRowChange,
  ingredients,
  setIngredients,
}: RecipeIngredientsFormProps) => {
  const ingredientFormEndRef = React.useRef<HTMLDivElement>(null);

  const {
    state: { isDarkMode },
  } = React.useContext(GlobalContext);

  const ingredientRowsErrorData = errors.find(error => error.id === 'ingredients');
  const ingredientRowsError = ingredientRowsErrorData?.error;
  const hasIngredientRowsError = !!ingredientRowsError;

  return (
    <>
      <div
        ref={ingredientFormEndRef}
        tw='col-span-full gap-x-2 gap-y-1 grid grid-cols-12 overflow-y-auto'
      >
        {ingredients.map((ingredientRow, ingredientRowKey) => {
          const hasErrorOnRow = !!errors.find(
            error =>
              error.id === 'ingredients' && error.multiRowErrorKeys?.includes(ingredientRowKey),
          );

          return (
            <React.Fragment key={ingredientRowKey}>
              <div tw='col-span-4 md:col-span-3 lg:col-span-2'>
                <InputLabel htmlFor={`ingredientQuantity-${ingredientRowKey}`}>
                  <DrillyTypography
                    $isDarkMode={isDarkMode}
                    $textColor={hasErrorOnRow ? tw`text-error` : undefined}
                  >
                    Quantity (Numeric) *
                  </DrillyTypography>
                </InputLabel>
                <DrillyTextField
                  id={`ingredientQuantity-${ingredientRowKey}`}
                  fullWidth
                  inputMode='numeric'
                  onBlur={() => {}}
                  onChange={e =>
                    handleRowChange({
                      rowKeyToChange: ingredientRowKey,
                      rowField: 'ingredientQuantity',
                      rowFieldValue: e.currentTarget.value,
                      rows: ingredients,
                      setRows: setIngredients,
                    })
                  }
                  placeholder='Enter quantity'
                  size='small'
                  type='number'
                  value={ingredientRow.ingredientQuantity}
                  $bgColor={tw`bg-gray-D9D9D9`}
                  $bgColorDark={tw`bg-gray-3D3D3D`}
                  $hasBorder={false}
                  $hasError={hasErrorOnRow}
                  $isDarkMode={isDarkMode}
                />
              </div>
              <div tw='col-span-8 md:col-span-4 lg:col-span-3'>
                <InputLabel htmlFor={`ingredientMeasurement-${ingredientRowKey}`}>
                  <DrillyTypography $isDarkMode={isDarkMode}>Measurement type</DrillyTypography>
                </InputLabel>
                <DrillyTextField
                  id={`ingredientMeasurement-${ingredientRowKey}`}
                  fullWidth
                  onChange={e =>
                    handleRowChange({
                      rowKeyToChange: ingredientRowKey,
                      rowField: 'ingredientMeasurement',
                      rowFieldValue: e.target.value,
                      rows: ingredients,
                      setRows: setIngredients,
                    })
                  }
                  placeholder='Select measurement type'
                  select
                  size='small'
                  value={ingredientRow.ingredientMeasurement}
                  $bgColor={tw`bg-gray-D9D9D9`}
                  $bgColorDark={tw`bg-gray-3D3D3D`}
                  $hasBorder={false}
                  $isDarkMode={isDarkMode}
                >
                  {MEASUREMENT_TYPES.map(measurementType => (
                    <MenuItem key={measurementType} id={measurementType} value={measurementType}>
                      {measurementType}
                    </MenuItem>
                  ))}
                </DrillyTextField>
              </div>
              <div tw='col-span-full md:col-span-4 lg:col-span-3'>
                <InputLabel htmlFor={`ingredient-${ingredientRowKey}`}>
                  <DrillyTypography
                    $isDarkMode={isDarkMode}
                    $textColor={hasErrorOnRow ? tw`text-error` : undefined}
                  >
                    Ingredient *
                  </DrillyTypography>
                </InputLabel>
                <DrillyTextField
                  id={`ingredient-${ingredientRowKey}`}
                  fullWidth
                  onChange={e =>
                    handleRowChange({
                      rowKeyToChange: ingredientRowKey,
                      rowField: 'ingredient',
                      rowFieldValue: e.currentTarget.value,
                      rows: ingredients,
                      setRows: setIngredients,
                    })
                  }
                  placeholder='Enter ingredient'
                  size='small'
                  value={ingredientRow.ingredient}
                  $bgColor={tw`bg-gray-D9D9D9`}
                  $bgColorDark={tw`bg-gray-3D3D3D`}
                  $hasBorder={false}
                  $hasError={hasErrorOnRow}
                  $isDarkMode={isDarkMode}
                />
              </div>
              <div tw='flex col-span-full gap-2 md:col-span-3'>
                <DrillyButton
                  disabled={ingredients.length < 2}
                  onClick={() =>
                    handleDeleteRowClick({
                      rowKeyToDelete: ingredientRowKey,
                      rows: ingredients,
                      setRows: setIngredients,
                    })
                  }
                  tw='h-8 mt-2 md:mt-7'
                  $isDisabled={ingredients.length < 2}
                  $variant='error'
                >
                  <p tw='text-xl md:hidden'>Delete</p>
                  <DeleteForeverIcon tw='mt-0.5' />
                </DrillyButton>
                <DrillyButton
                  disabled={ingredients.length === 15 || hasIngredientRowsError}
                  onClick={() =>
                    handleAddRowClick({
                      newRow: {
                        ingredient: '',
                        ingredientMeasurement: 'Select measurement type...',
                        ingredientQuantity: '',
                      },
                      rows: ingredients,
                      setRows: setIngredients,
                    })
                  }
                  tw='hidden h-8 mt-7 md:flex'
                  $isDisabled={ingredients.length === 15 || hasIngredientRowsError}
                  $variant='primary'
                >
                  <p tw='text-xl md:hidden'>Add</p>
                  <AddIcon tw='mt-0.5' />
                </DrillyButton>
              </div>
              {ingredientRowKey + 1 < ingredients.length && (
                <div tw='col-span-full'>
                  <RecipesFormDivider $isDarkMode={isDarkMode} />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
      <DrillyButton
        disabled={ingredients.length === 15 || hasIngredientRowsError}
        onClick={() => {
          handleAddRowClick({
            newRow: {
              ingredient: '',
              ingredientMeasurement: 'Select measurement type...',
              ingredientQuantity: '',
            },
            rows: ingredients,
            setRows: setIngredients,
          });
        }}
        tw='h-8 mt-auto w-full md:hidden'
        $isDisabled={ingredients.length === 15 || hasIngredientRowsError}
        $variant='primary'
      >
        <p tw='text-lg lg:hidden'>Add another ingredient</p>
        <AddIcon tw='mb-0 mt-0.5' />
      </DrillyButton>
      <div tw='col-span-full'>
        {hasIngredientRowsError && (
          <DrillyTypography $textColor={tw`text-error`} component='p' variant='caption'>
            {ingredientRowsError}
          </DrillyTypography>
        )}
      </div>
    </>
  );
};

export default RecipeIngredientsForm;
