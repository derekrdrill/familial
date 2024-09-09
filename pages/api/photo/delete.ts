import mongoose from 'mongoose';
import { NextApiResponse, NextApiRequest } from 'next';

import conn from '../../../data/connection';
import { Albums, Photos } from '../../../data/models';

export default async function DELETE(req: NextApiRequest, res: NextApiResponse) {
  await conn();

  const albumName = JSON.parse(req.body).albumName;
  const photoId = JSON.parse(req.body).photoId;

  const currentAlbum = await Albums.findOne({ albumName });
  const currentPhoto = await Photos.findOne({ _id: photoId });

  if (currentAlbum.albumCoverURL === currentPhoto.url) {
    await Albums.updateOne(
      { _id: new mongoose.Types.ObjectId(currentAlbum._id) },
      { $set: { albumCoverURL: null } },
    );
  }

  await Photos.deleteOne({ _id: new mongoose.Types.ObjectId(photoId) });
  res.json(await Photos.find({ albumName }).sort({ uploadedAt: -1 }));
}
