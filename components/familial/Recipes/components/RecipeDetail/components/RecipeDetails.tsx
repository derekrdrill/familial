import React from 'react';
import Image from 'next/image';

import GlobalContext from '../../../../../../context/GlobalContext';
import { RecipeDetailTypography } from '../styles';

type RecipeDetailsProps = {
  cookbook: string;
  cookTime: string;
  cookType: string;
  recipeImageUrl: string;
  temperature: string;
};

const RecipeDetails = ({
  cookbook,
  cookTime,
  cookType,
  recipeImageUrl,
  temperature,
}: RecipeDetailsProps) => {
  const {
    state: { isDarkMode },
  } = React.useContext(GlobalContext);

  return (
    <div tw='flex flex-col'>
      {cookType && (
        <RecipeDetailTypography
          component='p'
          variant='body1'
          $isCentered={false}
          $isDarkMode={isDarkMode}
        >
          <span tw='font-bold'>Cook type:</span> {cookType}
        </RecipeDetailTypography>
      )}
      {cookbook && (
        <RecipeDetailTypography
          component='p'
          variant='body1'
          $isCentered={false}
          $isDarkMode={isDarkMode}
        >
          <span tw='font-bold'>Cookbook:</span> {cookbook}
        </RecipeDetailTypography>
      )}
      {temperature && (
        <RecipeDetailTypography
          component='p'
          variant='body1'
          $isCentered={false}
          $isDarkMode={isDarkMode}
        >
          <span tw='font-bold'>Temperature:</span> {temperature}
        </RecipeDetailTypography>
      )}
      {cookTime && (
        <RecipeDetailTypography
          component='p'
          variant='body1'
          $isCentered={false}
          $isDarkMode={isDarkMode}
        >
          <span tw='font-bold'>Cook time:</span> {cookTime}
        </RecipeDetailTypography>
      )}
      {recipeImageUrl && (
        <Image
          alt={recipeImageUrl ?? ''}
          height={0}
          loading='lazy'
          sizes='100vw'
          src={recipeImageUrl ?? ''}
          tw='h-96 mt-2 object-contain w-full lg:object-cover'
          width={0}
        />
      )}
    </div>
  );
};

export default RecipeDetails;
