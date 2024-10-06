import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styled from '@emotion/styled';
import tw from 'twin.macro';
import { Typography } from '@mui/material';
import DiningTwoToneIcon from '@mui/icons-material/DiningTwoTone';
import PhotoLibraryTwoToneIcon from '@mui/icons-material/PhotoLibraryTwoTone';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import GlobalContext from '../../../context/GlobalContext';

import { HomeQuickSectionTitleBar } from './';

import Carousel from '../../common/Carousel/Carousel';
import { PhotoQuick } from '../Photos';
import { RecipeCard } from '../Recipes';

import { Photos, Recipe } from '../../../types';
import { getRecipeIngredientStringArray, getRecipeStepsStringArray } from '../Recipes/helpers';

type HomeProps = {
  photosAllRandomized: Photos[];
  photosQuick: Photos[];
  recipesQuick: Recipe[];
};

const Home = ({ photosAllRandomized, photosQuick, recipesQuick }: HomeProps) => {
  const theme = useTheme();
  const isSM = useMediaQuery(theme.breakpoints.up('sm'));

  const {
    state: { isDarkMode, user },
  } = React.useContext(GlobalContext);

  return (
    <HomeRoot>
      <HomeTitleAndSlideshowDiv>
        <HomeTitleColDiv>
          <Typography color={isDarkMode ? 'white' : 'inherit'} component='h1' variant='h4'>
            {`Welcome to your Drill Familial experience, ${user?.firstName} 🙂`}
          </Typography>
          <div tw='flex flex-col gap-2'>
            <HomeActionLink href='/photos' tw='w-fit' $isPrimary>
              Go to photos <PhotoLibraryTwoToneIcon />
            </HomeActionLink>
            <HomeActionLink href='/recipes' tw='w-fit' $isSecondary>
              Go to recipes <DiningTwoToneIcon />
            </HomeActionLink>
          </div>
        </HomeTitleColDiv>
        <HomeSlideshowColDiv>
          <Carousel
            carouselContent={photosAllRandomized.map(photo => ({
              id: photo._id,
              component: (
                <div tw='flex justify-center min-w-full'>
                  <Image
                    alt='slideshow'
                    height={0}
                    sizes='100vw'
                    src={photo.url}
                    style={{
                      overflowClipMargin: 'unset',
                    }}
                    tw='h-96 object-contain w-full'
                    width={0}
                  />
                </div>
              ),
            }))}
            hasButtons={false}
            hasDots={false}
            isSlideshow
            shouldAutoPlay
          />
        </HomeSlideshowColDiv>
      </HomeTitleAndSlideshowDiv>
      <HomeQuickSectionDiv>
        <HomeQuickSectionTitleBar homeQuickSectionTitleBarStyles={tw`mb-1`} title='Quick photos' />
        <div tw='col-span-1 flex justify-center lg:p-2'>
          <Carousel
            carouselContent={photosQuick.map(photo => ({
              id: photo._id,
              component: (
                <div tw='w-80 md:w-56'>
                  <PhotoQuick
                    photoAlbumID={photo.albumID}
                    photoAlbumName={photo.albumName}
                    photoAuthorFirstName={photo.authorName.split(' ')[0]}
                    photoAuthorId={photo.authorId}
                    photoID={photo._id}
                    photoLikes={photo.likes}
                    photoLoves={photo.loves}
                    photoSmiles={photo.smiles}
                    photoTitle={photo.title}
                    photoUrl={photo.url}
                  />
                </div>
              ),
            }))}
          />
        </div>
      </HomeQuickSectionDiv>
      <HomeQuickSectionDiv>
        <HomeQuickSectionTitleBar homeQuickSectionTitleBarStyles={tw`mb-3`} title='Quick recipes' />
        <div tw='col-span-1 flex justify-center'>
          <Carousel
            carouselHeight={isSM ? 240 : 300}
            carouselContent={recipesQuick.map(recipe => ({
              id: recipe._id ?? '',
              component: (
                <RecipeCard
                  recipeAuthor={recipe.author ?? ''}
                  recipeCardContainerStyles={tw`w-96 md:w-80`}
                  recipeCookbook={recipe.cookbook}
                  recipeIngredients={getRecipeIngredientStringArray({
                    recipeIngredientData: recipe.ingredients,
                  }).join(', ')}
                  recipeId={recipe._id}
                  recipePhotoSrc={recipe.imageUrl}
                  recipeSteps={getRecipeStepsStringArray({
                    recipeSteps: recipe.steps,
                  }).join(', ')}
                  recipeTitle={recipe.title}
                  recipeTemp={recipe.temperature}
                  recipeTime={recipe.time}
                />
              ),
            }))}
          />
        </div>
      </HomeQuickSectionDiv>
    </HomeRoot>
  );
};

const HomeRoot = styled.div([tw`px-4 md:px-12`]);
const HomeSlideshowColDiv = styled.div([tw`col-span-5`, tw`mt-6`, tw`md:col-span-2`]);
const HomeTitleAndSlideshowDiv = styled.div([tw`gap-3 grid grid-cols-5`]);
const HomeTitleColDiv = styled.div([tw`col-span-3`, tw`hidden`, tw`pt-20`, tw`md:block`]);

const HomeQuickSectionDiv = styled.div([
  tw`gap-0`,
  tw`grid`,
  tw`grid-cols-1`,
  tw`mt-9`,
  tw`md:mt-8`,
]);

const HomeActionLink = styled(Link)<{
  $isPrimary?: boolean;
  $isSecondary?: boolean;
}>(({ $isPrimary = true, $isSecondary }) => [
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

export { Home };
