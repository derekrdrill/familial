import React from 'react';
import conn from '../../../data/connection';
import { Cookbook as CookbookData } from '../../../data/models';

import { RecipeDetail } from '../../../components/familial/Recipes';
import { Cookbook } from '../../../types';
import { useRouter } from 'next/router';

type AddNewRecipeIndexProps = { cookbooks: Cookbook[] };

const RecipeIndex = ({ cookbooks }: AddNewRecipeIndexProps) => {
  const router = useRouter();
  const recipeId = router.query.recipeId as string;

  return <RecipeDetail cookbooks={cookbooks} recipeId={recipeId} />;
};

export default RecipeIndex;

export const getServerSideProps = async () => {
  try {
    await conn();
    const cookbooks = await CookbookData.find().sort({ uploadedAt: -1 });

    return {
      props: {
        cookbooks: JSON.parse(JSON.stringify(cookbooks)),
      },
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
};
