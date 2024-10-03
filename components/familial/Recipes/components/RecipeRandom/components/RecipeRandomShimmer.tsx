import React from 'react';
import { Shimmer } from 'react-shimmer';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

type RecipeRandomShimmerProps = {};

const RecipeRandomShimmer = ({}: RecipeRandomShimmerProps) => {
  const theme = useTheme();
  const isXS = useMediaQuery(theme.breakpoints.up('xs'));
  const isSM = useMediaQuery(theme.breakpoints.up('sm'));
  const isMD = useMediaQuery(theme.breakpoints.up('md'));
  const isLG = useMediaQuery(theme.breakpoints.up('lg'));

  return (
    <div tw='col-span-full flex flex-col gap-8 justify-between md:flex-row'>
      <div tw='w-full md:w-1/2'>
        <Shimmer
          height={325}
          width={isXS && !isSM ? 440 : isSM && !isMD ? 400 : isMD && !isLG ? 375 : 525}
        />
      </div>
      <div tw='flex flex-col gap-2 w-full md:w-1/2'>
        <Shimmer
          height={100}
          width={isXS && !isSM ? 440 : isSM && !isMD ? 400 : isMD && !isLG ? 375 : 525}
        />

        <Shimmer
          height={75}
          width={isXS && !isSM ? 420 : isSM && !isMD ? 400 : isMD && !isLG ? 375 : 525}
        />

        <Shimmer
          height={75}
          width={isXS && !isSM ? 420 : isSM && !isMD ? 400 : isMD && !isLG ? 375 : 525}
        />
        <Shimmer
          height={75}
          width={isXS && !isSM ? 420 : isSM && !isMD ? 400 : isMD && !isLG ? 375 : 525}
        />
      </div>
    </div>
  );
};

export default RecipeRandomShimmer;
