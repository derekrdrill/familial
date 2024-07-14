import * as React from 'react';
import { GridProps } from '@mui/material';
import { BodyRoot, BodyChildrenContainer } from './style';

import conn from '../../../data/connection';
import { Albums } from '../../../data/models';

const Body = ({ children }: GridProps) => {
  return (
    <BodyRoot tw='flex justify-center'>
      <BodyChildrenContainer container>{children}</BodyChildrenContainer>;
    </BodyRoot>
  );
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
