import React from 'react';
import { useRouter } from 'next/router';
import mongoose from 'mongoose';
import ImageUploading, { ImageListType as PhotoListType } from 'react-images-uploading';

import conn from '../../../data/connection';
import { Albums as AlbumsData, Photos as PhotosData } from '../../../data/models';
import { Albums, Photos as PhotosType } from '../../../types';

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

    const photos = await PhotosData.find({
      albumName: album.albumName,
    }).sort({ uploadedAt: -1 });

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
        photosData: JSON.parse(JSON.stringify(photos)),
      },
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
};
