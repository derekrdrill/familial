import React from 'react';

import GlobalContext from '../../../../../context/GlobalContext';
import PhotoUploader from '../../../../common/PhotoUploader';

import RecipeAddFormDetails from './components/RecipeAddFormDetails';
import RecipeAddFormIngredients from './components/RecipeAddFormIngredients';
import RecipeAddFormSteps from './components/RecipeAddFormSteps';
import { useRecipeAddForm } from './hooks/useRecipeAddForm';

import { Cookbook } from '../../../../../types';
import { DrillyButton, DrillyTypography } from '../../../../../styles/globals';

type RecipeAddFormProps = {
  cookbooks: Cookbook[];
};

export const RecipeAddForm = ({ cookbooks }: RecipeAddFormProps) => {
  const {
    state: { isDarkMode },
  } = React.useContext(GlobalContext);

  const {
    cookbook,
    cookTime,
    cookType,
    errors,
    ingredientsRows,
    recipeName,
    stepRows,
    temperature,
    handleAddRowClick,
    handleDeleteRowClick,
    handleRowChange,
    handleSubmit,
    setCookTime,
    setCookType,
    setCookbook,
    setIngredientsRows,
    setRecipeName,
    setStepRows,
    setTemperature,
  } = useRecipeAddForm();

  return (
    <div tw='grid grid-cols-12 mt-8 mx-10 w-full'>
      <div tw='col-span-full'>
        <DrillyTypography tw='font-main text-3xl' variant='h1' $isDarkMode={isDarkMode}>
          New recipe
        </DrillyTypography>
      </div>
      <div tw='col-span-full gap-2 grid lg:col-span-9 xl:col-span-8'>
        <RecipeAddFormDetails
          allCookbooks={cookbooks}
          cookbook={cookbook}
          cookTime={cookTime}
          cookType={cookType}
          errors={errors}
          recipeName={recipeName}
          setCookbook={setCookbook}
          setCookTime={setCookTime}
          setCookType={setCookType}
          setRecipeName={setRecipeName}
          setTemperature={setTemperature}
          temperature={temperature}
        />
      </div>
      <div tw='col-span-full mt-4 -translate-x-8 xl:col-span-4 xl:translate-y-6 xl:-translate-x-4'>
        <PhotoUploader isMultiple={false} />
      </div>
      <div tw='lg:col-span-3 xl:col-span-4'></div>
      <div tw='col-span-full gap-2 grid'>
        <RecipeAddFormIngredients
          errors={errors}
          handleAddRowClick={handleAddRowClick}
          handleDeleteRowClick={handleDeleteRowClick}
          handleRowChange={handleRowChange}
          ingredientsRows={ingredientsRows}
          setIngredientsRows={setIngredientsRows}
        />
      </div>
      <div tw='col-span-full gap-2 grid'>
        <RecipeAddFormSteps
          errors={errors}
          handleAddRowClick={handleAddRowClick}
          handleDeleteRowClick={handleDeleteRowClick}
          handleRowChange={handleRowChange}
          setStepRows={setStepRows}
          stepRows={stepRows}
        />
      </div>
      <div tw='col-span-full flex justify-end'>
        <DrillyButton onClick={handleSubmit} tw='py-2 mt-9' $variant='success'>
          Submit
        </DrillyButton>
      </div>
    </div>
  );
};
