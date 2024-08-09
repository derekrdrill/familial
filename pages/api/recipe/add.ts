import { NextApiResponse, NextApiRequest } from 'next';

import conn from '../../../data/connection';
import { Recipe } from '../../../data/models';

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  await conn();

  const { author, cookbook, ingredients, steps, temperature, time, title } =
    req.body;

  await Recipe.insertMany([
    {
      author: author,
      cookbook: cookbook,
      ingredients: ingredients,
      steps: steps,
      temperature: temperature,
      time: time,
      title: title,
    },
  ]);
  res.json(await Recipe.find().sort({ title: 1 }));
}
