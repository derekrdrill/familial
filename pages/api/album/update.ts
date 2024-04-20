import { NextApiResponse, NextApiRequest } from 'next';

import conn from '../../../data/connection';
import { Albums, Photos } from '../../../data/models';

export default async function PUT(req: NextApiRequest, res: NextApiResponse) {
  await conn();

  const currentAlbumName = JSON.parse(req.body).currentAlbumName;
  const newAlbumName = JSON.parse(req.body).newAlbumName;

  await Albums.updateOne({ albumName: currentAlbumName }, { $set: { albumName: newAlbumName } });
  await Photos.updateMany({ albumName: currentAlbumName }, { $set: { albumName: newAlbumName } });

  res.json(await Albums.find().sort({ albumName: 1 }));
}
