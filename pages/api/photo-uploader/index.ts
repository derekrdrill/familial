import { NextApiResponse, NextApiRequest } from 'next';

import conn from '../../../data/connection';
import { Photos } from '../../../data/models';

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  await conn();
  Photos.insertMany([JSON.parse(req.body)]);
  res.json({});
}
