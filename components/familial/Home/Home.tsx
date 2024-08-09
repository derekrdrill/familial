import React from 'react';
import Image from 'next/image';
import styled from '@emotion/styled';
import tw, { TwStyle } from 'twin.macro';
import { Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import GlobalContext from '../../../context/GlobalContext';

import { HomeQuickSectionTitleBar } from './';

import Carousel from '../../common/Carousel/Carousel';
import { PhotoQuick } from '../Photos';
import { RecipeCard } from '../Recipes';

import { Photos } from '../../../context/types';

type HomeProps = {
  photosAllRandomized: Photos[];
  photosQuick: Photos[];
};

const Home = ({ photosAllRandomized, photosQuick }: HomeProps) => {
  const theme = useTheme();
  const isMD = useMediaQuery(theme.breakpoints.up('md'));

  const {
    state: { isDarkMode },
  } = React.useContext(GlobalContext);

  return (
    <HomeRoot>
      <HomeTitleAndSlideshowDiv>
        <HomeTitleColDiv>
          <Typography
            color={isDarkMode ? 'white' : 'inherit'}
            component='h1'
            variant='h4'
          >
            Welcome to your Drill Familial experience, Derek :)
          </Typography>
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
        <HomeQuickSectionTitleBar
          homeQuickSectionTitleBarStyles={tw`mb-1`}
          title='Quick photos'
        />
        <div tw='col-span-1 flex justify-center lg:p-2 lg:px-8'>
          <Carousel
            carouselContent={photosQuick.map(photo => ({
              id: photo._id,
              component: (
                <div tw='w-80 md:w-56'>
                  <PhotoQuick
                    photoAlbumID={photo.albumID}
                    photoID={photo._id}
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
        <HomeQuickSectionTitleBar
          homeQuickSectionTitleBarStyles={tw`mb-3`}
          title='Quick recipes'
        />
        <div tw='col-span-1 flex justify-center px-8'>
          <Carousel
            carouselHeight={isMD ? 250 : 290}
            carouselContent={[
              {
                id: '1',
                component: (
                  <RecipeCard
                    recipeAuthor='Derek'
                    recipeCardContainerStyles={tw`w-96 md:w-80`}
                    recipeIngredients='1 whole chicken, 12 yukon gold potatoes, 1 bundle of parsley, 2 wh...'
                    recipeSteps='1) cut onions into medium pieces, 2) create bed of potatoes & onions in dutch oven, 3) place whole ch...'
                    recipeTemp='425° F'
                    recipeTime='40 minutes'
                    recipeTitle='Chicken dinner'
                  />
                ),
              },
              {
                id: '2',
                component: (
                  <RecipeCard
                    recipeAuthor='Derek'
                    recipeCardContainerStyles={tw`w-96 md:w-80`}
                    recipeIngredients='1 whole chicken, 12 yukon gold potatoes, 1 bundle of parsley, 2 wh...'
                    recipeSteps='1) cut onions into medium pieces, 2) create bed of potatoes & onions in dutch oven, 3) place whole ch...'
                    recipeTemp='425° F'
                    recipeTime='40 minutes'
                    recipeTitle='Chicken dinner'
                  />
                ),
              },
              {
                id: '3',
                component: (
                  <RecipeCard
                    recipeAuthor='Derek'
                    recipeCardContainerStyles={tw`w-96 md:w-80`}
                    recipeIngredients='1 whole chicken, 12 yukon gold potatoes, 1 bundle of parsley, 2 wh...'
                    recipeSteps='1) cut onions into medium pieces, 2) create bed of potatoes & onions in dutch oven, 3) place whole ch...'
                    recipeTemp='425° F'
                    recipeTime='40 minutes'
                    recipeTitle='Chicken dinner'
                  />
                ),
              },
              {
                id: '4',
                component: (
                  <RecipeCard
                    recipeAuthor='Derek'
                    recipeCardContainerStyles={tw`w-96 md:w-80`}
                    recipeIngredients='1 whole chicken, 12 yukon gold potatoes, 1 bundle of parsley, 2 wh...'
                    recipeSteps='1) cut onions into medium pieces, 2) create bed of potatoes & onions in dutch oven, 3) place whole ch...'
                    recipeTemp='425° F'
                    recipeTime='40 minutes'
                    recipeTitle='Chicken dinner'
                  />
                ),
              },
              {
                id: '5',
                component: (
                  <RecipeCard
                    recipeAuthor='Derek'
                    recipeCardContainerStyles={tw`w-96 md:w-80`}
                    recipeIngredients='1 whole chicken, 12 yukon gold potatoes, 1 bundle of parsley, 2 wh...'
                    recipeSteps='1) cut onions into medium pieces, 2) create bed of potatoes & onions in dutch oven, 3) place whole ch...'
                    recipeTemp='425° F'
                    recipeTime='40 minutes'
                    recipeTitle='Chicken dinner'
                  />
                ),
              },
            ]}
          />
        </div>
      </HomeQuickSectionDiv>
    </HomeRoot>
  );
};

const HomeRoot = styled.div([tw`px-4 md:px-12`]);
const HomeSlideshowColDiv = styled.div([
  tw`col-span-5`,
  tw`mt-6`,
  tw`md:col-span-2`,
]);
const HomeTitleAndSlideshowDiv = styled.div([tw`gap-3 grid grid-cols-5`]);
const HomeTitleColDiv = styled.div([
  tw`col-span-3 pt-20`,
  tw`hidden`,
  tw`md:block`,
]);

const HomeQuickSectionDiv = styled.div([
  tw`gap-0`,
  tw`grid`,
  tw`grid-cols-1`,
  tw`mt-9`,
  tw`md:mt-8`,
]);

export { Home };
