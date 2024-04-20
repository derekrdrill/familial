import { NextApiResponse, NextApiRequest } from 'next';
import { del } from '@vercel/blob';

import conn from '../../../data/connection';
import { Albums, Photos } from '../../../data/models';

export default async function DELETE(req: NextApiRequest, res: NextApiResponse) {
  await conn();

  const photosToDelete = await Photos.find({ albumName: req.body });
  photosToDelete.forEach(async photo => {
    await del(photo.url);
  });

  await Photos.deleteMany({ albumName: req.body });
  await Albums.deleteOne({ albumName: req.body });

  res.json(await Albums.find().sort({ albumName: 1 }));
}
