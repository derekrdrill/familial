import { NextApiResponse, NextApiRequest } from 'next';
import conn from '../../../../data/connection';
import { Photos as PhotosData, Recipe as RecipesData } from '../../../../data/models';

import { Photos, Recipe } from '../../../../types';

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  await conn();

  const authorId = req.query.id;
  const filterType = req.query.filterType;
  const hasAuthorId = !!authorId;
  const hasFilterType = !!filterType;
  const quickSectionType = req.query.quickSectionType;

  if (hasAuthorId) {
    const photosById = await PhotosData.find({ authorId });
    res.json(photosById);
  } else if (hasFilterType) {
    if (filterType === 'recentlyAdded') {
      const contentData = quickSectionType === 'photos' ? PhotosData : RecipesData;
      const contentQuick: (Photos | Recipe)[] = await contentData.aggregate([
        { $sort: { uploadedAt: -1 } },
        { $limit: 10 },
      ]);

      res.json(contentQuick);
    } else if (filterType === 'mostPopular') {
      const photosQuick: Photos[] = await PhotosData.find();
      const recipesQuick: Recipe[] = await RecipesData.find();
      const contentQuick: Photos[] | Recipe[] =
        quickSectionType === 'photos' ? photosQuick : recipesQuick;

      const contentQuickSorted = contentQuick
        .sort((a, b) => {
          const aCommentsLength = a.comments?.length ?? 0;
          const aLikesLength = a.likes?.length ?? 0;
          const aLovesLength = a.loves?.length ?? 0;
          const aSmilesLength = a.smiles?.length ?? 0;
          const bCommentsLength = b.comments?.length ?? 0;
          const bLikesLength = b.likes?.length ?? 0;
          const bLovesLength = b.loves?.length ?? 0;
          const bSmilesLength = b.smiles?.length ?? 0;
          const aTotalReactons = aCommentsLength + aLikesLength + aLovesLength + aSmilesLength;
          const bTotalReactons = bCommentsLength + bLikesLength + bLovesLength + bSmilesLength;

          const totalsSortIndex =
            aTotalReactons > bTotalReactons ? -1 : bTotalReactons > aTotalReactons ? 1 : 0;

          return totalsSortIndex;
        })
        .filter((_, photoKey) => photoKey < 10);

      res.json(contentQuickSorted);
    }
  }
}
