import * as React from 'react';
import Home from '../components/familial/Home';
import { Photos } from '../context/types';

import conn from '../data/connection';
import { Photos as PhotosData } from '../data/models';

type IndexProps = {
  photosAllRandomized: Photos[];
  photosQuick: Photos[];
};

const Index = ({ photosAllRandomized, photosQuick }: IndexProps) => {
  return (
    <Home photosAllRandomized={photosAllRandomized} photosQuick={photosQuick} />
  );
};

export default Index;

export const getServerSideProps = async () => {
  try {
    await conn();

    const photosAllRandomized = await PhotosData.aggregate([
      { $sample: { size: 100000 } },
    ]);

    const photosQuick = await PhotosData.aggregate([
      { $sort: { uploadedAt: -1 } },
      { $limit: 10 },
    ]);

    return {
      props: {
        photosAllRandomized: JSON.parse(JSON.stringify(photosAllRandomized)),
        photosQuick: JSON.parse(JSON.stringify(photosQuick)),
      },
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
};

