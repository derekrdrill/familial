import styled from 'styled-components';
import { Grid } from '@mui/material';
import tw from 'twin.macro';

export const BodyRoot = styled(Grid)(() => [tw`flex`, tw`justify-center`]);

export const BodyChildrenContainer = styled(Grid)(() => [
  tw`absolute`,
  tw`top-28`,
  tw`z-0`,
  tw`max-w-screen-2xl`,
  tw`lg:top-16`,
]);
