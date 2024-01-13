import React from 'react';
import { InferGetServerSidePropsType } from 'next';

import GlobalContext from '../../context/GlobalContext';
import { GlobalReducerActionEnum } from '../../context/GlobalReducer';
import PhotoUploader from '../../components/common/PhotoUploader';

import conn from '../../data/connection';
import { Albums } from '../../data/models';

const PhotoUploaderIndex = ({
  albumsData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const {
    state: { albums },
    dispatch,
  } = React.useContext(GlobalContext);

  React.useEffect(() => {
    if (!albums) {
      dispatch({ type: GlobalReducerActionEnum.SET_ALBUMS, payload: { albums: albumsData } });
    }
  }, []);

  return <PhotoUploader />;
};

export default PhotoUploaderIndex;

export const getServerSideProps = async () => {
  try {
    await conn();
    const albums = await Albums.find();

    return {
      props: {
        albumsData: JSON.parse(JSON.stringify(albums)),
      },
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
};
