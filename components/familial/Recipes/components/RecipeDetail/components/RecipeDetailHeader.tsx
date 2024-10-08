import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IconButton } from '@mui/material';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import PrintIcon from '@mui/icons-material/Print';

import {
  RecipeDetailActionButtonsContainer,
  RecipeDetailPrintButton,
  RecipeDetailsContainer,
  RecipeDetailTypography,
} from '../styles';
import GlobalContext from '../../../../../../context/GlobalContext';

type RecipeDetailHeaderProps = {
  isEditingRecipe: boolean;
  isEditingOrAddingRecipe: boolean;
  recipeAuthor?: string;
  recipeAuthorImageUrl?: string;
  recipeName: string;
};

const RecipeDetailHeader = ({
  isEditingRecipe,
  isEditingOrAddingRecipe,
  recipeAuthor,
  recipeAuthorImageUrl,
  recipeName,
}: RecipeDetailHeaderProps) => {
  const router = useRouter();

  const {
    state: { isDarkMode },
  } = React.useContext(GlobalContext);

  return (
    <>
      <RecipeDetailActionButtonsContainer $isDarkMode={isDarkMode}>
        <Link
          href={`/recipes${isEditingRecipe ? `/${router.query.recipeId}` : ''}`}
          tw='flex gap-1 text-primary hover:underline'
        >
          <KeyboardDoubleArrowLeftIcon />
          Go back to {isEditingRecipe ? 'recipe' : 'all recipes'}
        </Link>
        {!isEditingOrAddingRecipe && (
          <RecipeDetailPrintButton onClick={() => window.print()}>
            Print
            <PrintIcon />
          </RecipeDetailPrintButton>
        )}
      </RecipeDetailActionButtonsContainer>
      <RecipeDetailsContainer
        tw='col-span-full grid grid-cols-12'
        $isEditingOrAddingRecipe={isEditingOrAddingRecipe}
      >
        <div tw='col-span-full flex'>
          <RecipeDetailTypography
            tw='font-main text-3xl'
            variant='h1'
            $isCentered={false}
            $isDarkMode={isDarkMode}
          >
            {isEditingRecipe && 'Editing: '}
            <span tw='text-2xl'>
              {!isEditingOrAddingRecipe || isEditingRecipe ? recipeName : 'New recipe'}
            </span>
          </RecipeDetailTypography>
          {!isEditingOrAddingRecipe && (
            <IconButton
              color='primary'
              onClick={() => {
                router.replace({
                  pathname: router.asPath,
                  query: { isEditing: true },
                });
              }}
            >
              <EditTwoToneIcon />
            </IconButton>
          )}
        </div>
        <div tw='col-span-full flex gap-2'>
          {(!isEditingOrAddingRecipe || isEditingRecipe) && (
            <RecipeDetailTypography tw='col-span-full' $isCentered={false} $isDarkMode={isDarkMode}>
              added by {recipeAuthor}
            </RecipeDetailTypography>
          )}
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
    </>
  );
};

export default RecipeDetailHeader;
