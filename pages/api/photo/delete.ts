import mongoose from 'mongoose';
import { NextApiResponse, NextApiRequest } from 'next';

import conn from '../../../data/connection';
import { Photos } from '../../../data/models';

export default async function DELETE(req: NextApiRequest, res: NextApiResponse) {
  await conn();
  await Photos.deleteOne({ _id: new mongoose.Types.ObjectId(JSON.parse(req.body)._id) });
  res.json(await Photos.find().sort({ uploadedAt: -1 }));
}
