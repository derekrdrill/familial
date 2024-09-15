import { NextApiResponse, NextApiRequest } from 'next';

import conn from '../../../data/connection';
import { Users } from '../../../data/models';

export default async function PUT(req: NextApiRequest, res: NextApiResponse) {
  await conn();
  const user = await JSON.parse(req.body).user;
  await Users.updateOne({ _id: user._id }, { $set: { avatarURL: user.avatarURL } });
  const updatedUser = await Users.findOne({ userID: user.userID });

  res.json(updatedUser);
}
