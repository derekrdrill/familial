import styled from '@emotion/styled';
import tw from 'twin.macro';
import { DrillyTypography } from '../../../../../../styles/globals';

export const RecipeDetailsContainer = styled.div<{ $isEditingOrAddingRecipe: boolean }>(
  ({ $isEditingOrAddingRecipe }) => [
    !$isEditingOrAddingRecipe && tw`md:col-start-4 md:col-end-10`,
    $isEditingOrAddingRecipe && tw`lg:col-span-9 xl:col-span-8`,
  ],
);

export const RecipeIngredientsOrStepsContainer = styled.div<{ $isEditingOrAddingRecipe: boolean }>(
  ({ $isEditingOrAddingRecipe }) => [!$isEditingOrAddingRecipe && tw`md:col-start-4 md:col-end-10`],
);

export const RecipeDetailTypography = styled(DrillyTypography)<{ $isCentered: boolean }>(
  ({ $isCentered }) => [$isCentered && tw`lg:text-center`],
);

export const RecipeDetailActionButtonsContainer = styled.div<{ $isDarkMode?: boolean }>(
  ({ $isDarkMode }) => [
    !$isDarkMode && tw`bg-white`,
    $isDarkMode && tw`bg-[#282c34]`,
    tw`col-span-full`,
    tw`flex`,
    tw`justify-between`,
    tw`py-3`,
    tw`mt-2`,
    tw`sticky`,
    tw`top-[93px]`,
    tw`z-50`,
    tw`md:pb-6`,
    tw`md:top-[70px]`,
  ],
);

export const RecipeDetailPrintButton = styled.button<{
  $isPrimary?: boolean;
  $isSecondary?: boolean;
}>([
  tw`bg-info`,
  tw`border-info`,
  tw`text-info`,
  tw`bg-opacity-10`,
  tw`border-[1px]`,
  tw`px-4`,
  tw`py-1`,
  tw`rounded-lg`,
  tw`hover:bg-opacity-30`,
]);

export const RecipeDetailSubmitButtonContainer = styled.div<{ $isDarkMode?: boolean }>(
  ({ $isDarkMode }) => [
    $isDarkMode && tw`bg-['#282c34']`,
    !$isDarkMode && tw`bg-white`,
    tw`bottom-0`,
    tw`col-span-full`,
    tw`flex`,
    tw`justify-end`,
    tw`pb-4`,
    tw`shadow`,
    tw`sticky`,
  ],
);

export const RecipesFormDivider = styled.hr<{ $isDarkMode?: boolean }>(({ $isDarkMode }) => [
  !$isDarkMode && tw`border-black`,
  !$isDarkMode && tw`border-t-[0.5px]`,
  $isDarkMode && tw`border-gray-B6B6B6`,
  $isDarkMode && tw`border-t-[1px]`,
  tw`border-dashed`,
  tw`pb-4`,
  tw`md:hidden`,
  tw`w-full`,
]);
