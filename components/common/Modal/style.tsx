import styled from 'styled-components';
import { Grid } from '@mui/material';

export const ModalRootContainer = styled(Grid)({
  position: 'absolute',
  top: 200,
});

export const ModalContainer = styled(Grid)({
  backgroundColor: '#FFFFFF !important',
  borderRadius: 7,
  padding: '10px 20px',
});

export const ModalRow = styled(Grid)<{ isBottom?: boolean; isBody?: boolean }>(
  ({ isBottom, isBody }) => ({
    borderBottom: !isBottom ? '1px gainsboro solid' : 'none',
    margin: !isBottom ? '10px 0' : 0,
    padding: isBody ? '20px 0' : '5px 0',
  }),
);
