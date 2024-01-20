import * as React from 'react';
import { GridProps } from '@mui/material';
import { BodyRoot } from './style';

import conn from '../../../data/connection';
import { Albums } from '../../../data/models';

const Body = ({ children }: GridProps) => {
  return <BodyRoot container>{children}</BodyRoot>;
};

export default Body;

export const getServerSideProps = async () => {
  try {
    await conn();
    const albums = await Albums.find().sort({ albumName: 1 });

    return {
      props: {
        albums: JSON.parse(JSON.stringify(albums)),
      },
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
};
