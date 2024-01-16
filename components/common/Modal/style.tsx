import styled from 'styled-components';
import { Button, Grid } from '@mui/material';

export const ModalRootContainer = styled(Grid)({
  position: 'absolute',
  top: 200,
  height: 1000,
});

export const ModalContainer = styled(Grid)({
  backgroundColor: '#FFFFFF !important',
  borderRadius: 7,
  padding: '20px 42px 30px 42px',
});
4;
export const ModalRow = styled(Grid)<{ isBottom?: boolean; isBody?: boolean }>(
  ({ isBottom, isBody }) => ({
    margin: !isBottom ? '10px 0' : 0,
    padding: isBody ? '20px 0' : '5px 0',
  }),
);

export const ModalButton = styled(Button)<{ color?: string }>(({ color }) => ({
  borderRadius: '30px !important',
  height: 50,
  width: 100,
}));
