import React from 'react';
import Link from 'next/link';
import tw from 'twin.macro';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import PrintIcon from '@mui/icons-material/Print';

import GlobalContext from '../../../../../context/GlobalContext';

import RecipeDetails from './components/RecipeDetails';
import RecipeDetailsForm from './components/RecipeDetailsForm';
import RecipeDetailShimmer from './components/RecipeDetailShimmer';
import RecipeImageUpload from './components/RecipeImageUpload';
import RecipeIngredientsForm from './components/RecipeIngredientsForm';
import RecipeIngredientsList from './components/RecipeIngredientsList';
import RecipeStepsForm from './components/RecipeStepsForm';
import RecipeStepsList from './components/RecipeStepsList';

import { useRecipeDetail } from './hooks/useRecipeDetail';
import {
  RecipeDetailActionButtonsContainer,
  RecipeDetailsContainer,
  RecipeDetailPrintButton,
  RecipeDetailTypography,
  RecipeIngredientsOrStepsContainer,
} from './styles';

import { Cookbook } from '../../../../../types';
import { DrillyButton, DrillyTypography } from '../../../../../styles/globals';
import Image from 'next/image';

type RecipeAddFormProps = {
  cookbooks: Cookbook[];
  recipeId?: string;
};

export const RecipeDetail = ({ cookbooks, recipeId }: RecipeAddFormProps) => {
  const {
    state: { isDarkMode, photoList },
  } = React.useContext(GlobalContext);

  const hasRecipeId = !!recipeId;

  const {
    cookbook,
    cookTime,
    cookType,
    errors,
    ingredients,
    isRecipeDetailLoading,
    newRecipeData,
    recipeAuthor,
    recipeAuthorImageUrl,
    recipeImageUrl,
    recipeName,
    steps,
    temperature,
    handleAddRowClick,
    handleDeleteRowClick,
    handleRowChange,
    handleSubmit,
    setCookTime,
    setCookType,
    setCookbook,
    setErrors,
    setIngredients,
    setIsRecipeDetailLoading,
    setRecipeImage,
    setRecipeName,
    setStepRows,
    setTemperature,
  } = useRecipeDetail({ recipeId });

  React.useEffect(() => {
    setRecipeImage(!!photoList?.length ? photoList : undefined);
  }, [photoList]);

  React.useEffect(() => {
    if (!!recipeId) {
      setIsRecipeDetailLoading(true);
    }
  }, [recipeId]);

  React.useEffect(() => {
    if (!!recipeName) {
      setIsRecipeDetailLoading(false);
    }
  }, [recipeName]);

  return (
    <div tw='grid grid-cols-12 mx-10 my-8 w-full'>
      {isRecipeDetailLoading && <RecipeDetailShimmer />}
      {!isRecipeDetailLoading && (
        <>
          <RecipeDetailActionButtonsContainer $isDarkMode={isDarkMode}>
            <Link href='/recipes' tw='flex gap-1 text-primary hover:underline'>
              <KeyboardDoubleArrowLeftIcon />
              Go back to all recipes
            </Link>
            {hasRecipeId && (
              <RecipeDetailPrintButton onClick={() => window.print()}>
                Print
                <PrintIcon />
              </RecipeDetailPrintButton>
            )}
          </RecipeDetailActionButtonsContainer>
          <RecipeDetailsContainer
            tw='col-span-full grid grid-cols-12'
            $isEditingOrAddingRecipe={!hasRecipeId}
          >
            <RecipeDetailTypography
              tw='col-span-full font-main text-3xl'
              variant='h1'
              $isCentered={false}
              $isDarkMode={isDarkMode}
            >
              {hasRecipeId ? recipeName : 'New recipe'}
            </RecipeDetailTypography>
            <div tw='col-span-full flex gap-2'>
              <RecipeDetailTypography
                tw='col-span-full'
                $isCentered={false}
                $isDarkMode={isDarkMode}
              >
                added by {recipeAuthor}
              </RecipeDetailTypography>
              {recipeAuthorImageUrl && (
                <Image
                  alt=''
                  height={0}
                  src={recipeAuthorImageUrl ?? ''}
                  width={0}
                  sizes='100vw'
                  tw='rounded-3xl h-6 object-cover w-6'
                />
              )}
            </div>
          </RecipeDetailsContainer>
          <RecipeDetailsContainer
            tw='col-span-full gap-2 grid'
            $isEditingOrAddingRecipe={!hasRecipeId}
          >
            <RecipeDetailTypography
              tw='font-main mt-5 text-2xl'
              variant='h2'
              $isCentered={false}
              $isDarkMode={isDarkMode}
            >
              Details
            </RecipeDetailTypography>
            {hasRecipeId ? (
              <RecipeDetails
                cookbook={cookbook}
                cookType={cookType}
                cookTime={cookTime}
                recipeImageUrl={recipeImageUrl ?? ''}
                temperature={temperature}
              />
            ) : (
              <RecipeDetailsForm
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
            )}
          </RecipeDetailsContainer>
          <div tw='col-span-full flex mt-4 -translate-x-8 xl:col-span-4 xl:justify-center xl:translate-y-6 xl:-translate-x-4'>
            <RecipeImageUpload shouldShowImageUpload={!hasRecipeId} />
          </div>
          <div tw='lg:col-span-3 xl:col-span-4'></div>
          <RecipeIngredientsOrStepsContainer
            tw='col-span-full gap-2 grid'
            $isEditingOrAddingRecipe={!hasRecipeId}
          >
            <DrillyTypography tw='font-main mt-5 text-2xl' variant='h2' $isDarkMode={isDarkMode}>
              Ingredients
            </DrillyTypography>
            {hasRecipeId ? (
              <RecipeIngredientsList ingredients={ingredients} />
            ) : (
              <RecipeIngredientsForm
                errors={errors}
                handleAddRowClick={handleAddRowClick}
                handleDeleteRowClick={handleDeleteRowClick}
                handleRowChange={handleRowChange}
                ingredients={ingredients}
                setIngredients={setIngredients}
              />
            )}
          </RecipeIngredientsOrStepsContainer>
          <RecipeIngredientsOrStepsContainer
            tw='col-span-full gap-2 grid'
            $isEditingOrAddingRecipe={!hasRecipeId}
          >
            <DrillyTypography tw='font-main mt-5 text-2xl' variant='h2' $isDarkMode={isDarkMode}>
              Steps
            </DrillyTypography>
            {hasRecipeId ? (
              <RecipeStepsList steps={steps} />
            ) : (
              <RecipeStepsForm
                errors={errors}
                handleAddRowClick={handleAddRowClick}
                handleDeleteRowClick={handleDeleteRowClick}
                handleRowChange={handleRowChange}
                setStepRows={setStepRows}
                steps={steps}
              />
            )}
          </RecipeIngredientsOrStepsContainer>
          {!hasRecipeId && (
            <div tw='col-span-full flex justify-end'>
              <div tw='w-fit'>
                <DrillyButton
                  disabled={!!errors.length}
                  onClick={handleSubmit}
                  tw='py-2 mt-9 w-full md:w-fit'
                  $isDisabled={!!errors.length}
                  $styles={tw`lg:px-2`}
                  $variant='success'
                >
                  Submit
                </DrillyButton>
                {!!errors.length && (
                  <DrillyTypography component='p' variant='caption' $textColor={tw`text-error`}>
                    Please fix errors
                  </DrillyTypography>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
