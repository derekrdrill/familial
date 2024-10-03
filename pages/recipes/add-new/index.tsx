import React from 'react';
import conn from '../../../data/connection';
import { Cookbook as CookbookData } from '../../../data/models';

import { RecipeDetail } from '../../../components/familial/Recipes';
import { Cookbook } from '../../../types';

type AddNewRecipeIndexProps = { cookbooks: Cookbook[] };

const AddNewRecipeIndex = ({ cookbooks }: AddNewRecipeIndexProps) => {
  return <RecipeDetail cookbooks={cookbooks} />;
};

export default AddNewRecipeIndex;

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
