import React from 'react';
import RecipesLayout from '../../layouts/RecipesLayout';

import conn from '../../data/connection';
import { Cookbook } from '../../types';
import { Cookbook as CookbookData } from '../../data/models';
import { Recipe } from '../../types';
import { Recipe as RecipeData } from '../../data/models';

type RecipesIndexProps = {
  cookbook: Cookbook[];
  recipeRandom: Recipe;
  recipes: Recipe[];
};

export default function RecipesIndex({ cookbook, recipeRandom, recipes }: RecipesIndexProps) {
  return <RecipesLayout children={undefined} recipeRandom={recipeRandom} recipes={recipes} />;
}

export const getServerSideProps = async () => {
  try {
    await conn();
    const cookbook = await CookbookData.find().sort({ uploadedAt: -1 });
    const recipes = await RecipeData.find().sort({ uploadedAt: -1 });
    const recipeRandom = await RecipeData.aggregate([
      { $match: { imageUrl: { $exists: true } } },
      { $sample: { size: 1 } },
    ]);

    return {
      props: {
        cookbook: JSON.parse(JSON.stringify(cookbook)),
        recipeRandom: JSON.parse(JSON.stringify(recipeRandom[0])),
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
