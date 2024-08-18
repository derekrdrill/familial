import { NextApiResponse, NextApiRequest } from 'next';

import conn from '../../../data/connection';
import { Recipe } from '../../../data/models';

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  await conn();

  const {
    author,
    cookbook,
    ingredients,
    steps,
    temperature,
    time,
    title,
    type,
  } = req.body;

  await Recipe.insertMany([
    {
      author,
      cookbook,
      ingredients,
      steps,
      temperature,
      time,
      title,
      type,
      uploadedAt: new Date(),
    },
  ]);
  res.json(await Recipe.find().sort({ title: 1 }));
}
