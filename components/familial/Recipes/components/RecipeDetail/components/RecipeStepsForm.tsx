import React from 'react';
import tw from 'twin.macro';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { InputLabel } from '@mui/material';

import GlobalContext from '../../../../../../context/GlobalContext';

import { DrillyButton, DrillyTextField, DrillyTypography } from '../../../../../../styles/globals';
import { FormError, RecipeIngredient, RecipeStep } from '../../../../../../types';

type RecipeStepsFormProps = {
  errors: FormError[];
  handleAddRowClick: ({
    newRow,
    rows,
    setRows,
  }: {
    newRow: RecipeIngredient | RecipeStep;
    rows: RecipeIngredient[] | RecipeStep[];
    setRows: React.Dispatch<React.SetStateAction<any>>;
  }) => void;
  handleDeleteRowClick: ({
    rowKeyToDelete,
    rows,
    setRows,
  }: {
    rowKeyToDelete: number;
    rows: RecipeIngredient[] | RecipeStep[];
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
  setStepRows: React.Dispatch<React.SetStateAction<RecipeStep[]>>;
  steps: RecipeStep[];
};

const RecipeStepsForm = ({
  errors,
  handleAddRowClick,
  handleDeleteRowClick,
  handleRowChange,
  setStepRows,
  steps,
}: RecipeStepsFormProps) => {
  const {
    state: { isDarkMode },
  } = React.useContext(GlobalContext);

  const stepRowsError = errors.find(error => error.id === 'steps')?.error;
  const hasStepRowsError = !!stepRowsError;

  return (
    <>
      <div tw='col-span-full gap-2 grid grid-cols-1 lg:grid-cols-12 max-h-80 overflow-y-auto'>
        {steps.map((stepRow, stepRowKey) => {
          const hasErrorOnRow = !!errors.find(
            error => error.id === 'steps' && error.multiRowErrorKeys?.includes(stepRowKey),
          );

          return (
            <React.Fragment key={stepRowKey}>
              <div tw='col-span-full lg:col-span-8'>
                <InputLabel htmlFor={`step-${stepRowKey}`}>
                  <DrillyTypography
                    $textColor={hasErrorOnRow ? tw`text-error` : undefined}
                    $isDarkMode={isDarkMode}
                  >
                    Step {stepRowKey + 1} *
                  </DrillyTypography>
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
                      rows: steps,
                      setRows: setStepRows,
                    })
                  }
                  placeholder='Select measurement type'
                  value={stepRow.step}
                  $bgColor={tw`bg-gray-D9D9D9`}
                  $bgColorDark={tw`bg-gray-3D3D3D`}
                  $hasBorder={false}
                  $hasError={hasErrorOnRow}
                  $isDarkMode={isDarkMode}
                />
              </div>
              <div tw='col-span-full lg:col-span-4'>
                <div tw='flex col-span-full gap-2 lg:col-span-3'>
                  <DrillyButton
                    disabled={steps.length < 2}
                    onClick={() =>
                      handleDeleteRowClick({
                        rowKeyToDelete: stepRowKey,
                        rows: steps,
                        setRows: setStepRows,
                      })
                    }
                    tw='mt-9'
                    $isDisabled={steps.length < 2}
                    $variant='error'
                  >
                    <span tw='text-xl lg:hidden'>Delete</span>
                    <DeleteForeverIcon tw='mt-0.5' />
                  </DrillyButton>
                  <DrillyButton
                    disabled={steps.length === 15 || hasStepRowsError}
                    onClick={() =>
                      handleAddRowClick({
                        newRow: {
                          step: '',
                        },
                        rows: steps,
                        setRows: setStepRows,
                      })
                    }
                    tw='mt-9'
                    $isDisabled={steps.length === 15 || hasStepRowsError}
                    $variant='primary'
                  >
                    <span tw='text-xl lg:hidden'>Add</span>
                    <AddIcon tw='mt-0.5' />
                  </DrillyButton>
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
      <div tw='col-span-full'>
        {hasStepRowsError && (
          <DrillyTypography $textColor={tw`text-error`} component='p' variant='caption'>
            {stepRowsError}
          </DrillyTypography>
        )}
      </div>
    </>
  );
};

export default RecipeStepsForm;
