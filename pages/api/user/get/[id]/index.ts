import { NextApiResponse, NextApiRequest } from 'next';

import conn from '../../../../../data/connection';
import { Users } from '../../../../../data/models';

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  await conn();
  const user = await Users.find({ userID: req.query.id });

  if (!!!user.length) {
    await Users.create(req.query).then(result => {
      res.json(result);
    });
  } else {
    res.json(user[0]);
  }
}
