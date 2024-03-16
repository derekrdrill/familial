import styled from 'styled-components';
import { AppBar, Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

export const HeaderRoot = styled(AppBar)({
  backgroundColor: 'white !important',
  borderBottom: '1px solid #DFDFDF',
  boxShadow: 'none !important',
  zIndex: '3 !important',
});

export const HeaderTop = styled(Grid)({
  borderBottom: '1px solid #DFDFDF',
  padding: '5px 0',
});

export const HeaderLogo = styled.img({
  '&:hover': {
    opacity: 0.8,
  },
  cursor: 'pointer',
  height: 70,
  width: 100,
});

export const HeaderMenuText = styled.h4({
  '&:hover': {
    backgroundPositionX: '0%',
    backgroundSize: '100% 0.1em',
  },
  backgroundImage: 'linear-gradient(#212121, #212121)',
  backgroundPositionX: '100%',
  backgroundPositionY: '100%',
  backgroundRepeat: 'no-repeat',
  backgroundSize: '0% 0.1em',
  color: 'black',
  cursor: 'pointer',
  fontFamily: `'Josefin Sans', sans-serif !important`,
  fontWeight: '600 !important',
  textDecoration: 'none',
  textTransform: 'uppercase',
  transition: 'background-size 0.2s ease-in-out',
});

export const HeaderSearchIcon = styled(SearchIcon)({
  '&:hover': {
    color: '#a501c6',
    transform: 'scale(1.6)',
  },
  cursor: 'pointer',
  marginTop: 7,
  transition: 'all 5s ease-in-out',
  transform: 'scale(1.4)',
});
