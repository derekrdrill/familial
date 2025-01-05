import { NextApiResponse, NextApiRequest } from 'next';

import conn from '../../../data/connection';
import { Event } from '../../../data/models';

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  await conn();
  const events = await Event.find().populate('createdBy attendingUsers declinedUsers invitedUsers');
  res.json(events);
}
