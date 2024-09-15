import React from 'react';
import mongoose from 'mongoose';

import conn from '../../../data/connection';
import {
  Albums as AlbumsData,
  Photos as PhotosData,
  Users as UsersData,
} from '../../../data/models';

import PhotosLayout from '../../../layouts/PhotosLayout';
import { Albums, PhotoReaction, Photos as PhotosType, User } from '../../../types';

type AlbumIDIndexProps = {
  albumsData: Albums[];
  albumName: string;
  photosData: PhotosType[];
};

const AlbumIDIndex = ({ albumsData, albumName, photosData }: AlbumIDIndexProps) => {
  return (
    <PhotosLayout
      albumsData={albumsData}
      photoAlbumLength={photosData.length}
      photosData={photosData}
      photosLayoutTitle={albumName}
    />
  );
};

export default AlbumIDIndex;

export const getServerSideProps = async context => {
  try {
    await conn();

    const album = await AlbumsData.findOne({
      _id: new mongoose.Types.ObjectId(context.params.albumID),
    });

    const albums = await AlbumsData.find().sort({ albumName: 1 });

    const photos: PhotosType[] = await PhotosData.aggregate([
      { $limit: 100000 },
      { $match: { albumName: album.albumName } },
      { $sort: { uploadedAt: -1 } },
    ]);

    const users: User[] = await UsersData.find();

    const photosWithReactionUpdates = photos.map(photo => {
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
          comments: getAvatarUrl({ reactions: photo.comments }),
        },
      };
    });

    const albumsMapped = albums.map(album => ({
      _id: album._id.toString(),
      albumName: album.albumName,
    }));

    const redirect = {
      redirect: !!!photos.length && {
        permanent: false,
        destination: '/photos',
      },
    };

    return {
      ...redirect,
      props: {
        albumsData: JSON.parse(JSON.stringify(albumsMapped)),
        albumName: album.albumName,
        photosData: JSON.parse(JSON.stringify(photosWithReactionUpdates)),
      },
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
};
