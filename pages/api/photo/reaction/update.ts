import { NextApiResponse, NextApiRequest } from 'next';
import mongoose from 'mongoose';

import conn from '../../../../data/connection';
import { Photos } from '../../../../data/models';
import { PhotoReaction } from '../../../../types';

export default async function PUT(req: NextApiRequest, res: NextApiResponse) {
  await conn();

  let photoReactionDataNew: PhotoReaction[];
  const photoID: string = JSON.parse(req.body).photoID;
  const photoReactionNew: PhotoReaction = JSON.parse(req.body).photoReaction;
  const photoReactionType: 'comment' | 'like' | 'love' | 'smile' = JSON.parse(
    req.body,
  ).photoReactionType;
  const photoReactionTypeField: string = `${photoReactionType}s`;

  const photo = await Photos.findById(photoID);
  const photoReactionsCurrent: PhotoReaction[] = photo[photoReactionTypeField];

  const hasUserReacted = !!photoReactionsCurrent.find(
    photoReaction => photoReaction.authorId === photoReactionNew.authorId,
  );

  if (photoReactionType === 'comment') {
    photoReactionDataNew = [...photoReactionsCurrent, ...[photoReactionNew]];
  } else {
    if (hasUserReacted) {
      photoReactionDataNew = photoReactionsCurrent.filter(
        photoReaction => photoReaction.authorId !== photoReactionNew.authorId,
      );
    } else {
      photoReactionDataNew = [...photoReactionsCurrent, ...[photoReactionNew]];
    }
  }


  await Photos.updateOne(
    { _id: new mongoose.Types.ObjectId(photoID) },
    { $set: { [photoReactionTypeField]: photoReactionDataNew } },
  );

  res.json(await Photos.findById(photoID));
}
