import { NextApiResponse, NextApiRequest } from 'next';
import mongoose from 'mongoose';

import conn from '../../../data/connection';
import { Recipe } from '../../../data/models';

export default async function PUT(req: NextApiRequest, res: NextApiResponse) {
  await conn();
  const updatedRecipe = JSON.parse(req.body);
  await Recipe.replaceOne({ _id: new mongoose.Types.ObjectId(updatedRecipe._id) }, updatedRecipe);
  res.json(await Recipe.find().sort({ uploadedAt: -1 }));
}
