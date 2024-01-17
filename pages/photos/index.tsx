import React from 'react';
import { InferGetServerSidePropsType } from 'next';

import GlobalContext from '../../context/GlobalContext';
import { GlobalReducerActionEnum } from '../../context/GlobalReducer';
import Photos from '../../components/drill-y/Photos';

import conn from '../../data/connection';
import { Albums as AlbumsData, Photos as PhotosData } from '../../data/models';

const PhotosIndex = ({
  albumsData,
  photosData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const {
    state: { albums, photos },
    dispatch,
  } = React.useContext(GlobalContext);

  React.useEffect(() => {
    if (!albums) {
      dispatch({ type: GlobalReducerActionEnum.SET_ALBUMS, payload: { albums: albumsData } });
    }

    if (!photos) {
      dispatch({ type: GlobalReducerActionEnum.SET_PHOTOS, payload: { photos: photosData } });
    }
  }, []);

  return <Photos />;
};

export default PhotosIndex;

export const getServerSideProps = async () => {
  try {
    await conn();
    const albums = await AlbumsData.find();
    const photos = await PhotosData.find();

    return {
      props: {
        albumsData: JSON.parse(JSON.stringify(albums)),
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
