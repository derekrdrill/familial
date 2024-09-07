import React from 'react';

import GlobalContext from '../../context/GlobalContext';

import PhotosLayout from '../../layouts/PhotosLayout';

import conn from '../../data/connection';
import { Albums as AlbumsData, Photos as PhotosData } from '../../data/models';
import { Albums, Photos } from '../../types';
import { GlobalReducerActionEnum } from '../../context/GlobalReducer';

type PhotosIndexProps = {
  albumsData: Albums[];
  photosData: Photos[];
};

const PhotosIndex = ({ albumsData, photosData }: PhotosIndexProps) => {
  const { dispatch } = React.useContext(GlobalContext);

  React.useEffect(() => {
    dispatch({
      type: GlobalReducerActionEnum.SET_SELECTED_PHOTO_ALBUM,
      payload: { selectedPhotoAlbum: undefined },
    });
  }, []);

  return (
    <PhotosLayout
      albumsData={albumsData}
      photosData={photosData}
      photosLayoutTitle='Photo albums'
    />
  );
};

export default PhotosIndex;

export const getServerSideProps = async () => {
  try {
    await conn();
    const albums = await AlbumsData.find().sort({ albumName: 1 });
    const photos = await PhotosData.find().sort({ uploadedAt: -1 });

    const albumsMapped = albums.map(album => ({
      _id: album._id.toString(),
      albumName: album.albumName,
      authorId: album.authorId,
      photos: photos.filter(photo => photo.albumName === album.albumName),
    }));

    return {
      props: {
        albumsData: JSON.parse(JSON.stringify(albumsMapped)),
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
