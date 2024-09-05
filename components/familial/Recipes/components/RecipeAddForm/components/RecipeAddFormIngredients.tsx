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

type RecipeAddFormIngredientsProps = {
  errors: { id: string; error: string }[];
  handleAddRowClick: RecipeAddFormAddClick;
  handleDeleteRowClick: RecipeAddFormDeleteClick;
  handleRowChange: RecipeAddFormRowChange;
  ingredientsRows: RecipeAddFormIngredient[];
  setIngredientsRows: React.Dispatch<React.SetStateAction<RecipeAddFormIngredient[]>>;
};

const RecipeAddFormIngredients = ({
  errors,
  handleAddRowClick,
  handleDeleteRowClick,
  handleRowChange,
  ingredientsRows,
  setIngredientsRows,
}: RecipeAddFormIngredientsProps) => {
  const {
    state: { isDarkMode },
  } = React.useContext(GlobalContext);

  return (
    <>
      <DrillyTypography tw='font-main mt-5 text-2xl' variant='h2' $isDarkMode={isDarkMode}>
        Ingredients
      </DrillyTypography>
      <div tw='col-span-full gap-2 grid grid-cols-1 lg:grid-cols-12 max-h-80 overflow-y-auto'>
        {ingredientsRows.map((ingredientRow, ingredientRowKey) => (
          <React.Fragment key={ingredientRowKey}>
            <div tw='col-span-full lg:col-span-2'>
              <InputLabel htmlFor={`quantity-${ingredientRowKey}`}>
                <DrillyTypography $isDarkMode={isDarkMode}>Quantity</DrillyTypography>
              </InputLabel>
              <DrillyTextField
                id={`quantity-${ingredientRowKey}`}
                fullWidth
                onChange={e =>
                  handleRowChange({
                    rowKeyToChange: ingredientRowKey,
                    rowField: 'ingredientQuantity',
                    rowFieldValue: e.currentTarget.value,
                    rows: ingredientsRows,
                    setRows: setIngredientsRows,
                  })
                }
                placeholder='Enter quantity'
                type='number'
                value={ingredientRow.ingredientQuantity}
                $bgColor={tw`bg-gray-D9D9D9`}
                $bgColorDark={tw`bg-gray-3D3D3D`}
                $hasBorder={false}
                $hasError={
                  ingredientRowKey === 0 && !!errors.find(error => error.id === 'ingredients')
                }
                $isDarkMode={isDarkMode}
              />
            </div>
            <div tw='col-span-full lg:col-span-3'>
              <InputLabel htmlFor={`measurementType-${ingredientRowKey}`}>
                <DrillyTypography $isDarkMode={isDarkMode}>Measurement type</DrillyTypography>
              </InputLabel>
              <DrillyTextField
                id={`measurementType-${ingredientRowKey}`}
                fullWidth
                onChange={e =>
                  handleRowChange({
                    rowKeyToChange: ingredientRowKey,
                    rowField: 'ingredientMeasurementType',
                    rowFieldValue: e.target.value,
                    rows: ingredientsRows,
                    setRows: setIngredientsRows,
                  })
                }
                placeholder='Select measurement type'
                select
                value={ingredientRow.ingredientMeasurementType}
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
            <div tw='col-span-full lg:col-span-3'>
              <InputLabel htmlFor={`ingredient-${ingredientRowKey}`}>
                <DrillyTypography $isDarkMode={isDarkMode}>Ingredient</DrillyTypography>
              </InputLabel>
              <DrillyTextField
                id={`ingredient-${ingredientRowKey}`}
                fullWidth
                onChange={e =>
                  handleRowChange({
                    rowKeyToChange: ingredientRowKey,
                    rowField: 'ingredient',
                    rowFieldValue: e.currentTarget.value,
                    rows: ingredientsRows,
                    setRows: setIngredientsRows,
                  })
                }
                placeholder='Enter ingredient'
                value={ingredientRow.ingredient}
                $bgColor={tw`bg-gray-D9D9D9`}
                $bgColorDark={tw`bg-gray-3D3D3D`}
                $hasBorder={false}
                $hasError={
                  ingredientRowKey === 0 && !!errors.find(error => error.id === 'ingredients')
                }
                $isDarkMode={isDarkMode}
              />
            </div>
            <div tw='flex col-span-full gap-2 lg:col-span-3'>
              <DrillyButton
                disabled={ingredientsRows.length < 2}
                onClick={() =>
                  handleDeleteRowClick({
                    rowKeyToDelete: ingredientRowKey,
                    rows: ingredientsRows,
                    setRows: setIngredientsRows,
                  })
                }
                $variant='error'
              >
                <p tw='text-xl lg:hidden'>Delete</p>
                <DeleteForeverIcon tw='mt-0.5' />
              </DrillyButton>
              <DrillyButton
                disabled={ingredientsRows.length === 10}
                onClick={() =>
                  handleAddRowClick({
                    newRow: {
                      ingredient: '',
                      ingredientMeasurementType: 'Select measurement type...',
                      ingredientQuantity: 0,
                    },
                    rows: ingredientsRows,
                    setRows: setIngredientsRows,
                  })
                }
                $variant='primary'
              >
                <p tw='text-xl lg:hidden'>Add</p>
                <AddIcon tw='mt-0.5' />
              </DrillyButton>
            </div>
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

export default RecipeAddFormIngredients;
