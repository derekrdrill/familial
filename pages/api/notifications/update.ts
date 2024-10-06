import { NextApiResponse, NextApiRequest } from 'next';

import conn from '../../../data/connection';
import { Notification } from '../../../data/models';

export default async function PUT(req: NextApiRequest, res: NextApiResponse) {
  await conn();

  const _id = JSON.parse(req.body)._id;
  const toId = JSON.parse(req.body).toId;
  await Notification.updateOne({ _id }, { $set: { seen: true } });

  const notificationsById = await Notification.find({ seen: false, toId });
  res.json(notificationsById);
}
