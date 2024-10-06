import { NextApiResponse, NextApiRequest } from 'next';

import conn from '../../../../../data/connection';
import { Notification } from '../../../../../data/models';

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  await conn();
  const toId = req.query.id;
  const notificationsById = await Notification.find({ seen: false, toId });

  res.json(notificationsById);
}
