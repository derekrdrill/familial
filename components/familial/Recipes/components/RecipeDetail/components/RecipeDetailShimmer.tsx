import React from 'react';
import tw from 'twin.macro';
import { Shimmer } from 'react-shimmer';

const RecipeDetailShimmer = () => {
  return (
    <div tw='col-span-full'>
      <div tw='flex justify-between mb-8'>
        <Shimmer height={32} width={200} />
        <Shimmer height={32} width={100} />
      </div>
      <div tw='flex justify-center mb-8 w-full'>
        <Shimmer height={40} width={400} />
      </div>
      <div tw='flex justify-center mb-8 w-1/2'>
        <div tw='flex flex-col gap-2'>
          <Shimmer height={16} width={140} />
          <Shimmer height={12} width={120} />
          <Shimmer height={12} width={120} />
          <Shimmer height={12} width={120} />
        </div>
      </div>
      <div tw='flex justify-center mb-8 w-full'>
        <Shimmer height={460} width={460} />
      </div>
    </div>
  );
};

export default RecipeDetailShimmer;
