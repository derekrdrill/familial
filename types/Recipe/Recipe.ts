import { Reaction } from '../../types';

export type RecipeIngredient = {
  ingredient: string;
  ingredientMeasurement: string;
  ingredientQuantity: string;
};

export type RecipeStep = {
  step: string;
};

export type RecipeIngredientOrStep = RecipeIngredient | RecipeStep;

export type Recipe = {
  _id?: string;
  author?: string;
  authorId?: string;
  authorImageUrl?: string;
  cookbook: string;
  imageUrl?: string;
  ingredients: RecipeIngredient[];
  likes?: Reaction[];
  loves?: Reaction[];
  steps: RecipeStep[];
  temperature?: string;
  time?: string;
  title: string;
  type?: string;
  uploadedAt?: Date;
};
