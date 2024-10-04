import { NextApiResponse, NextApiRequest } from 'next';

import conn from '../../../data/connection';
import { Recipe } from '../../../data/models';

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  await conn();

  const {
    author,
    authorId,
    cookbook,
    imageUrl,
    ingredients,
    steps,
    temperature,
    time,
    title,
    type,
  } = JSON.parse(req.body);

  await Recipe.insertMany([
    {
      author,
      authorId,
      cookbook,
      imageUrl,
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
