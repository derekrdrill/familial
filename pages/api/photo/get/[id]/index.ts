import { NextApiResponse, NextApiRequest } from 'next';

import conn from '../../../../../data/connection';
import { Photos } from '../../../../../data/models';

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  await conn();
  const authorId = req.query.id;
  const photosById = await Photos.find({ authorId });

  res.json(photosById);
}
