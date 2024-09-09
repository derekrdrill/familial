import { NextApiResponse, NextApiRequest } from 'next';

import conn from '../../../data/connection';
import { Albums, Photos } from '../../../data/models';

export default async function PUT(req: NextApiRequest, res: NextApiResponse) {
  await conn();

  const editingAlbumId = JSON.parse(req.body).editingAlbumId;
  const newAlbumName = JSON.parse(req.body).newAlbumName;
  const newAlbumCoverURL = JSON.parse(req.body).newAlbumCoverURL;

  if (newAlbumName) {
    await Albums.updateOne({ _id: editingAlbumId }, { $set: { albumName: newAlbumName } });
    await Photos.updateMany({ albumID: editingAlbumId }, { $set: { albumName: newAlbumName } });
  } else if (newAlbumCoverURL) {
    await Albums.updateOne({ _id: editingAlbumId }, { $set: { albumCoverURL: newAlbumCoverURL } });
  }

  res.json(await Albums.find().sort({ albumName: 1 }));
}
