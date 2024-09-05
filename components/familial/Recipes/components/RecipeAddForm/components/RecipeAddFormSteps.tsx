import React from 'react';

import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { InputLabel } from '@mui/material';
import tw from 'twin.macro';

import GlobalContext from '../../../../../../context/GlobalContext';

import { DrillyButton, DrillyTextField, DrillyTypography } from '../../../../../../styles/globals';
import { RecipeAddFormIngredient, RecipeAddFormStep } from '../types';

type RecipeAddFormStepsProps = {
  errors: { id: string; error: string }[];
  handleAddRowClick: ({
    newRow,
    rows,
    setRows,
  }: {
    newRow: RecipeAddFormIngredient | RecipeAddFormStep;
    rows: RecipeAddFormIngredient[] | RecipeAddFormStep[];
    setRows: React.Dispatch<React.SetStateAction<any>>;
  }) => void;
  handleDeleteRowClick: ({
    rowKeyToDelete,
    rows,
    setRows,
  }: {
    rowKeyToDelete: number;
    rows: RecipeAddFormIngredient[] | RecipeAddFormStep[];
    setRows: React.Dispatch<React.SetStateAction<any>>;
  }) => void;
  handleRowChange: ({
    rowKeyToChange,
    rowField,
    rowFieldValue,
    rows,
    setRows,
  }: {
    rowKeyToChange: number;
    rowField: string;
    rowFieldValue: string;
    rows: any[];
    setRows: React.Dispatch<React.SetStateAction<any>>;
  }) => void;
  setStepRows: React.Dispatch<React.SetStateAction<RecipeAddFormStep[]>>;
  stepRows: RecipeAddFormStep[];
};

const RecipeAddFormSteps = ({
  errors,
  handleAddRowClick,
  handleDeleteRowClick,
  handleRowChange,
  setStepRows,
  stepRows,
}: RecipeAddFormStepsProps) => {
  const {
    state: { isDarkMode },
  } = React.useContext(GlobalContext);
  return (
    <>
      <DrillyTypography tw='font-main mt-5 text-2xl' variant='h2' $isDarkMode={isDarkMode}>
        Steps
      </DrillyTypography>
      <div tw='col-span-full gap-2 grid grid-cols-1 lg:grid-cols-12 max-h-80 overflow-y-auto'>
        {stepRows.map((stepRow, stepRowKey) => (
          <React.Fragment key={stepRowKey}>
            <div tw='col-span-full lg:col-span-8'>
              <InputLabel htmlFor={`step-${stepRowKey}`}>
                <DrillyTypography $isDarkMode={isDarkMode}>Step {stepRowKey + 1}</DrillyTypography>
              </InputLabel>
              <DrillyTextField
                id={`step-${stepRowKey}`}
                fullWidth
                maxRows={2}
                multiline
                onChange={e =>
                  handleRowChange({
                    rowKeyToChange: stepRowKey,
                    rowField: 'step',
                    rowFieldValue: e.currentTarget.value,
                    rows: stepRows,
                    setRows: setStepRows,
                  })
                }
                placeholder='Select measurement type'
                value={stepRow.step}
                $bgColor={tw`bg-gray-D9D9D9`}
                $bgColorDark={tw`bg-gray-3D3D3D`}
                $hasBorder={false}
                $hasError={stepRowKey === 0 && !!errors.find(error => error.id === 'steps')}
                $isDarkMode={isDarkMode}
              />
            </div>
            <div tw='col-span-full lg:col-span-4'>
              <div tw='flex col-span-full gap-2 lg:col-span-3'>
                <DrillyButton
                  disabled={stepRows.length < 2}
                  onClick={() =>
                    handleDeleteRowClick({
                      rowKeyToDelete: stepRowKey,
                      rows: stepRows,
                      setRows: setStepRows,
                    })
                  }
                  $variant='error'
                >
                  <span tw='text-xl lg:hidden'>Delete</span>
                  <DeleteForeverIcon tw='mt-0.5' />
                </DrillyButton>
                <DrillyButton
                  disabled={stepRows.length === 10}
                  onClick={() =>
                    handleAddRowClick({
                      newRow: {
                        step: '',
                      },
                      rows: stepRows,
                      setRows: setStepRows,
                    })
                  }
                  $variant='primary'
                >
                  <span tw='text-xl lg:hidden'>Add</span>
                  <AddIcon tw='mt-0.5' />
                </DrillyButton>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

export default RecipeAddFormSteps;
