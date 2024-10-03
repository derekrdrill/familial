import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import tw from 'twin.macro';
import CachedIcon from '@mui/icons-material/Cached';
import LaunchIcon from '@mui/icons-material/Launch';

import GlobalContext from '../../../../../context/GlobalContext';
import RecipeRandomMetadata from './components/RecipeRandomMetadata';
import { DrillyTypography } from '../../../../../styles/globals';
import { GlobalReducerActionEnum } from '../../../../../context/GlobalReducer';
import RecipeRandomShimmer from './components/RecipeRandomShimmer';

export default function RecipeRandom() {
  const router = useRouter();
  const {
    dispatch,
    state: { isDarkMode, recipeRandom },
  } = React.useContext(GlobalContext);

  const [isRandomRecipeLoading, setIsRandomRecipeLoading] = React.useState<boolean>(false);

  return (
    <div tw='gap-4 grid grid-cols-1 mt-12 md:grid-cols-2 md:gap-8'>
      {isRandomRecipeLoading && <RecipeRandomShimmer />}
      {!isRandomRecipeLoading && (
        <>
          <Image
            height={0}
            alt='recipe-image'
            sizes='100vw'
            src={recipeRandom?.imageUrl ?? '/dinner2.webp'}
            tw='max-h-80 object-cover rounded-3xl w-full'
            width={0}
          />
          <div tw='flex flex-col gap-3'>
            <div>
              <DrillyTypography component='h2' tw='font-main text-3xl' $isDarkMode={isDarkMode}>
                {recipeRandom?.title}
              </DrillyTypography>
              <DrillyTypography component='p' tw='font-main text-xl' $isDarkMode={isDarkMode}>
                by {recipeRandom?.author}
              </DrillyTypography>
            </div>
            <div tw='flex flex-col gap-1'>
              <RecipeRandomMetadata recipeRandomKey='type' />
              <RecipeRandomMetadata recipeRandomKey='temperature' />
              <RecipeRandomMetadata recipeRandomKey='time' />
              <RecipeRandomMetadata recipeRandomKey='ingredients' />
              <RecipeRandomMetadata recipeRandomKey='steps' />
            </div>
            <div tw='flex gap-2'>
              <RecipeRandomButton
                onClick={async () => {
                  setIsRandomRecipeLoading(true);

                  await fetch(`/api/recipe/get?isRandom=true`).then(async res => {
                    const recipeRandomResponse = await res.json();
                    const recipeRandom = recipeRandomResponse[0];

                    dispatch({
                      type: GlobalReducerActionEnum.SET_RECIPE_RANDOM,
                      payload: { recipeRandom: recipeRandom },
                    });
                  });

                  setIsRandomRecipeLoading(false);
                }}
              >
                Show another <CachedIcon />
              </RecipeRandomButton>
              <RecipeRandomButton
                onClick={() => {
                  router.push({
                    pathname: `/recipes/${recipeRandom?._id}`,
                  });
                }}
                $isSecondary
              >
                Go to recipe <LaunchIcon />
              </RecipeRandomButton>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

const RecipeRandomButton = styled.button<{
  $isDarkMode?: boolean;
  $isPrimary?: boolean;
  $isSecondary?: boolean;
}>(({ $isDarkMode, $isPrimary = true, $isSecondary }) => [
  $isPrimary && tw`bg-primary`,
  $isPrimary && tw`border-primary`,
  $isPrimary && tw`text-primary`,
  $isSecondary && tw`bg-secondary`,
  $isSecondary && tw`border-secondary`,
  $isSecondary && tw`text-secondary`,
  tw`bg-opacity-10`,
  tw`border-[1px]`,
  tw`min-w-[120px]`,
  tw`px-2`,
  tw`py-2`,
  tw`rounded`,
  tw`hover:bg-opacity-30`,
]);
