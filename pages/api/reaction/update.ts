import { NextApiResponse, NextApiRequest } from 'next';
import mongoose from 'mongoose';

import conn from '../../../data/connection';
import { Notification, Photos, Recipe } from '../../../data/models';
import { Reaction } from '../../../types';

export default async function PUT(req: NextApiRequest, res: NextApiResponse) {
  await conn();

  let reactionContentFormatted: Reaction[];

  const contentData = JSON.parse(req.body);
  const isRecipe = contentData.isRecipe;
  const isPhoto = contentData.isPhoto;

  const Content = isRecipe ? Recipe : Photos;

  const parent = {
    id: JSON.parse(req.body).parentId,
    name: JSON.parse(req.body).parentName,
  };
  const contentId: string = contentData.contentId;
  const reactionNew: Reaction = contentData.reaction;
  const reactionType: 'comment' | 'like' | 'love' | 'smile' = contentData.reactionType;
  const reactionTypeField: string = `${reactionType}s`;
  const reactionFromId: string = reactionNew.authorId;
  const reactionTo: string = contentData.reactionTo;
  const reactionToId: string = contentData.reactionToId;
  const reactionImageUrl: string = contentData.reactionImageUrl;

  const content = await Content.findById(contentId);
  const reactionsCurrent: Reaction[] = content[reactionTypeField] ?? [];

  const hasUserReacted = !!reactionsCurrent?.find(
    reaction => reaction.authorId === reactionNew.authorId,
  );
  const isReactionFromAuthor = reactionFromId === reactionToId;

  if (isPhoto) {
    if (reactionType === 'comment') {
      reactionContentFormatted = [...reactionsCurrent, ...[reactionNew]];
    } else {
      if (hasUserReacted) {
        reactionContentFormatted = reactionsCurrent.filter(
          reaction => reaction.authorId !== reactionNew.authorId,
        );
      } else {
        reactionContentFormatted = [...reactionsCurrent, ...[reactionNew]];
      }
    }

    await Content.updateOne(
      { _id: new mongoose.Types.ObjectId(contentId) },
      { $set: { [reactionTypeField]: reactionContentFormatted } },
    );
  } else {
    if (hasUserReacted) {
      reactionContentFormatted = reactionsCurrent?.filter(
        reaction => reaction.authorId !== reactionNew.authorId,
      );
    } else {
      reactionContentFormatted = [...reactionsCurrent, ...[reactionNew]];
    }

    await Content.updateOne(
      { _id: new mongoose.Types.ObjectId(contentId) },
      { $set: { [reactionTypeField]: reactionContentFormatted } },
    );
  }

  if (!hasUserReacted && !isReactionFromAuthor) {
    await Notification.insertMany([
      {
        contentId,
        contentImageUrl: reactionImageUrl,
        contentParentId: parent.id,
        contentParentName: parent.name,
        contentType: isPhoto ? 'photo' : 'recipe',
        from: reactionNew.authorName.split(' ')[0],
        fromAvatarUrl: reactionNew.authorAvatarUrl,
        fromId: reactionFromId,
        notification: `${reactionNew.authorName.split(' ')[0]} ${reactionType}${reactionType === 'comment' ? 'ed on' : reactionType === 'smile' ? 'd at' : 'd'} your ${isPhoto ? 'photo' : 'recipe'}`,
        notificationType: reactionType,
        seen: false,
        to: reactionTo,
        toId: reactionToId,
        uploadedAt: new Date().toLocaleDateString(),
      },
    ]);
  } else {
    await Notification.deleteOne({
      contentId,
      fromId: reactionNew.authorId,
      notificationType: reactionType,
    });
  }

  res.json(await Content.findById(contentId));
}
