import { NextApiResponse, NextApiRequest } from 'next';

import conn from '../../../data/connection';
import { Event } from '../../../data/models';
import mongoose from 'mongoose';

export default async function PUT(req: NextApiRequest, res: NextApiResponse) {
  await conn();

  const event = JSON.parse(req.body);
  await Event.replaceOne({ _id: new mongoose.Types.ObjectId(event._id) }, event);
  const updatedEvent = await Event.findById(event._id).populate(
    'createdBy invitedUsers attendingUsers declinedUsers',
  );

  res.json(updatedEvent);
}
