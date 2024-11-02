import * as React from 'react';

import conn from '../../../data/connection';
import { Photos as PhotosData } from '../../../data/models';

import PhotosSlideshow from '../../../components/familial/Photos/components/PhotosSlideshow';

type Props = {
  photosAllRandomized: any;
};

const PhotosSlideshowIndex = ({ photosAllRandomized }: Props) => {
  return <PhotosSlideshow photoSlideshowPhotos={photosAllRandomized} />;
};

export default PhotosSlideshowIndex;

export const getServerSideProps = async () => {
  try {
    await conn();

    const photosAllRandomized = await PhotosData.aggregate([{ $sample: { size: 100000 } }]);

    return {
      props: {
        photosAllRandomized: JSON.parse(JSON.stringify(photosAllRandomized)),
      },
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
};
