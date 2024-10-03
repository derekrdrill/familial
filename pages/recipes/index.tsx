import React from 'react';
import RecipesLayout from '../../layouts/RecipesLayout';

import conn from '../../data/connection';
import { Cookbook } from '../../types';
import {
  Cookbook as CookbookData,
  Recipe as RecipeData,
  Users as UserData,
} from '../../data/models';
import { Recipe } from '../../types';

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

    const user = await UserData.aggregate([{ $match: { userID: recipeRandom[0].authorId } }]);
    const userImageUrl = user[0].avatarURL;

    const recipeWithAuthorImage = {
      ...recipeRandom[0],
      ...{ authorImageUrl: userImageUrl },
    };

    return {
      props: {
        cookbook: JSON.parse(JSON.stringify(cookbook)),
        recipeRandom: JSON.parse(JSON.stringify(recipeWithAuthorImage)),
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
