import React from 'react';
import { useRouter } from 'next/router';

import GlobalContext from '../../../../../context/GlobalContext';

import RecipeDetailHeader from './components/RecipeDetailHeader';
import RecipeDetails from './components/RecipeDetails';
import RecipeDetailsForm from './components/RecipeDetailsForm';
import RecipeDetailShimmer from './components/RecipeDetailShimmer';
import RecipeDetailSubmit from './components/RecipeDetailSubmit';
import RecipeImageUpload from './components/RecipeImageUpload';
import RecipeIngredientsForm from './components/RecipeIngredientsForm';
import RecipeIngredientsList from './components/RecipeIngredientsList';
import RecipeStepsForm from './components/RecipeStepsForm';
import RecipeStepsList from './components/RecipeStepsList';

import { useRecipeDetail } from './hooks/useRecipeDetail';
import {
  RecipeDetailsContainer,
  RecipeDetailTypography,
  RecipeIngredientsOrStepsContainer,
} from './styles';

import { Cookbook } from '../../../../../types';
import { DrillyTypography } from '../../../../../styles/globals';

type RecipeAddFormProps = {
  cookbooks: Cookbook[];
  recipeId?: string;
};

export const RecipeDetail = ({ cookbooks, recipeId }: RecipeAddFormProps) => {
  const router = useRouter();
  const {
    state: { isDarkMode, photoList },
  } = React.useContext(GlobalContext);

  const hasRecipeId = !!recipeId;
  const isEditingRecipe = Boolean(router.query.isEditing);
  const isEditingOrAddingRecipe = !hasRecipeId || isEditingRecipe;

  const {
    cookbook,
    cookTime,
    cookType,
    errors,
    ingredients,
    isRecipeDetailLoading,
    isRecipeFormSubmitting,
    recipeAuthor,
    recipeAuthorId,
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
    <div tw='grid grid-cols-12 mx-4 mb-8 w-full md:mx-10'>
      {isRecipeDetailLoading && <RecipeDetailShimmer />}
      {!isRecipeDetailLoading && (
        <>
          <RecipeDetailHeader
            isEditingRecipe={isEditingRecipe}
            isEditingOrAddingRecipe={isEditingOrAddingRecipe}
            recipeAuthor={recipeAuthor}
            recipeAuthorId={recipeAuthorId}
            recipeAuthorImageUrl={recipeAuthorImageUrl}
            recipeName={recipeName}
          />
          <RecipeDetailsContainer
            tw='col-span-full gap-2 grid'
            $isEditingOrAddingRecipe={isEditingOrAddingRecipe}
          >
            <RecipeDetailTypography
              tw='font-main mt-5 text-2xl'
              variant='h2'
              $isCentered={false}
              $isDarkMode={isDarkMode}
            >
              Details
            </RecipeDetailTypography>
            {!isEditingOrAddingRecipe ? (
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
          <div tw='col-span-full flex mt-4 xl:col-span-4 xl:justify-center xl:translate-y-6'>
            <RecipeImageUpload
              recipeImageUrl={recipeImageUrl}
              shouldShowImageUpload={isEditingOrAddingRecipe}
            />
          </div>
          <div tw='lg:col-span-3 xl:col-span-4'></div>
          <RecipeIngredientsOrStepsContainer
            tw='col-span-full gap-2 grid'
            $isEditingOrAddingRecipe={isEditingOrAddingRecipe}
          >
            <DrillyTypography tw='font-main mt-5 text-2xl' variant='h2' $isDarkMode={isDarkMode}>
              Ingredients
            </DrillyTypography>
            {!isEditingOrAddingRecipe ? (
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
            $isEditingOrAddingRecipe={isEditingOrAddingRecipe}
          >
            <DrillyTypography tw='font-main mt-5 text-2xl' variant='h2' $isDarkMode={isDarkMode}>
              Steps
            </DrillyTypography>
            {!isEditingOrAddingRecipe ? (
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
          <RecipeDetailSubmit
            errors={errors}
            handleSubmit={handleSubmit}
            isEditingOrAddingRecipe={isEditingOrAddingRecipe}
            isRecipeFormSubmitting={isRecipeFormSubmitting}
          />
        </>
      )}
    </div>
  );
};
