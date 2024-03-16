import * as React from 'react';

import { GridProps } from '@mui/material';

import { BodyRoot } from './style';

const Body = ({ children }: GridProps) => (
  <BodyRoot container sx={{ left: 0, position: 'relative', top: { xs: 175, lg: 120 } }}>
    {children}
  </BodyRoot>
);

export default Body;
