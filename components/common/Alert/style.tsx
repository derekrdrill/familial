import styled from 'styled-components';
import { Grid } from '@mui/material';

// export const AlertContainer = styled(Grid)<{ isAlertHidden?: boolean; isAlertFading?: boolean }>(
//   ({ isAlertHidden, isAlertFading }) => ({
//     display: isAlertHidden && `none !important`,
//     opacity: isAlertHidden || isAlertFading ? 0 : 1,
//     position: 'fixed',
//     top: 125,
//     transition: 'all 350ms ease-in',
//     zIndex: 6,
//   }),
// );

export const AlertContainer = styled(Grid)<{
  $isAlertHidden?: boolean | undefined;
  $isAlertFading?: boolean | undefined;
}>(({ $isAlertHidden, $isAlertFading }) => ({
  display: `${$isAlertHidden ? 'none' : 'inline-flex'} !important`,
  opacity: $isAlertHidden || $isAlertFading ? 0 : 1,
  position: 'fixed',
  top: 125,
  transition: 'all 350ms ease-in',
  zIndex: 6,
}));
