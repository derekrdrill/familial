import React from 'react';
import tw from 'twin.macro';
import { DrillyButton, DrillyTypography } from '../../../../../../styles/globals';
import { CircularProgress } from '@mui/material';
import { FormError } from '../../../../../../types';

type RecipeDetailSubmitProps = {
  errors: FormError[];
  handleSubmit: () => void;
  isEditingOrAddingRecipe: boolean;
  isRecipeFormSubmitting: boolean;
};

const RecipeDetailSubmit = ({
  errors,
  handleSubmit,
  isEditingOrAddingRecipe,
  isRecipeFormSubmitting,
}: RecipeDetailSubmitProps) => {
  return (
    isEditingOrAddingRecipe && (
      <div tw='col-span-full flex justify-end'>
        <div tw='w-fit'>
          <DrillyButton
            disabled={!!errors.length || isRecipeFormSubmitting}
            onClick={handleSubmit}
            tw='py-2 mt-9 w-full md:w-fit'
            $isDisabled={!!errors.length || isRecipeFormSubmitting}
            $twStyles={tw`lg:px-2`}
            $variant='success'
          >
            {isRecipeFormSubmitting ? <CircularProgress /> : 'Submit'}
          </DrillyButton>
          {!!errors.length && (
            <DrillyTypography component='p' variant='caption' $textColor={tw`text-error`}>
              Please fix errors
            </DrillyTypography>
          )}
        </div>
      </div>
    )
  );
};

export default RecipeDetailSubmit;
