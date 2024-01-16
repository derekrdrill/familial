import styled from 'styled-components';
import { AppBar, Grid, IconButton, TextField } from '@mui/material';
import Link from 'next/link';

export const HeaderRoot = styled(AppBar)({
  backgroundColor: 'white !important',
  borderBottom: '1px solid #DFDFDF',
  boxShadow: 'none !important',
  zIndex: '3 !important',
});

export const HeaderTop = styled(Grid)({
  borderBottom: '1px solid #DFDFDF',
  padding: '6px 8px',
});

export const HeaderLogo = styled.img({
  '&:hover': {
    opacity: 0.8,
  },
  cursor: 'pointer',
  height: 40,
  width: 50,
});

export const HeaderSearchField = styled(TextField)({
  '.MuiOutlinedInput-root': {
    fieldset: {
      borderRadius: 20,
    },
  },
});

export const HeaderMenuButton = styled(IconButton)({
  borderRadius: '2px !important',
  width: 95,
});

export const HeaderMenuLink = styled(Link)({
  ':hover': {
    backgroundColor: '#F4E6FF',
  },
});
