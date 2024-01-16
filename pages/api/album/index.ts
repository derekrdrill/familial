import { NextApiResponse, NextApiRequest } from 'next';

import conn from '../../../data/connection';
import { Albums } from '../../../data/models';

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  await conn();
  await Albums.insertMany([{ albumName: req.body }]);
  res.json(await Albums.find());
}
