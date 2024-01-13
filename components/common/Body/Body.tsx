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
    console.log('CONNECTING TO MONGO');
    await conn();
    console.log('CONNECTED TO MONGO');

    console.log('FETCHING DOCUMENTS');
    const albums = await Albums.find();
    console.log('FETCHED DOCUMENTS');

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
