import mongoose from 'mongoose';
import { NextApiResponse, NextApiRequest } from 'next';

import conn from '../../../data/connection';
import { Photos } from '../../../data/models';

export default async function DELETE(req: NextApiRequest, res: NextApiResponse) {
  await conn();
  const photoId = req.body.photoId;
  await Photos.deleteOne({ _id: new mongoose.Types.ObjectId(photoId) });
  res.json(
    await Photos.find({ albumName: JSON.parse(req.body).albumName }).sort({ uploadedAt: -1 }),
  );
}
