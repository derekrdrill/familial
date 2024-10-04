import * as React from 'react';
import Home from '../components/familial/Home';
import { Photos, PhotoReaction, Recipe, User } from '../types';

import conn from '../data/connection';
import { Photos as PhotosData, Recipe as RecipeData, Users } from '../data/models';

type IndexProps = {
  photosAllRandomized: Photos[];
  photosQuick: Photos[];
  recipesQuick: Recipe[];
};

const Index = ({ photosAllRandomized, photosQuick, recipesQuick }: IndexProps) => {
  return (
    <Home
      photosAllRandomized={photosAllRandomized}
      photosQuick={photosQuick}
      recipesQuick={recipesQuick}
    />
  );
};

export default Index;

export const getServerSideProps = async () => {
  try {
    await conn();

    const photosAllRandomized = await PhotosData.aggregate([{ $sample: { size: 100000 } }]);
    const photosQuick: Photos[] = await PhotosData.aggregate([
      { $sort: { uploadedAt: -1 } },
      { $limit: 10 },
    ]);
    const recipesQuick: Recipe[] = await RecipeData.aggregate([
      { $sort: { uploadedAt: -1 } },
      { $limit: 10 },
    ]);
    const users: User[] = await Users.find();

    const photosQuickWithReactionUpdates = photosQuick.map(photo => {
      const getAvatarUrl = ({ reactions }: { reactions?: PhotoReaction[] }) =>
        reactions
          ?.map(reaction => ({
            ...reaction,
            ...{
              authorAvatarUrl: users.find(user => user.userID === reaction.authorId)?.avatarURL,
            },
          }))
          .sort((a, b) => (a.authorName > b.authorName ? 1 : a.authorName < b.authorName ? -1 : 0));

      return {
        ...photo,
        ...{
          likes: getAvatarUrl({ reactions: photo.likes }),
          loves: getAvatarUrl({ reactions: photo.loves }),
          smiles: getAvatarUrl({ reactions: photo.smiles }),
        },
      };
    });

    return {
      props: {
        photosAllRandomized: JSON.parse(JSON.stringify(photosAllRandomized)),
        photosQuick: JSON.parse(JSON.stringify(photosQuickWithReactionUpdates)),
        recipesQuick: JSON.parse(JSON.stringify(recipesQuick)),
      },
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
};

