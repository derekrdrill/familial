import { NextApiResponse, NextApiRequest } from 'next';
import mongoose from 'mongoose';

import conn from '../../../../data/connection';
import { Notification, Photos } from '../../../../data/models';
import { Reaction } from '../../../../types';

export default async function PUT(req: NextApiRequest, res: NextApiResponse) {
  await conn();

  let photoReactionDataNew: Reaction[];

  const photoAlbum = {
    id: JSON.parse(req.body).photoAlbumId,
    name: JSON.parse(req.body).photoAlbumName,
  };
  const photoID: string = JSON.parse(req.body).photoID;
  const photoReactionNew: Reaction = JSON.parse(req.body).photoReaction;
  const photoReactionType: 'comment' | 'like' | 'love' | 'smile' = JSON.parse(
    req.body,
  ).photoReactionType;
  const photoReactionFromId: string = photoReactionNew.authorId;
  const photoReactionTo: string = JSON.parse(req.body).photoReactionTo;
  const photoReactionToId: string = JSON.parse(req.body).photoReactionToId;
  const photoReactionImageUrl: string = JSON.parse(req.body).photoReactionImageUrl;
  const photoReactionTypeField: string = `${photoReactionType}s`;

  const photo = await Photos.findById(photoID);
  const photoReactionsCurrent: Reaction[] = photo[photoReactionTypeField];

  const hasUserReacted = !!photoReactionsCurrent.find(
    photoReaction => photoReaction.authorId === photoReactionNew.authorId,
  );
  const isReactionFromAuthor = photoReactionFromId === photoReactionToId;

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

  if (!hasUserReacted && !isReactionFromAuthor) {
    await Notification.insertMany([
      {
        contentId: photoID,
        contentImageUrl: photoReactionImageUrl,
        contentParentId: photoAlbum.id,
        contentParentName: photoAlbum.name,
        contentType: 'photo',
        from: photoReactionNew.authorName.split(' ')[0],
        fromAvatarUrl: photoReactionNew.authorAvatarUrl,
        fromId: photoReactionFromId,
        notification: `${photoReactionNew.authorName.split(' ')[0]} ${photoReactionType}${photoReactionType === 'comment' ? 'ed on' : photoReactionType === 'smile' ? 'd at' : 'd'} your image`,
        notificationType: photoReactionType,
        seen: false,
        to: photoReactionTo,
        toId: photoReactionToId,
        uploadedAt: new Date().toLocaleDateString(),
      },
    ]);
  } else {
    await Notification.deleteOne({
      contentId: photoID,
      fromId: photoReactionNew.authorId,
      notificationType: photoReactionType,
    });
  }

  res.json(await Photos.findById(photoID));
}
