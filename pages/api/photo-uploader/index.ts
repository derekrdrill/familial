import { NextApiResponse, NextApiRequest } from 'next';

import conn from '../../../data/connection';
import { Albums, Photos } from '../../../data/models';

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  await conn();

  const albumData = JSON.parse(req.body);

  const album = await Albums.findOne({ albumName: albumData.albumName });
  const albumDataToInsert = {
    ...albumData,
    ...{
      albumID: album._id.toString(),
    },
  };

  Photos.insertMany([albumDataToInsert]);
  res.json({});
}
