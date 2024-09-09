import { NextApiResponse, NextApiRequest } from 'next';
import mongoose from 'mongoose';

import conn from '../../../data/connection';
import { Photos } from '../../../data/models';

export default async function PUT(req: NextApiRequest, res: NextApiResponse) {
  await conn();

  const newPhotoTitle = JSON.parse(req.body).newPhotoTitle;
  const photoId = JSON.parse(req.body).photoId;

  await Photos.updateOne(
    { _id: new mongoose.Types.ObjectId(photoId) },
    { $set: { title: newPhotoTitle } },
  );

  res.json(await Photos.find().sort({ uploadedAt: -1 }));
}
