import React from 'react';
import styled from '@emotion/styled';
import tw, { TwStyle } from 'twin.macro';
import { IconButton } from '@mui/material';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';

import GlobalContext from '../../../../context/GlobalContext';

type RecipeCardType = {
  recipeAuthor: string;
  recipeCardContainerStyles: TwStyle;
  recipeIngredients: string;
  recipeSteps: string;
  recipeTemp: string;
  recipeTime: string;
  recipeTitle: string;
};

const RecipeCard = ({
  recipeAuthor,
  recipeCardContainerStyles,
  recipeIngredients,
  recipeSteps,
  recipeTemp,
  recipeTime,
  recipeTitle,
}: RecipeCardType) => {
  const {
    state: { isDarkMode },
  } = React.useContext(GlobalContext);

  return (
    <RecipeCardRootDiv $styles={recipeCardContainerStyles}>
      <RecipeCardHeaderDiv $isDarkMode={isDarkMode}>
        <RecipeCardHeaderTitleDiv>
          <RecipeCardHeaderTitleH3 $isDarkMode={isDarkMode}>
            {recipeTitle}
          </RecipeCardHeaderTitleH3>
          <RecipeCardHeaderAddedBySpan $isDarkMode={isDarkMode}>
            by {recipeAuthor}
          </RecipeCardHeaderAddedBySpan>
        </RecipeCardHeaderTitleDiv>
        <IconButton color='error' tw='p-0'>
          <FavoriteBorder />
        </IconButton>
      </RecipeCardHeaderDiv>
      <RecipeCardBodyDiv $isDarkMode={isDarkMode}>
        <RecipeCardInfoColDiv>
          <RecipeCardInfoRootDiv>
            <RecipeCardInfoParagraph>
              <RecipeCardInfoSubtitle>Temp: </RecipeCardInfoSubtitle>
              {recipeTemp}
            </RecipeCardInfoParagraph>
            <RecipeCardInfoParagraph>
              <RecipeCardInfoSubtitle>Time to cook: </RecipeCardInfoSubtitle>
              {recipeTime}
            </RecipeCardInfoParagraph>
            <RecipeCardInfoParagraph>
              <RecipeCardInfoSubtitle>Ingredients: </RecipeCardInfoSubtitle>
              {recipeIngredients}
            </RecipeCardInfoParagraph>
            <RecipeCardInfoParagraph>
              <RecipeCardInfoSubtitle>Steps: </RecipeCardInfoSubtitle>
              {recipeSteps}
            </RecipeCardInfoParagraph>
          </RecipeCardInfoRootDiv>
        </RecipeCardInfoColDiv>
        <RecipeCardImageDiv>
          <RecipeCardImage alt='recipe-image' src='/dinner2.webp' />
        </RecipeCardImageDiv>
      </RecipeCardBodyDiv>
    </RecipeCardRootDiv>
  );
};

const RecipeCardHeaderTitleDiv = styled.div([tw`flex`, tw`gap-1`]);
const RecipeCardInfoColDiv = styled.div([tw`col-span-2`, tw`h-auto`, tw`p-2`]);
const RecipeCardInfoRootDiv = styled.div([tw`flex`, tw`flex-col`, tw`gap-1`]);
const RecipeCardInfoParagraph = styled.p([tw`lg:text-sm`]);
const RecipeCardInfoSubtitle = styled.span([tw`font-semibold`]);
const RecipeCardImageDiv = styled.div([tw`col-span-1`, tw`h-auto`]);

const RecipeCardImage = styled.img([
  tw`block`,
  tw`h-auto`,
  tw`min-h-full`,
  tw`object-cover`,
  tw`rounded-br-lg`,
  tw`w-full`,
]);

const RecipeCardRootDiv = styled.div<{ $styles: TwStyle }>(({ $styles }) => [
  tw`h-60`,
  tw`rounded-xl`,
  tw`md:h-48`,
  $styles,
]);

const RecipeCardBodyDiv = styled.div<{ $isDarkMode?: boolean }>(
  ({ $isDarkMode }) => [
    !$isDarkMode && tw`bg-gray-D9D9D9`,
    $isDarkMode && tw`bg-gray-696969`,
    tw`gap-0`,
    tw`grid`,
    tw`grid-cols-3`,
    tw`min-h-full`,
    tw`rounded-b-lg`,
  ],
);

const RecipeCardHeaderAddedBySpan = styled.span<{
  $isDarkMode?: boolean;
}>(({ $isDarkMode }) => [
  !$isDarkMode && tw`text-gray-777777`,
  $isDarkMode && tw`text-gray-DADADA`,
  tw`text-xs`,
  tw`translate-y-1`,
]);

const RecipeCardHeaderTitleH3 = styled.h3<{ $isDarkMode?: boolean }>(
  ({ $isDarkMode }) => [
    !$isDarkMode && tw`text-inherit`,
    $isDarkMode && tw`text-white`,
    tw`text-xl`,
    tw`lg:text-base`,
  ],
);

const RecipeCardHeaderDiv = styled.div<{ $isDarkMode?: boolean }>(
  ({ $isDarkMode }) => [
    !$isDarkMode && tw`bg-notecard`,
    $isDarkMode && tw`bg-gray-3D3D3D`,
    tw`flex`,
    tw`justify-between`,
    tw`p-2`,
    tw`rounded-t-xl`,
    tw`w-full`,
  ],
);

export {
  RecipeCard,
  RecipeCardBodyDiv,
  RecipeCardHeaderAddedBySpan,
  RecipeCardHeaderDiv,
  RecipeCardHeaderTitleH3,
};
