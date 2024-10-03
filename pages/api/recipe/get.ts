import { NextApiResponse, NextApiRequest } from 'next';

import conn from '../../../data/connection';
import { Recipe } from '../../../data/models';

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  await conn();

  const isRandom = Boolean(req.query.isRandom);
  const recipeId = req.query.recipeId;
  const hasRecipeId = !!recipeId;

  if (isRandom) {
    const recipeRandom = await Recipe.aggregate([
      { $match: { imageUrl: { $exists: true } } },
      { $sample: { size: 1 } },
    ]);
    res.json(recipeRandom);
  }

  if (hasRecipeId) {
    const recipe = await Recipe.findById(recipeId);
    res.json(recipe);
  }
  res.json([]);
}
