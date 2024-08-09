import React from 'react';
import RecipesLayout from '../../layouts/RecipesLayout';

import conn from '../../data/connection';
import { Cookbook } from '../../context/types';
import { Cookbook as CookbookData } from '../../data/models';
import { Recipe } from '../../context/types';
import { Recipe as RecipeData } from '../../data/models';

type RecipesIndexProps = {
  cookbook: Cookbook[];
  recipes: Recipe[];
};

const RecipesIndex = ({ cookbook, recipes }: RecipesIndexProps) => {
  console.log(cookbook);
  console.log(recipes);
  return <RecipesLayout>Recipes index!!</RecipesLayout>;
};

export default RecipesIndex;

export const getServerSideProps = async () => {
  try {
    await conn();
    const cookbook = await CookbookData.find().sort({ uploadedAt: -1 });
    const recipes = await RecipeData.find().sort({ uploadedAt: -1 });

    return {
      props: {
        cookbook: JSON.parse(JSON.stringify(cookbook)),
        recipes: JSON.parse(JSON.stringify(recipes)),
      },
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
};
