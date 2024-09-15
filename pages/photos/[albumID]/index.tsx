import React from 'react';
import { useRouter } from 'next/router';
import mongoose from 'mongoose';
import ImageUploading, { ImageListType as PhotoListType } from 'react-images-uploading';

import conn from '../../../data/connection';
import {
  Albums as AlbumsData,
  Photos as PhotosData,
  Users as UsersData,
} from '../../../data/models';
import { Albums, PhotoReaction, Photos as PhotosType, User } from '../../../types';

import GlobalContext from '../../../context/GlobalContext';
import { GlobalReducerAction, GlobalReducerActionEnum } from '../../../context/GlobalReducer';

import PhotosLayout from '../../../layouts/PhotosLayout';

const handlePhotoUploadingChange = (
  photoListData: PhotoListType,
  dispatch: React.Dispatch<GlobalReducerAction>,
) =>
  dispatch({
    type: GlobalReducerActionEnum.SET_PHOTO_LIST,
    payload: {
      photoList: photoListData,
    },
  });

type AlbumIDIndexProps = {
  albumsData: Albums[];
  albumName: string;
  photosData: PhotosType[];
};

const AlbumIDIndex = ({ albumsData, albumName, photosData }: AlbumIDIndexProps) => {
  const router = useRouter();

  const {
    dispatch,
    state: { photoList },
  } = React.useContext(GlobalContext);

  React.useEffect(() => {
    dispatch({
      type: GlobalReducerActionEnum.SET_SELECTED_PHOTO_ALBUM,
      payload: {
        selectedPhotoAlbum: albumsData.find(album => album._id === router.query.albumID),
      },
    });
  }, [albumsData]);

  React.useEffect(() => {
    if (!!!router.query.p) {
      dispatch({
        type: GlobalReducerActionEnum.SET_IS_PHOTO_VIEWER_BACK_BTN_SHOWN,
        payload: {
          isPhotoViewerBackBtnShown: false,
        },
      });
    }
  }, [router]);

  return (
    photoList && (
      <ImageUploading
        multiple
        onChange={photoListData => handlePhotoUploadingChange(photoListData, dispatch)}
        value={photoList}
      >
        {({ onImageUpload }) => (
          <PhotosLayout
            albumsData={albumsData}
            onImageUpload={onImageUpload}
            photoAlbumLength={photosData.length}
            photosData={photosData}
            photosLayoutTitle={albumName}
          />
        )}
      </ImageUploading>
    )
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
