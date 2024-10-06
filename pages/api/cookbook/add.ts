import { NextApiResponse, NextApiRequest } from 'next';

import conn from '../../../data/connection';
import { Cookbook } from '../../../data/models';

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  await conn();
  const cookbook = JSON.parse(req.body);
  await Cookbook.insertMany([cookbook]);
  res.json(await Cookbook.find().sort({ title: 1 }));
}
