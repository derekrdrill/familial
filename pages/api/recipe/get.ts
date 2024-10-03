import { NextApiResponse, NextApiRequest } from 'next';

import conn from '../../../data/connection';
import { Recipe, Users } from '../../../data/models';

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  await conn();

  const isRandom = Boolean(req.query.isRandom);
  const recipeId = req.query.recipeId;
  const searchValue = String(req.query.searchValue);
  const hasRecipeId = !!recipeId;
  const hasSearchValue = !!searchValue;

  if (isRandom) {
    const recipeRandom = await Recipe.aggregate([
      { $match: { imageUrl: { $exists: true } } },
      { $sample: { size: 1 } },
    ]);
    res.json(recipeRandom);
  }

  if (hasRecipeId) {
    const recipe = await Recipe.findById(recipeId);
    const user = await Users.aggregate([{ $match: { userID: recipe.authorId } }]);
    const userImageUrl = user[0].avatarURL;

    const recipeWithAuthorImage = {
      ...recipe._doc,
      ...{ authorImageUrl: userImageUrl },
    };

    res.json(recipeWithAuthorImage);
  }

  if (hasSearchValue) {
    const searchValuedLowerCase = searchValue.toLowerCase();
    const recipes = await Recipe.find();
    const recipesFiltered = recipes.filter(
      recipe =>
        recipe.author.toLowerCase().includes(searchValuedLowerCase) ||
        recipe.cookbook.toLowerCase().includes(searchValuedLowerCase) ||
        recipe.title.toLowerCase().includes(searchValuedLowerCase) ||
        recipe.type.toLowerCase().includes(searchValuedLowerCase) ||
        recipe.ingredients
          .map(recipeIngredient => recipeIngredient.ingredient.toLowerCase())
          .join()
          .includes(searchValuedLowerCase) ||
        recipe.steps
          .map(recipeStep => recipeStep.step.toLowerCase())
          .join()
          .includes(searchValuedLowerCase),
    );

    res.json(recipesFiltered);
  }
  res.json([]);
}
