import styled from 'styled-components';
import tw from 'twin.macro';
import { Button, Grid } from '@mui/material';

export const ModalRootContainer = styled(Grid)({
  position: 'absolute',
  top: 200,
  height: 1000,
});

export const ModalContainer = styled(Grid)<{ $isDarkMode?: boolean }>(
  ({ $isDarkMode }) => [
    tw`rounded-3xl`,
    tw`bg-amber-50`,
    tw`pb-4`,
    tw`p-8`,
    $isDarkMode && tw`bg-gray-700`,
    $isDarkMode && tw`text-gray-50`,
    !$isDarkMode && tw`bg-gray-50`,
  ],
);

export const ModalRow = styled(Grid)<{ isBottom?: boolean; isBody?: boolean }>(
  ({ isBottom, isBody }) => ({
    margin: !isBottom ? '10px 0' : 0,
    padding: isBody ? '20px 0' : '5px 0',
  }),
);

export const ModalButton = styled(Button)<{ color?: string }>(({ color }) => ({
  borderRadius: '25px !important',
  height: 50,
  width: 100,
}));
